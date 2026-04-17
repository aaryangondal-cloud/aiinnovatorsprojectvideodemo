import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GIA vs HRD vs AGS - Which Certificate Should You Feature?",
  description:
    "A trade guide to the three major diamond grading labs. How they differ, which markets trust which, and which certificate to emphasize in your product copy.",
  alternates: {
    canonical: "https://aiinnovatorsprojectvideodemo.vercel.app/resources/gia-vs-hrd-vs-ags",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "GIA vs HRD vs AGS - Which Certificate Should You Feature?",
  author: { "@type": "Organization", name: "Amipi INC" },
  datePublished: "2026-03-20",
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
          GIA vs HRD vs AGS: Which Certificate Should You Feature?
        </h1>
        <p className="text-sm text-gray-500 mb-10">8 min read · March 2026</p>

        <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-lg">
            Three labs dominate diamond grading: GIA (United States), HRD (Belgium), and AGS (United States).
            All three are credible. But for product copy, which one you feature matters.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">GIA</h2>
          <p>
            Founded in 1931. The most recognized name globally and the de facto standard in the
            United States and most international markets. GIA is conservative in grading, which
            means a GIA VS1 tends to look cleaner than an HRD or AGS VS1 of the same number.
          </p>
          <p>
            Feature GIA on product pages when selling to US, UK, and most Asian markets. Buyers
            know the name and trust it reflexively.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">HRD</h2>
          <p>
            Hoge Raad voor Diamant, established in Antwerp in 1973. The trade-standard lab in
            continental Europe. HRD uses the same clarity and color nomenclature as GIA but has
            historically been slightly less conservative on color grading.
          </p>
          <p>
            Feature HRD when selling into European markets or to buyers who expect a Belgian
            provenance story. Antwerp is the center of the diamond trade and HRD signals that.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">AGS</h2>
          <p>
            American Gem Society Laboratories. Known for a different scale (AGS Ideal = 0, Excellent = 1,
            and so on). AGS is the most rigorous on cut grading and many of the most beautiful
            diamonds on the market carry AGS Ideal-cut certificates.
          </p>
          <p>
            Feature AGS when you&apos;re selling premium cut quality and want to differentiate from
            run-of-the-mill GIA Excellent grades. The AGS 0 or &quot;Triple 0&quot; (symmetry +
            polish + cut all 0) is a meaningful signal.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">Which one to feature?</h2>
          <p>
            If your diamond has a GIA certificate, feature GIA. Full stop. The name recognition is
            worth more than the marginal differences in grading rigor. For HRD, lean into the
            provenance angle: &quot;Certified in Antwerp, the world&apos;s diamond capital&quot; is
            a strong line. For AGS, lean into the cut grade.
          </p>

          <p className="bg-cream-50 border-l-4 border-gold-400 p-5 rounded-r-lg mt-10">
            <strong>For jewelers:</strong> GemCopy handles all three lab formats. Upload any
            certificate, and the Amipi Style tone will cite the lab by its full name in the body
            copy and never conflate grades across systems.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/auth" className="btn-gold inline-flex rounded-xl px-6 py-3 text-sm font-black">
            Generate your next listing with GemCopy
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
