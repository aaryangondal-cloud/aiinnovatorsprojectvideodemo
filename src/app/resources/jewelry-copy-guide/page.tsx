import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Writing Jewelry Product Descriptions That Sell in 2026",
  description:
    "The complete guide to jewelry copy in 2026: spec accuracy, emotional resonance, SEO structure, schema markup, and how to write 10x faster without losing quality.",
  alternates: {
    canonical: "https://gemcopybyamipi.vercel.app/resources/jewelry-copy-guide",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Writing Jewelry Product Descriptions That Sell in 2026",
  author: { "@type": "Organization", name: "Amipi INC" },
  datePublished: "2026-03-10",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
          </Link>
          <Link href="/resources" className="text-sm text-gray-500 hover:text-navy-600">All resources</Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/resources" className="text-xs text-gold-600 font-bold uppercase tracking-widest mb-3 block">
          ← Resources
        </Link>
        <h1 className="text-4xl font-black text-navy-700 leading-tight mb-4">
          Writing Jewelry Product Descriptions That Sell in 2026
        </h1>
        <p className="text-sm text-gray-500 mb-10">12 min read · March 2026</p>

        <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-lg">
            Jewelry copy used to be a styling exercise. In 2026, it&apos;s a search strategy, a
            schema strategy, an AI strategy, and a brand strategy all at once. Here&apos;s how to
            do it right without hiring a team.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">1. Spec accuracy is non-negotiable</h2>
          <p>
            Every number on your product page must match the certificate. Buyers will check. Google
            indexes mismatches. AI Overviews will cite the certificate data if it conflicts with
            your copy, not your copy. Pull specs directly from the grading report and never round.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">2. Lead with wearability</h2>
          <p>
            Buyers don&apos;t wear specs, they wear jewelry. Open with a sensory sentence about how
            the piece feels or looks on, then deliver the grades. The Amipi Style tone does this by
            default: &quot;Clean four-prong studs you put on once and forget you&apos;re
            wearing.&quot; That sells. &quot;0.50ctw F VS1 round brilliants&quot; doesn&apos;t.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">3. Write in two paragraphs</h2>
          <p>
            Paragraph one: emotional hook, 2 to 3 sentences. Paragraph two: specs and certification
            credentials, 2 to 3 sentences. This structure scans well on desktop and mobile, and AI
            crawlers extract it cleanly.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">4. Ship structured data</h2>
          <p>
            Every product page needs three pieces of JSON-LD: Product, Offer, and FAQPage. Without
            them, you don&apos;t rank in Google AI Overview and you don&apos;t get cited in
            Perplexity. GemCopy generates all three on every output and includes the metafields to
            paste into Shopify.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">5. Write answer-capsule headlines</h2>
          <p>
            &quot;Radiance That Lasts a Lifetime, 1.50ct Excellent-Cut Diamond Solitaire&quot; is an
            answer-capsule headline. It tells the buyer and the crawler what the product is in a
            single line. Avoid clever single-word headlines; they don&apos;t index well and confuse AI.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">6. Use 8 to 10 specific tags</h2>
          <p>
            Tags like &quot;engagement ring&quot; and &quot;diamond ring&quot; are too broad.
            &quot;1.5ct platinum solitaire&quot; and &quot;VS1 diamond ring&quot; are high-intent
            buyer searches with a fraction of the competition. Aim for 8 to 10 specific phrases.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">7. Add per-piece FAQs</h2>
          <p>
            5 Q&A pairs per piece, wrapped in FAQPage schema. Questions like &quot;Is this
            resizable?&quot; and &quot;Is the center stone GIA certified?&quot; are exactly what
            buyers ask voice assistants. Answer them on the page, and you rank for those queries.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">8. Localize if it matters</h2>
          <p>
            If you sell into Spanish-speaking, French-speaking, Hindi-speaking, or Hebrew-speaking
            markets, write the description in those languages natively. Translation tools lose the
            sensory hook. GemCopy Pro generates native output in all five languages.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">9. Publish directly, don&apos;t copy-paste</h2>
          <p>
            Every minute between &quot;generated&quot; and &quot;live on the site&quot; is waste.
            GemCopy&apos;s Shopify and WooCommerce publish buttons eliminate it. If you&apos;re
            still pasting from a doc, you&apos;re losing an hour a day.
          </p>

          <p className="bg-cream-50 border-l-4 border-gold-400 p-5 rounded-r-lg mt-10">
            <strong>The 30-second listing:</strong> certificate in, structured copy + schema + FAQs
            out, one-click publish. That&apos;s the 2026 jewelry copy workflow. GemCopy ships it
            today.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/auth" className="btn-gold inline-flex rounded-xl px-6 py-3 text-sm font-black">
            Write your next 10 listings in 5 minutes
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
