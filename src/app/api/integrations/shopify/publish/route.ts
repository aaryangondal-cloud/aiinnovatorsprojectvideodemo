import { NextRequest, NextResponse } from "next/server";

/**
 * Publish a GemCopy description to a Shopify product via Admin API.
 *
 * Expects POST body:
 *   {
 *     shopDomain: "yourshop.myshopify.com",
 *     accessToken: "shpat_...",      // never stored; passed per-request or
 *                                    // retrieved server-side from encrypted
 *                                    // integrations table.
 *     productId: "1234567890",
 *     title: "optional new title",
 *     bodyHtml: "<p>full product description HTML</p>",
 *     metafields?: [{ namespace, key, value, type }]  // optional
 *   }
 *
 * Scaffold: implementation below is complete but the route requires the
 * user's own Admin API token. No Shopify account or partner app review
 * needed; jeweler pastes the token once and GemCopy writes directly.
 */
export async function POST(req: NextRequest) {
  try {
    const { shopDomain, accessToken, productId, title, bodyHtml, metafields } = await req.json();

    if (!shopDomain || !accessToken || !productId || !bodyHtml) {
      return NextResponse.json(
        { error: "shopDomain, accessToken, productId, and bodyHtml are required." },
        { status: 400 }
      );
    }

    const apiVersion = "2025-01";
    const base = `https://${shopDomain}/admin/api/${apiVersion}`;

    // Update product body
    const update = await fetch(`${base}/products/${productId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({
        product: { id: productId, body_html: bodyHtml, ...(title ? { title } : {}) },
      }),
    });

    if (!update.ok) {
      const err = await update.text();
      return NextResponse.json({ error: `Shopify update failed: ${err}` }, { status: 502 });
    }

    // Optionally attach metafields (schema JSON-LD, alt text, etc.)
    if (Array.isArray(metafields) && metafields.length > 0) {
      for (const mf of metafields) {
        await fetch(`${base}/products/${productId}/metafields.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
          body: JSON.stringify({
            metafield: {
              namespace: mf.namespace,
              key: mf.key,
              value: mf.value,
              type: mf.type || "single_line_text_field",
            },
          }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Shopify publish error:", err);
    return NextResponse.json({ error: "Publish failed." }, { status: 500 });
  }
}
