/**
 * Stripe helper. Pricing is intentionally kept as a constant table so
 * products and prices can be created in the Stripe dashboard and the
 * price IDs pasted here without code changes.
 */

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceId: null,
    blurb: "For trying it out and small catalogs.",
    features: [
      "3 generations per day",
      "Amipi Style and 3 other tones",
      "English only",
      "No saved history",
    ],
    cta: "Get started free",
    href: "/auth",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO ?? "",
    blurb: "For independent jewelers with active stores.",
    features: [
      "Unlimited generations",
      "All 5 languages",
      "Product schema + FAQ JSON-LD output",
      "Shopify and WooCommerce direct publish",
      "Saved history and A/B testing",
      "Priority Gemini Pro model",
    ],
    cta: "Start 14-day trial",
    href: "/api/stripe/checkout?tier=pro",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Amipi Enterprise",
    price: null,
    priceId: null,
    blurb: "For multi-brand groups and agencies.",
    features: [
      "Everything in Pro",
      "Team seats and role-based access",
      "Custom tone training",
      "Webhook integrations",
      "Dedicated account manager",
      "Invoicing and SOC 2 reporting",
    ],
    cta: "Talk to sales",
    href: "mailto:sales@amipi.com?subject=GemCopy%20Enterprise",
    highlight: false,
  },
] as const;
