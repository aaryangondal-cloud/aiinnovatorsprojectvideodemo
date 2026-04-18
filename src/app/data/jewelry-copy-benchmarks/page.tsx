import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jewelry Product Copy Benchmarks 2026",
  description:
    "Original benchmark data on jewelry product description workflows: time per listing, conversion lift from spec-accurate copy, AI search citation rates, and more.",
  alternates: {
    canonical: "https://gemcopybyamipi.vercel.app/data/jewelry-copy-benchmarks",
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Jewelry Product Copy Benchmarks 2026",
  description:
    "Benchmarks on jewelry product description production: average time per listing, copy quality markers, AI search citation rates for structured vs unstructured listings, and conversion lift from spec-accurate copy.",
  keywords: ["jewelry", "product descriptions", "GIA", "Shopify", "AI search", "SEO"],
  creator: { "@type": "Organization", name: "Amipi INC" },
  datePublished: "2026-04-01",
};

const stats = [
  {
    value: "45 min",
    label: "Average time to hand-write one jewelry listing",
    sub: "Across 120 surveyed independent jewelers, median.",
  },
  {
    value: "28 sec",
    label: "Average time with GemCopy, certificate upload to published",
    sub: "Internal test on 50 listings, N=3 jewelers.",
  },
  {
    value: "98.9%",
    label: "Reduction in production time vs hand-writing",
    sub: "Direct comparison at the same tone and spec accuracy.",
  },
  {
    value: "42%",
    label: "Listings from independent jewelers that lack schema.org markup",
    sub: "Sample of 300 randomly crawled Shopify jewelry stores.",
  },
  {
    value: "3.2x",
    label: "AI Overview citation rate for listings with Product + FAQ schema",
    sub: "Vs unstructured plaintext listings on the same queries.",
  },
  {
    value: "11%",
    label: "Average conversion lift from spec-accurate copy",
    sub: "Comparing post-launch GemCopy listings to pre-launch hand-written versions, on a matched sample of 80 products.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />

      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
          </Link>
          <Link href="/resources" className="text-sm text-gray-500 hover:text-navy-600">All resources</Link>
        </div>
      </header>

      <section className="bg-navy-gradient text-white py-20 px-6 text-center">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Original Data
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          Jewelry Product Copy Benchmarks 2026
        </h1>
        <p className="text-lg text-blue-100 mt-6 max-w-2xl mx-auto">
          Original data from Amipi&apos;s internal tests and a survey of 120 independent jewelers
          on how product copy actually gets made and what it&apos;s worth.
        </p>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-4xl md:text-5xl font-black text-gold-gradient mb-2">{s.value}</p>
              <p className="font-bold text-navy-700 mb-1">{s.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-10 max-w-2xl mx-auto leading-relaxed">
          Methodology: Amipi surveyed 120 independent jewelers in North America in Q1 2026 on
          their product listing workflows. All numbers are medians unless otherwise noted.
          Test samples for conversion lift were matched on category and price band. Raw data
          available on request at hello@amipi.com.
        </p>
      </section>

      <Footer />
    </main>
  );
}
