"use client";

import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ProductGallery from "@/components/ProductGallery";
import Footer from "@/components/Footer";
import TryDemoSection from "@/components/TryDemoSection";
import ROICalculator from "@/components/ROICalculator";
import { motion } from "framer-motion";
import Sparkles from "@/components/ui/sparkles";

export interface FormData {
  stoneType: string;
  caratWeight: string;
  cut: string;
  color: string;
  clarity: string;
  metalType: string;
  metalKarat: string;
  settingStyle: string;
  certificateNumber: string;
  price: string;
  tone: string;
  additionalNotes: string;
  language: string;
}

const stats = [
  { value: "30 sec", label: "per product listing" },
  { value: "GIA/HRD", label: "certificate support" },
  { value: "100%", label: "accurate to your specs" },
  { value: "SEO", label: "optimized every time" },
];

const steps = [
  {
    number: "01",
    title: "Enter your certificate data",
    description: "Input specs directly from your GIA, HRD, or AGS certificate - stone type, cut, color, clarity, metal, setting, and jewelry type.",
  },
  {
    number: "02",
    title: "Choose your tone",
    description: "Select Amipi Style, luxury, professional, or direct. The AI adapts the copy to match your brand voice and target audience.",
  },
  {
    number: "03",
    title: "Copy and publish",
    description: "Get a headline, full product description, key features, and SEO tags - accurate, no-bull copy ready to publish instantly.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://www.amipi.com/images/small-logo.png" alt="Amipi" className="h-9 w-auto" />
            <div>
              <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy by Amipi</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#how-it-works" className="hover:text-navy-600 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-navy-600 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-navy-600 transition-colors">FAQ</a>
            <a href="/auth" className="hover:text-navy-600 transition-colors font-bold">Log In</a>
            <a href="/auth" className="btn-gold px-5 py-2 rounded-lg font-bold text-sm">
              Sign Up Free
            </a>
          </nav>
        </div>
      </header>

      {/* Hero - with sparkles + animated text cycle */}
      <HeroSection />

      {/* Product Gallery - real Amipi pieces with GemCopy-generated copy */}
      <ProductGallery />

      {/* Try-before-signup demo */}
      <TryDemoSection />

      {/* Stats Strip */}
      <section className="bg-navy-600 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-2xl font-black text-gold-500">{s.value}</p>
                <p className="text-xs text-blue-200 font-medium mt-0.5 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Simple Process</span>
            <h2 className="text-3xl font-black text-navy-700 mt-2">Ready to publish in 3 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-gold-500 text-navy-700 text-3xl font-black w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-navy-700 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI calculator - concrete value proof */}
      <ROICalculator />

      {/* Testimonials - infinite scroll columns */}
      <TestimonialsSection />

      {/* FAQ - AEO-optimized, mirrors FAQPage JSON-LD */}
      <FaqSection />

      {/* Final CTA with sparkles */}
      <section className="bg-navy-gradient py-20 text-white text-center relative overflow-hidden">
        <Sparkles particleDensity={45} speed={0.3} />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-black mb-4"
          >
            Accurate specs. Compelling copy. No bull.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-200 text-base mb-8 leading-relaxed"
          >
            Every product listing is a sales opportunity. Let AI turn your GIA, HRD, or AGS
            certificate data into honest, professional copy that actually converts.
          </motion.p>
          <motion.a
            href="/auth"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Create Free Account
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
