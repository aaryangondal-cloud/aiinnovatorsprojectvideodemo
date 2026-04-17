/**
 * Minimal Sentry adapter. Optional - only active when SENTRY_DSN is set.
 * Keeps the bundle lean by dynamic-importing @sentry/nextjs only when needed.
 *
 * To fully wire Sentry: run `npx @sentry/wizard@latest -i nextjs` which
 * generates sentry.client.config.ts and sentry.server.config.ts.
 */

export async function captureError(error: unknown, context?: Record<string, unknown>) {
  if (!process.env.SENTRY_DSN) {
    console.error("[error]", error, context);
    return;
  }
  try {
    // @ts-expect-error - optional dependency, only resolves when installed
    const Sentry = await import("@sentry/nextjs");
    Sentry.captureException(error, { extra: context });
  } catch {
    // Sentry not installed; fall back to console.
    console.error("[error]", error, context);
  }
}
