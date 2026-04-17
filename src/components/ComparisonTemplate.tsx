"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export interface ComparisonData {
  competitor: string;
  slug: string;
  directAnswer: string; // 1-sentence Perplexity-ready answer
  tldr: string;
  rows: Array<{
    capability: string;
    gemcopy: string;
    competitor: string;
    winner: "gemcopy" | "competitor" | "tie";
  }>;
  whyItMatters: string[];
  faqs: Array<{ q: string; a: string }>;
}

export function ComparisonHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://www.amipi.com/images/small-logo.png"
            alt="Amipi"
            width={36}
            height={36}
            className="h-9 w-auto"
            unoptimized
          />
          <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/pricing" className="text-gray-500 hover:text-navy-600">Pricing</Link>
          <Link href="/auth" className="text-gray-500 hover:text-navy-600 font-bold">Log In</Link>
          <Link href="/auth" className="btn-gold px-5 py-2 rounded-lg font-bold">Try Free</Link>
        </nav>
      </div>
    </header>
  );
}

export default function ComparisonTemplate({ data }: { data: ComparisonData }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <ComparisonHeader />

      {/* Hero - direct answer capsule */}
      <section className="bg-navy-gradient text-white py-20 px-6 text-center">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          GemCopy vs {data.competitor}
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-4xl mx-auto">
          {data.directAnswer}
        </h1>
        <p className="text-lg text-blue-100 mt-6 max-w-2xl mx-auto">{data.tldr}</p>
      </section>

      {/* Comparison table */}
      <section className="bg-cream-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-navy-700 text-center mb-10">
            Feature-by-feature comparison
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest bg-navy-600 text-white">
              <div className="px-4 py-3">Capability</div>
              <div className="px-4 py-3 border-l border-navy-500">GemCopy</div>
              <div className="px-4 py-3 border-l border-navy-500">{data.competitor}</div>
            </div>
            {data.rows.map((row, i) => (
              <motion.div
                key={row.capability}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-cream-50" : "bg-white"}`}
              >
                <div className="px-4 py-3 font-bold text-navy-700 border-b border-gray-100">
                  {row.capability}
                </div>
                <div
                  className={`px-4 py-3 border-b border-gray-100 border-l border-gray-100 ${
                    row.winner === "gemcopy" ? "bg-gold-50 font-bold text-navy-700" : "text-gray-700"
                  }`}
                >
                  {row.gemcopy}
                </div>
                <div
                  className={`px-4 py-3 border-b border-gray-100 border-l border-gray-100 ${
                    row.winner === "competitor" ? "bg-gold-50 font-bold text-navy-700" : "text-gray-700"
                  }`}
                >
                  {row.competitor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-navy-700 mb-8">
            Why this matters for jewelers
          </h2>
          <ul className="space-y-4">
            {data.whyItMatters.map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <svg className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs specific to the comparison */}
      <section className="bg-cream-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-black text-navy-700 mb-8">FAQs</h2>
          <div className="space-y-3">
            {data.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-xl border border-gray-200 p-4 open:border-gold-300 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none font-bold text-navy-700 flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gold-600 transition-transform group-open:rotate-45 text-2xl font-light leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-gradient py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">Stop comparing. Start shipping.</h2>
          <p className="text-blue-200 mb-8">
            Free to try, no card required. Your first listing in under 30 seconds.
          </p>
          <Link href="/#try-demo" className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black">
            Try GemCopy live now
          </Link>
        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}
