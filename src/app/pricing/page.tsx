import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing - GemCopy is free for Amipi partners",
  description:
    "GemCopy is Amipi Labs' free gift to the independent jewelers we partner with. Unlimited descriptions, all tones, all languages, at no cost. Call 1-800-530-2647.",
  alternates: {
    canonical: "https://aiinnovatorsprojectvideodemo.vercel.app/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">Amipi Labs - GemCopy</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-navy-600">Back to home</Link>
        </div>
      </header>

      <section className="bg-navy-gradient text-white py-20 text-center px-6">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Our gift to you
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          GemCopy is free for Amipi partners. Full stop.
        </h1>
        <p className="text-lg text-blue-100 mt-5 max-w-2xl mx-auto">
          No tiers. No credit card. No &quot;trial&quot; that converts. If you buy diamonds or
          jewelry from Amipi, GemCopy is on us.
        </p>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl border-2 border-gold-400 p-10 shadow-xl shadow-gold-100/50">
            <div className="text-center mb-8">
              <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-2">
                Amipi Partner Plan
              </p>
              <p className="text-6xl font-black text-navy-700">Free</p>
              <p className="text-sm text-gray-500 mt-2">forever, while you&apos;re an Amipi customer</p>
            </div>

            <ul className="space-y-3 mb-8 max-w-md mx-auto">
              {[
                "Unlimited descriptions, every month",
                "All 4 writing tones, including Amipi Style",
                "All 5 languages (English, Spanish, French, Hindi, Hebrew)",
                "GIA, HRD, and AGS certificate PDF upload",
                "Product schema (JSON-LD) for AI search ranking",
                "Per-piece FAQ generation",
                "One-click Shopify and WooCommerce publish",
                "Saved history, analytics, and A/B tools",
                "Direct line to your Amipi rep",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#try-demo"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-black"
              >
                Try it right now
              </Link>
              <a
                href="tel:+18005302647"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-navy-700 bg-white border border-gray-200 hover:border-gold-400 px-6 py-3 rounded-xl transition-colors"
              >
                Call 1-800-530-2647
              </a>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
            Not yet buying from Amipi? Call us. We&apos;re a 30-year family diamond house in New York
            with 5,000+ in-stock GIA pieces. Open an account and GemCopy comes with it,
            free, forever.
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
