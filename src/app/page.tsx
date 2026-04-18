"use client";

import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ProductGallery from "@/components/ProductGallery";
import Footer from "@/components/Footer";
import TryDemoSection from "@/components/TryDemoSection";
import ROICalculator from "@/components/ROICalculator";
import DemoVideoSection from "@/components/DemoVideoSection";
import { motion } from "framer-motion";
import Sparkles from "@/components/ui/sparkles";
import Image from "next/image";

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
  { value: "GIA + HRD + AGS", label: "certificates supported" },
  { value: "100%", label: "accurate to your specs" },
  { value: "$0", label: "for Amipi partners, forever" },
];

const steps = [
  {
    number: "01",
    title: "Upload your certificate",
    description:
      "Drop a GIA, HRD, or AGS certificate PDF. GemCopy reads the specs automatically. No typing. Or fill out the form manually if you prefer.",
  },
  {
    number: "02",
    title: "Choose your tone",
    description:
      "Amipi Style (recommended, calibrated from Amipi's voice), Luxury, Professional B2B, or Minimalist. The copy adapts to your brand and audience.",
  },
  {
    number: "03",
    title: "Copy and publish",
    description:
      "Headline, full description, key features, SEO tags, ready-to-paste schema, and 5 FAQs. One-click publish to Shopify and WooCommerce.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://www.amipi.com/images/small-logo.png"
              alt="Amipi"
              width={36}
              height={36}
              className="h-9 w-auto"
              unoptimized
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                Amipi Labs
              </span>
              <span className="text-base font-bold text-navy-600 tracking-tight">GemCopy</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#try-demo" className="hover:text-navy-600 transition-colors">
              Try it live
            </a>
            <a href="#how-it-works" className="hover:text-navy-600 transition-colors">
              How it works
            </a>
            <a href="#faq" className="hover:text-navy-600 transition-colors">
              FAQ
            </a>
            <a href="/pricing" className="hover:text-navy-600 transition-colors">
              Free for partners
            </a>
            <a
              href="tel:+18005302647"
              className="text-navy-600 font-bold hover:text-gold-600 transition-colors"
            >
              1-800-530-2647
            </a>
            <a href="/auth" className="btn-gold px-5 py-2 rounded-lg font-bold text-sm">
              Sign in
            </a>
          </nav>
        </div>
      </header>

      {/* Hero - Amipi Labs framing, new CTAs */}
      <HeroSection />

      {/* Product Gallery - real Amipi pieces with GemCopy-generated copy */}
      <ProductGallery />

      {/* Try-before-signup demo */}
      <TryDemoSection />

      {/* Demo video (placeholder until real 20-second video is recorded) */}
      <DemoVideoSection />

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
                <p className="text-xs text-blue-200 font-medium mt-0.5 uppercase tracking-wider">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Simple Process
            </span>
            <h2 className="text-3xl font-black text-navy-700 mt-2">
              Ready to publish in 3 steps
            </h2>
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

      {/* Testimonials converted to early-access CTA */}
      <TestimonialsSection />

      {/* FAQ - AEO-optimized, mirrors FAQPage JSON-LD */}
      <FaqSection />

      {/* Final CTA - call the rep, not sign up */}
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
            A gift from Amipi, with no strings.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-blue-200 text-base mb-8 leading-relaxed"
          >
            GemCopy is our way of saying thank you for 30 years of partnership. If you&apos;re
            already buying from Amipi, your account is ready. If you&apos;re not, pick up the
            phone and let&apos;s talk diamonds.
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href="#try-demo"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
            >
              Try it right now
            </motion.a>
            <motion.a
              href="tel:+18005302647"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-gold-400 px-8 py-4 rounded-xl font-bold text-sm transition-colors"
            >
              Call Amipi: 1-800-530-2647
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
