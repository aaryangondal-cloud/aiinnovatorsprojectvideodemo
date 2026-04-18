import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Jewelry SEO copy for Shopify stores",
  description:
    "How Shopify jewelry stores can rank on Google and AI search with schema-optimized product descriptions. Built-in JSON-LD, one-click publish, 30-second workflow.",
  alternates: {
    canonical: "https://gemcopybyamipi.vercel.app/jewelry-seo-copy-for-shopify",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
          </Link>
          <Link href="/auth" className="btn-gold px-5 py-2 rounded-lg font-bold text-sm">Try Free</Link>
        </div>
      </header>

      <section className="bg-navy-gradient text-white py-24 px-6 text-center">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          For Shopify Jewelers
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto mb-6">
          SEO copy for Shopify jewelry stores that actually ranks
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Every GemCopy output includes schema.org Product JSON-LD, an SEO tag block, and per-piece
          FAQ schema. One-click publish writes directly to your product. Your listings are AI-search-ready
          the moment they go live.
        </p>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-navy-700 text-center mb-12">
            Three SEO layers, generated automatically
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                t: "Product JSON-LD",
                b: "Every output includes ready-to-paste Product schema with brand, SKU, material, carat, color, clarity, offers and additionalProperty. This is what powers rich results in Google and citations in Perplexity.",
              },
              {
                t: "FAQ JSON-LD",
                b: "5 product-specific Q&A pairs per piece, wrapped in FAQPage schema. This is the single biggest on-page lever for AI Overview and voice search visibility.",
              },
              {
                t: "Keyword-aligned SEO tags",
                b: "8 to 10 tags per output, selected from actual high-intent jewelry buyer search terms. Drop them straight into your Shopify product tag field or meta keywords.",
              },
            ].map((card) => (
              <div key={card.t} className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-black text-navy-700 mb-2">{card.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black text-navy-700 mb-6">Setup in under 5 minutes</h2>
          <ol className="space-y-5 text-sm text-gray-700 leading-relaxed">
            <li>
              <strong className="text-navy-700">1. Create an Admin API access token</strong> in your
              Shopify admin: Apps &rarr; Develop apps &rarr; Create private app. Grant read/write
              access to Products.
            </li>
            <li>
              <strong className="text-navy-700">2. Paste the token once</strong> in GemCopy&apos;s
              integrations settings. Tokens are encrypted at rest and never shared.
            </li>
            <li>
              <strong className="text-navy-700">3. Generate a description</strong> from your certificate
              data. Hit Publish to Shopify. GemCopy writes body_html, adds product tags, and attaches
              the schema JSON-LD as a metafield your theme can render in the head.
            </li>
          </ol>
          <div className="mt-8">
            <Link href="/auth" className="btn-gold inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black">
              Start your free account
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}
