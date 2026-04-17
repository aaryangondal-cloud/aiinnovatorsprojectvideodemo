/**
 * Lightweight rate limiter.
 *
 * By default uses an in-memory Map (works on a single Vercel function instance
 * and for demos). If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are
 * set, swaps to a Redis-backed limiter for durable, cross-instance limits.
 *
 * Usage:
 *   const { success, remaining } = await checkLimit("demo", ip, 3, "24h");
 */

type WindowUnit = "s" | "m" | "h" | "d";

interface Bucket {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, Bucket>();

function parseWindow(window: string): number {
  const match = window.match(/^(\d+)([smhd])$/);
  if (!match) throw new Error("invalid window");
  const n = parseInt(match[1]!, 10);
  const unit = match[2] as WindowUnit;
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return n * multipliers[unit];
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

async function memoryLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const bucket = memoryStore.get(key);
  if (!bucket || bucket.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (bucket.count >= limit) {
    return { success: false, limit, remaining: 0, resetAt: bucket.resetAt };
  }
  bucket.count += 1;
  return { success: true, limit, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

async function upstashLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  // Simple INCR + EXPIRE pattern via Upstash REST API.
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["PEXPIRE", key, windowMs.toString(), "NX"],
      ["PTTL", key],
    ]),
  });
  if (!res.ok) {
    // Fall back to memory limiter if Upstash is down.
    return memoryLimit(key, limit, windowMs);
  }
  const data = (await res.json()) as Array<{ result: number }>;
  const count = data[0]?.result ?? 0;
  const ttl = data[2]?.result ?? windowMs;
  const resetAt = Date.now() + ttl;
  const success = count <= limit;
  return { success, limit, remaining: Math.max(0, limit - count), resetAt };
}

export async function checkLimit(
  scope: string,
  identifier: string,
  limit: number,
  window: string
): Promise<RateLimitResult> {
  const key = `ratelimit:${scope}:${identifier}`;
  const windowMs = parseWindow(window);
  const useUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  return useUpstash ? upstashLimit(key, limit, windowMs) : memoryLimit(key, limit, windowMs);
}

export function ipFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
