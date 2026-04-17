import { NextRequest, NextResponse } from "next/server";

/**
 * Outbound webhook fan-out for description-generated events.
 *
 * GemCopy can POST the generated description to one or more configured
 * webhook URLs (Slack, Teams, or Amipi's own systems) for downstream
 * automation. URLs are stored in the integrations table and loaded per-user.
 */
export async function POST(req: NextRequest) {
  try {
    const { targets, payload } = await req.json();
    if (!Array.isArray(targets) || targets.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const results = await Promise.allSettled(
      targets.map((url: string) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "gemcopy",
            event: "description.generated",
            timestamp: new Date().toISOString(),
            ...payload,
          }),
        })
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    return NextResponse.json({ ok: true, sent, total: targets.length });
  } catch (err) {
    console.error("Webhook fan-out error:", err);
    return NextResponse.json({ error: "Fan-out failed." }, { status: 500 });
  }
}
