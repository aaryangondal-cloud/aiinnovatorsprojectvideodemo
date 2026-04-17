import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Stripe webhook handler.
 * Verifies signature with STRIPE_WEBHOOK_SECRET and handles subscription
 * lifecycle events. Scaffolded to promote the user's tier to "pro" in
 * Supabase on successful checkout.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-03-25.dahlia" });

  let event;
  const body = await req.text();
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // TODO: look up the customer's Supabase user and set profiles.tier = 'pro'
      console.log("Checkout completed:", event.data.object.id);
      break;
    }
    case "customer.subscription.deleted": {
      // TODO: downgrade the user to 'free'
      console.log("Subscription canceled:", event.data.object.id);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
