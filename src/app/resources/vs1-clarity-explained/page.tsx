import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VS1 Clarity Explained - How to Describe It on a Product Page",
  description:
    "What VS1 clarity means on the GIA scale, why it's the best value sweet spot for diamond buyers, and how to describe it accurately in product copy.",
  alternates: {
    canonical: "https://gemcopybyamipi.vercel.app/resources/vs1-clarity-explained",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "VS1 Clarity Explained - How to Describe It on a Product Page",
  description:
    "What VS1 clarity means on the GIA scale, why it's the best value sweet spot for diamond buyers, and how to describe it accurately in product copy.",
  author: { "@type": "Organization", name: "Amipi INC" },
  publisher: { "@type": "Organization", name: "Amipi INC", logo: { "@type": "ImageObject", url: "https://www.amipi.com/images/top-logo.png" } },
  datePublished: "2026-04-01",
  mainEntityOfPage: "https://gemcopybyamipi.vercel.app/resources/vs1-clarity-explained",
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
          VS1 Clarity Explained - and How to Describe It on a Product Page
        </h1>
        <p className="text-sm text-gray-500 mb-10">6 min read · April 2026</p>

        <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="text-lg">
            If you&apos;ve ever asked yourself whether a VS1 diamond is worth the price jump from
            VS2, the honest answer is: <em>almost always, yes</em>. Here&apos;s why, and how to
            describe that to a buyer on your product page without sounding like a textbook.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">Where VS1 sits on the GIA scale</h2>
          <p>
            The GIA clarity scale runs: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3. VS1
            stands for &quot;Very Slightly Included 1&quot;. It&apos;s the fifth grade down from
            Flawless and sits in the upper-middle of the scale. A VS1 diamond has inclusions that
            are difficult to see under 10x magnification and completely invisible to the naked eye.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">Why VS1 is the sweet spot</h2>
          <p>
            VVS and IF diamonds are priced for the microscope. VS1 diamonds are priced for the
            wearer. In blind tests the vast majority of buyers cannot distinguish a VS1 from an IF
            in a setting. That&apos;s a 20 to 40% price difference for zero visible difference.
          </p>
          <p>
            For a jeweler, VS1 is the easiest clarity grade to sell because it&apos;s both
            objectively high-quality and defensible on price. Buyers understand &quot;near
            flawless&quot; without feeling they&apos;ve been upsold.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">How to describe VS1 in product copy</h2>
          <p>
            Avoid technical jargon on the headline. Avoid ambiguity in the body.
          </p>
          <p>
            <strong>Weak:</strong> &quot;Beautiful VS1 clarity diamond solitaire.&quot;
          </p>
          <p>
            <strong>Strong:</strong> &quot;A 1.50ct F-color VS1 solitaire with clarity so clean it
            passes as flawless to the naked eye, at a fraction of IF pricing.&quot;
          </p>
          <p>
            GemCopy does this automatically. Given a VS1 grade on the certificate, the Amipi Style
            tone produces copy that contextualizes the grade without overselling it.
          </p>

          <h2 className="text-2xl font-black text-navy-700 mt-10 mb-3">Common VS1 questions buyers ask</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Can I see the inclusions?</strong> Not without 10x magnification and usually
              not even then.
            </li>
            <li>
              <strong>Is VS1 eye-clean?</strong> Yes. By GIA definition.
            </li>
            <li>
              <strong>Will VS1 look as good as VVS2?</strong> In a ring: yes. Under a loupe: sometimes.
            </li>
          </ul>

          <p className="bg-cream-50 border-l-4 border-gold-400 p-5 rounded-r-lg mt-10">
            <strong>For jewelers:</strong> GemCopy generates per-product FAQ schema with these exact
            questions on every output. That&apos;s what earns you citations in Google AI Overview
            and Perplexity when a buyer asks &quot;is VS1 eye clean&quot;.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/auth" className="btn-gold inline-flex rounded-xl px-6 py-3 text-sm font-black">
            Try GemCopy on your own certificate
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
