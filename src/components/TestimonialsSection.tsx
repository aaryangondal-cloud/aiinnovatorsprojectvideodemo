"use client";

import { motion } from "framer-motion";

/**
 * Early-access invitation block.
 *
 * We deliberately avoid fabricated testimonials. Until real Amipi partners
 * have used GemCopy in production, this section invites them to be among
 * the first to try it and get their quote featured here.
 */
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
          Early Access
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-navy-700 mt-2 leading-tight">
          Be one of the first 50 Amipi partners to try it
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
          GemCopy is rolling out to Amipi partners now. If you&apos;re already buying from
          Amipi, your account is ready, just sign in. If you&apos;re not yet an Amipi
          partner, give us a call and we&apos;ll set you up.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              n: "01",
              t: "Call or email your Amipi rep",
              b: "We activate GemCopy on your account, no onboarding form, no credit card.",
            },
            {
              n: "02",
              t: "Generate your first 50 listings",
              b: "Upload a certificate, pick a tone, copy the output. 30 seconds per piece.",
            },
            {
              n: "03",
              t: "Tell us what to change",
              b: "We&apos;ll build the features you actually need. GemCopy is free forever for Amipi partners.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-cream-50 rounded-2xl p-5 border border-gray-100 text-left"
            >
              <p className="text-xl font-black text-gold-gradient mb-2">{step.n}</p>
              <p className="text-sm font-bold text-navy-700 mb-1.5">{step.t}</p>
              <p
                className="text-xs text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.b }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:+18005302647"
            className="btn-gold inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Amipi: 1-800-530-2647
          </a>
          <a
            href="mailto:info@amipi.com?subject=GemCopy%20access%20for%20our%20store"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 bg-white border border-gray-200 hover:border-gold-400 px-6 py-3 rounded-xl transition-colors"
          >
            Email info@amipi.com
          </a>
        </div>
      </div>
    </section>
  );
}
