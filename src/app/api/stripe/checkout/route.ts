import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe Checkout session creator.
 *
 * Scaffold: this route reads the price ID from env and creates a Checkout
 * session. Requires STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PRICE_PRO to
 * be set. Until that happens it redirects to /pricing with a message so
 * the UI still works end-to-end.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tier = url.searchParams.get("tier") || "pro";

  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
    return NextResponse.redirect(
      new URL("/pricing?checkout=not-configured", req.url)
    );
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-03-25.dahlia",
    });

    const priceId =
      tier === "pro"
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${url.origin}/dashboard?upgraded=1`,
      cancel_url: `${url.origin}/pricing?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
    }
    return NextResponse.redirect(session.url);
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.redirect(new URL("/pricing?checkout=error", req.url));
  }
}
