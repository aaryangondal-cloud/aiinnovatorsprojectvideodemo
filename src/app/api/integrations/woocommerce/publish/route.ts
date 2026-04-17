import { NextRequest, NextResponse } from "next/server";

/**
 * Publish a GemCopy description to a WooCommerce product via REST API.
 *
 * Expects POST body:
 *   {
 *     siteUrl: "https://yourshop.com",
 *     consumerKey: "ck_...",
 *     consumerSecret: "cs_...",
 *     productId: 123,
 *     description: "full description",
 *     shortDescription?: "optional"
 *   }
 */
export async function POST(req: NextRequest) {
  try {
    const { siteUrl, consumerKey, consumerSecret, productId, description, shortDescription } =
      await req.json();

    if (!siteUrl || !consumerKey || !consumerSecret || !productId || !description) {
      return NextResponse.json(
        { error: "siteUrl, consumerKey, consumerSecret, productId, and description are required." },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const url = `${siteUrl.replace(/\/$/, "")}/wp-json/wc/v3/products/${productId}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        description,
        ...(shortDescription ? { short_description: shortDescription } : {}),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: `WooCommerce update failed: ${err}` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WooCommerce publish error:", err);
    return NextResponse.json({ error: "Publish failed." }, { status: 500 });
  }
}
