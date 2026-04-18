import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "How to turn a GIA certificate into a product description",
  description:
    "Step-by-step guide for independent jewelers to turn raw GIA, HRD, or AGS certificate data into a publishable Shopify product description in under 30 seconds using GemCopy.",
  alternates: {
    canonical:
      "https://gemcopybyamipi.vercel.app/gia-certificate-to-product-description",
  },
};

const steps = [
  {
    n: "01",
    t: "Open your GIA, HRD, or AGS certificate",
    b: "Locate the original certificate PDF or download the latest copy from the grading lab's portal. GemCopy accepts GIA reports, HRD certificates, and AGS grading documents.",
  },
  {
    n: "02",
    t: "Upload the certificate to GemCopy",
    b: "On the dashboard, click the upload area in the form. GemCopy uses Google Gemini's vision model to extract stone type, carat weight, cut, color, clarity, and certificate number automatically in about 3 seconds.",
  },
  {
    n: "03",
    t: "Confirm the metal and setting",
    b: "Certificates rarely list the metal or setting (those aren't graded). Pick the metal type (Platinum, 18k White Gold, etc.) and setting style (solitaire, halo, pavé) from the dropdowns. GemCopy auto-suggests the most common karat.",
  },
  {
    n: "04",
    t: "Pick a tone",
    b: "Amipi Style is the default. It's calibrated from Amipi's Instagram voice: warm, wearability-first, conversational. If you prefer heirloom language use Luxury. For trade/wholesale buyers, use Professional B2B. For clean spec-first pages, use Minimalist.",
  },
  {
    n: "05",
    t: "Generate",
    b: "Click Generate Description. GemCopy writes a headline, 120-160 word description, 5 key features, 8-10 SEO tags, a ready-to-paste Product schema JSON-LD block, and 5 per-piece FAQ Q&As. Total time: under 10 seconds.",
  },
  {
    n: "06",
    t: "Publish",
    b: "Copy any section with one click, or hit Publish to Shopify. GemCopy writes the description directly to your product via Shopify Admin API. For WooCommerce, use the REST-based publish button.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to turn a GIA certificate into a product description",
  description:
    "Step-by-step guide to turn a GIA certificate into a publishable jewelry product listing using GemCopy by Amipi.",
  totalTime: "PT30S",
  step: steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.t,
    text: s.b,
  })),
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

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
          How-To Guide
        </span>
        <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-3xl mx-auto">
          How to turn a GIA certificate into a product description in under 30 seconds
        </h1>
        <p className="text-lg text-blue-100 mt-6 max-w-2xl mx-auto">
          Six steps from raw certificate data to a live Shopify listing with schema markup,
          SEO tags, and per-product FAQs.
        </p>
      </section>

      <section className="py-16 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5">
              <div className="bg-gold-500 text-navy-700 text-xl font-black w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                {s.n}
              </div>
              <div>
                <h2 className="font-black text-navy-700 text-lg mb-1">{s.t}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{s.b}</p>
              </div>
            </div>
          ))}
          <div className="pt-6">
            <Link href="/auth" className="btn-gold inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black">
              Try it free now
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}
