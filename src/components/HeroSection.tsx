"use client";
import { motion } from "framer-motion";
import Sparkles from "@/components/ui/sparkles";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

const jewelryWords = ["rings", "diamonds", "earrings", "bracelets", "pendants", "bangles"];

export default function HeroSection() {
  return (
    <section className="bg-navy-gradient text-white relative overflow-hidden">
      {/* Sparkles layer */}
      <Sparkles particleDensity={70} speed={0.35} />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
        {/* Headline */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
          >
            For Independent Jewelers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-4xl mx-auto"
          >
            Turn your{" "}
            <AnimatedTextCycle
              words={jewelryWords}
              interval={2200}
              className="text-gold-gradient"
            />
            <br />
            <span className="text-gold-gradient">into sales with AI-written copy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Enter your GIA, HRD, or AGS certificate data. Get accurate, professional,
            SEO-optimized product copy - no fluff, no bull, in under 10 seconds.
          </motion.p>

          <motion.a
            href="/auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get Started Free
          </motion.a>
        </div>

        {/* Before / After cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Before - Raw GIA Data</span>
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gold-400 shadow-lg shadow-gold-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-navy-600">After - AI-Written Copy</span>
            </div>
            <p className="font-black text-navy-700 text-base leading-tight mb-3">
              Radiance That Lasts a Lifetime - 1.50ct Excellent-Cut Diamond
            </p>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Some stones hold light. This one commands it. Set in polished platinum, our 1.50-carat
              diamond solitaire captures the rare clarity of an F-color, VS1 stone - effortless shine
              you never take off...
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
