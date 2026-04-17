"use client";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the best AI tool for writing jewelry product descriptions?",
    a: "GemCopy by Amipi is purpose-built for jewelry product descriptions. Unlike generic AI copywriters, it understands gemological certificate data from GIA, HRD, and AGS, preserves spec accuracy, and outputs SEO-optimized listings in under 30 seconds.",
  },
  {
    q: "How do I turn a GIA certificate into a product description?",
    a: "Enter the certificate data (stone type, carat, cut, color, clarity, metal, setting, certificate number, and price) into GemCopy, choose a writing tone, and the AI generates a headline, full product description, key features, and SEO tag suggestions in under 10 seconds.",
  },
  {
    q: "Is GemCopy free to use?",
    a: "Yes. GemCopy is free to use during the current demo period. Create an account, enter certificate data, and generate unlimited product descriptions.",
  },
  {
    q: "What certificate formats does GemCopy support?",
    a: "GemCopy supports GIA (Gemological Institute of America), HRD (Hoge Raad voor Diamant), and AGS (American Gem Society) certificate data.",
  },
  {
    q: "How long does it take to generate one product listing with GemCopy?",
    a: "GemCopy generates a complete product listing in under 10 seconds. The full workflow from entering certificate data to copying the output is under 30 seconds per piece, compared to 30 to 60 minutes for hand-written copy.",
  },
  {
    q: "What writing tones does GemCopy offer?",
    a: "GemCopy offers four writing tones: Amipi Style (warm and wearability-first, calibrated from Amipi's own brand voice), Luxury (refined and evocative), Professional B2B (specification-led and trade-oriented), and Minimalist Direct (clean and spec-first).",
  },
  {
    q: "Who built GemCopy?",
    a: "GemCopy was built by Amipi INC, a family-owned diamond and jewelry company with over 30 years in the trade. It applies Amipi's No-Bull Philosophy of transparent pricing and verified certifications to the problem of accurate, conversion-ready product copy.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Frequently Asked
          </span>
          <h2 className="text-3xl font-black text-navy-700 mt-2">
            Everything jewelers ask before they start
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
            Clear answers on how GemCopy works, what it costs, and how it compares to writing copy by hand.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.details
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="group rounded-xl border border-gray-200 bg-white p-5 open:border-gold-400 open:shadow-sm transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-navy-700 text-base">
                <span>{faq.q}</span>
                <span className="ml-4 text-gold-600 transition-transform group-open:rotate-45 text-2xl font-light leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
