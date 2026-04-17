import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vendor Marketplace - Coming Soon - GemCopy by Amipi",
  description:
    "A curated marketplace connecting independent jewelers with vetted photographers, setters, and brand partners. Launching when 50+ jewelers are on GemCopy.",
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
            <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-navy-600">Back to home</Link>
        </div>
      </header>

      <section className="bg-navy-gradient text-white py-24 text-center px-6">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Coming Soon
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto mb-6">
          The Amipi marketplace of trusted jewelry partners
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
          Every GemCopy user unlocks a curated network of photographers, setters,
          appraisers, and brand partners vetted by Amipi. Launching when we hit 50
          active jewelers.
        </p>
        <form action="/api/marketplace-waitlist" method="post" className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            name="email"
            required
            placeholder="your@jewelrybrand.com"
            className="flex-1 rounded-xl px-4 py-3 text-sm text-navy-700 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <button type="submit" className="btn-gold rounded-xl px-6 py-3 text-sm font-black">
            Join waitlist
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
