import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { RESOURCES } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources for Jewelry Retailers - GemCopy by Amipi",
  description:
    "Guides, glossaries, and tactics for independent jewelers on writing product copy, understanding GIA grading, and ranking in AI search.",
  alternates: { canonical: "https://aiinnovatorsprojectvideodemo.vercel.app/resources" },
};

export default function ResourcesIndex() {
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

      <section className="bg-navy-gradient text-white py-20 px-6 text-center">
        <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Resources
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          Guides for independent jewelers
        </h1>
        <p className="text-lg text-blue-100 mt-6 max-w-2xl mx-auto">
          Written by Amipi, a 30-year diamond company. Practical, spec-accurate, free.
        </p>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {RESOURCES.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/${post.slug}`}
              className="block bg-white rounded-2xl border border-gray-200 hover:border-gold-300 hover:shadow-md p-6 transition-all"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 className="text-lg font-black text-navy-700">{post.title}</h2>
                <span className="text-xs text-gray-400 uppercase tracking-widest shrink-0">{post.readingTime}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{post.description}</p>
              <p className="text-xs text-gray-400 mt-3">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
