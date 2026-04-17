import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PRICING_TIERS } from "@/lib/stripe";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing - GemCopy by Amipi",
  description:
    "Simple pricing for independent jewelers. Free tier, Pro at $29/mo, Amipi Enterprise for teams. All plans include GIA-grade copy accuracy and AI-ready schema output.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-navy-600">Back to home</Link>
        </div>
      </header>

      <section className="bg-navy-gradient text-white py-20 text-center px-6">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Pricing
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          Honest pricing. No bull. Free to try.
        </h1>
        <p className="text-lg text-blue-100 mt-5 max-w-2xl mx-auto">
          Generate your first 3 descriptions free, upgrade only when you&apos;re ready to scale.
        </p>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-white rounded-3xl border p-8 flex flex-col ${
                tier.highlight
                  ? "border-gold-400 shadow-xl shadow-gold-100/50"
                  : "border-gray-200"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-black text-navy-700">{tier.name}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-5">{tier.blurb}</p>
              <div className="mb-6">
                {tier.price === null ? (
                  <p className="text-3xl font-black text-navy-700">Custom</p>
                ) : (
                  <p className="text-navy-700">
                    <span className="text-4xl font-black">${tier.price}</span>
                    <span className="text-sm text-gray-500 font-medium">/month</span>
                  </p>
                )}
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block text-center rounded-xl py-3 text-sm font-black ${
                  tier.highlight
                    ? "btn-gold"
                    : "bg-navy-700 text-white hover:bg-navy-800 transition-colors"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-10 max-w-2xl mx-auto">
          All plans include the Amipi Style tone, GIA/HRD/AGS support, and Schema.org output.
          Free during demo period. Real billing begins when Amipi opens GemCopy publicly.
        </p>
      </section>

      <Footer />
    </main>
  );
}
