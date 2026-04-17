# GemCopy by Amipi - Architecture

## Stack

- **Framework:** Next.js 14 App Router, TypeScript, strict mode
- **Styling:** Tailwind CSS with custom Amipi palette (navy #2c3b5b, gold #FED700)
- **Typography:** Lato via `next/font/google`
- **Animations:** framer-motion
- **AI model:** Google Gemini 2.0 Flash (2.5 Pro on Pro tier) via `@google/generative-ai`
- **Auth + DB (scaffolded):** Supabase with `@supabase/ssr`
- **Rate limiting:** In-memory by default, Upstash Redis when env vars set
- **Payments (scaffolded):** Stripe Checkout + webhook
- **Error tracking (scaffolded):** Sentry via dynamic import
- **Hosting:** Vercel, auto-deploy from main branch

## Directory layout

```
/
├── public/
│   ├── jewelry/          # Real Amipi product photos
│   ├── robots.txt        # AI crawler allowlist
│   ├── llms.txt          # Short LLM index
│   └── llms-full.txt     # Long-form LLM index with FAQ + glossary
├── src/
│   ├── app/              # Next.js App Router routes
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout, JSON-LD, Lato font
│   │   ├── icon.tsx              # Dynamic favicon
│   │   ├── opengraph-image.tsx   # Dynamic OG image
│   │   ├── manifest.ts           # PWA manifest
│   │   ├── sitemap.ts            # Sitemap
│   │   ├── dashboard/            # Authenticated app
│   │   │   ├── page.tsx          # Generator and saved history
│   │   │   └── analytics/        # Usage analytics
│   │   ├── auth/                 # Sign in and sign up
│   │   ├── pricing/              # Pricing tiers
│   │   ├── marketplace/          # Coming-soon waitlist
│   │   ├── resources/            # Blog posts
│   │   │   ├── page.tsx
│   │   │   ├── vs1-clarity-explained/
│   │   │   ├── gia-vs-hrd-vs-ags/
│   │   │   └── jewelry-copy-guide/
│   │   ├── gemcopy-vs-chatgpt/   # GEO comparison pages
│   │   ├── gemcopy-vs-jasper/
│   │   ├── gemcopy-vs-copy-ai/
│   │   ├── gia-certificate-to-product-description/  # HowTo landing
│   │   ├── jewelry-seo-copy-for-shopify/
│   │   ├── data/jewelry-copy-benchmarks/            # Citable stats page
│   │   └── api/
│   │       ├── generate/route.ts          # Main generate endpoint
│   │       ├── generate-demo/route.ts     # Rate-limited public demo
│   │       ├── extract-certificate/route.ts  # PDF/image to structured JSON
│   │       ├── image-alt/route.ts         # Alt text generator
│   │       ├── integrations/shopify/publish/route.ts
│   │       ├── integrations/woocommerce/publish/route.ts
│   │       ├── webhooks/description-generated/route.ts
│   │       └── stripe/
│   │           ├── checkout/route.ts
│   │           └── webhook/route.ts
│   ├── components/
│   │   ├── HeroSection.tsx               # Hero with parallax image
│   │   ├── ProductGallery.tsx            # Real Amipi pieces + copy
│   │   ├── TryDemoSection.tsx            # Try-without-signup form
│   │   ├── ROICalculator.tsx             # Interactive ROI
│   │   ├── TestimonialsSection.tsx       # Infinite scroll testimonials
│   │   ├── FaqSection.tsx                # 7 FAQs matching JSON-LD
│   │   ├── Footer.tsx                    # Enhanced footer
│   │   ├── GeneratorForm.tsx             # Dashboard form with PDF upload
│   │   ├── OutputPanel.tsx               # 6-section output + regenerate
│   │   ├── OnboardingTour.tsx            # First-visit 3-step modal
│   │   ├── ComparisonTemplate.tsx        # Shared comparison-page shell
│   │   ├── PageTransition.tsx            # Route fade
│   │   └── ui/
│   │       ├── sparkles.tsx              # Canvas particles
│   │       └── animated-text-cycle.tsx   # Cycling word animation
│   ├── lib/
│   │   ├── prompts.ts            # All Gemini prompts centralized
│   │   ├── rate-limit.ts         # Upstash-ready rate limiter
│   │   ├── stripe.ts             # Pricing tier constants
│   │   ├── sentry.ts             # Lazy Sentry adapter
│   │   ├── auth.ts               # localStorage auth (to be replaced by Supabase)
│   │   ├── storage.ts            # localStorage for saved descriptions
│   │   ├── resources.ts          # Blog post metadata
│   │   └── supabase/             # Supabase clients (scaffolded)
│   │       ├── client.ts
│   │       ├── server.ts
│   │       └── middleware.ts
│   └── app/globals.css           # Amipi brand gradients and utilities
├── supabase/
│   └── migrations/               # SQL schema (profiles, descriptions, integrations, ab_tests)
├── docs/
│   └── reddit-quora-strategy.md  # GEO/AEO social strategy
├── .github/workflows/ci.yml      # Typecheck, lint, build on PR
├── middleware.ts                 # Supabase session refresh
├── next.config.mjs               # Security headers + remotePatterns
├── tailwind.config.ts            # Amipi brand tokens
├── ARCHITECTURE.md               # This file
├── SETUP_GUIDE.md                # Onboarding for Amipi's team
└── CONTRIBUTING.md               # How to contribute
```

## AI pipeline

```
Certificate PDF / Form data
  -> /api/extract-certificate (Gemini vision) OR /api/generate
    -> buildGeneratePrompt() in lib/prompts.ts
    -> Gemini 2.0 Flash (temperature 0.3)
    -> Response validator (retries once if missing sections)
  -> Parsed by OutputPanel.tsx into 6 sections
    -> Per-section copy buttons
    -> Regenerate pills (modifier re-prompts)
  -> Optional publish to Shopify/WooCommerce via /api/integrations/...
```

## GEO/AEO layer

- `robots.txt` allows 18 AI crawlers explicitly
- `llms.txt` (short) + `llms-full.txt` (long) for LLM ingestion
- Root layout injects SoftwareApplication, Organization, and FAQPage JSON-LD
- Every comparison and resource page injects its own FAQPage / Article / Dataset / HowTo schema
- sitemap.ts lists every canonical route for Googlebot
- Entity consistency: "GemCopy by Amipi" is the canonical name; Amipi INC is the canonical organization

## Data flow for a logged-in generation

```
User (dashboard)
  -> GeneratorForm.tsx (uploads PDF or fills specs)
    -> POST /api/extract-certificate (if PDF)
    -> POST /api/generate with { form, modifier, tier }
      -> rate-limit.ts checks IP limit
      -> lib/prompts.ts builds prompt
      -> Gemini returns 6-section output
      -> validator retries if needed
      -> response returned
    -> OutputPanel renders sections with reveal animation
    -> User clicks Publish to Shopify
      -> POST /api/integrations/shopify/publish
      -> Shopify Admin API updates product body_html + metafields
  -> storage.ts saves to localStorage (future: Supabase descriptions table)
```

## Environment variables

See SETUP_GUIDE.md for the complete list with descriptions. Summary:

- `GEMINI_API_KEY` (required)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Phase D auth)
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PRICE_PRO` (Phase D payments)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (Phase D durable rate limit)
- `SENTRY_DSN` (Phase D error tracking)
