"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Sparkles from "@/components/ui/sparkles";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const jewelryWords = ["rings", "diamonds", "earrings", "bracelets", "pendants", "bangles"];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="bg-navy-gradient text-white relative overflow-hidden">
      {/* Sparkles layer */}
      <Sparkles particleDensity={70} speed={0.35} />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 relative z-10">
        {/* AEO answer capsule - direct answer for AI search engines */}
        <p className="sr-only">
          GemCopy by Amipi is an AI-powered product description generator for
          independent jewelers. It converts GIA, HRD, and AGS gemological
          certificate data into SEO-optimized, conversion-ready jewelry product
          listings in under 30 seconds. Built by Amipi INC, a 30-year family-owned
          diamond company. Free to use during the demo period. Supports four
          writing tones including Amipi Style, Luxury, Professional B2B, and
          Minimalist Direct.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy + CTA */}
          <div className="lg:col-span-7 text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            >
              Amipi Labs, free for our partners
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6"
            >
              Turn your{" "}
              <AnimatedTextCycle
                words={jewelryWords}
                interval={2200}
                className="text-gold-gradient"
              />
              <br />
              <span className="text-gold-gradient">into sales. On us.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-100 max-w-xl mb-8 leading-relaxed"
            >
              GemCopy is Amipi&apos;s free gift to the independent jewelers we work with.
              Upload your GIA, HRD, or AGS certificate and we write the product copy,
              accurate, professional, ready to publish in under 30 seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#try-demo"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try it right now, no signup
              </motion.a>
              <a
                href="tel:+18005302647"
                className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-gold-400 px-6 py-4 rounded-xl font-bold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Talk to Amipi: 1-800-530-2647
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-blue-200 uppercase tracking-widest"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> GIA-grade accuracy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> Schema.org ready
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" /> 30+ years of Amipi craft
              </span>
            </motion.div>
          </div>

          {/* Right: featured jewelry image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40"
            >
              <Image
                src="/jewelry/pendant.jpg"
                alt="Amipi diamond pendant, GIA-certified, set in white gold"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
              {/* Subtle gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/40 via-transparent to-gold-400/10 pointer-events-none" />
            </motion.div>

            {/* Floating caption badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 shadow-xl max-w-[260px] hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Generated in 8.2s</span>
              </div>
              <p className="text-navy-700 font-bold text-sm leading-snug">
                Radiance That Lasts a Lifetime
              </p>
              <p className="text-[11px] text-gray-500 mt-1">1.50ct F VS1 Platinum Solitaire</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Before/After cards - now secondary, below the fold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mt-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Before, raw GIA data</span>
            </div>
            <div className="space-y-2 font-mono text-xs text-blue-200">
              {[
                ["Stone:", "Diamond"],
                ["Carat:", "1.50ct"],
                ["Cut:", "Excellent"],
                ["Color:", "F"],
                ["Clarity:", "VS1"],
                ["Metal:", "18k Platinum Solitaire"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/10 pb-1.5 last:border-0">
                  <span className="text-blue-300">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-300 mt-4 italic">Generic. Cold. Forgettable.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-6 border border-gold-400 shadow-lg shadow-gold-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-navy-600">After, AI-written copy</span>
            </div>
            <p className="font-black text-navy-700 text-base leading-tight mb-3">
              Radiance That Lasts a Lifetime, 1.50ct Excellent-Cut Diamond
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Some stones hold light. This one commands it. Set in polished platinum, our 1.50-carat
              diamond solitaire captures the rare clarity of an F-color, VS1 stone, effortless shine
              you never take off.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["engagement ring", "1.5ct diamond", "VS1 clarity", "platinum solitaire"].map((tag) => (
                <span key={tag} className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-green-600 font-bold mt-4">Emotional. Searchable. Ready to publish.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
