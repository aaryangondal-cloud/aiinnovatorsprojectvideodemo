"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "gemcopy_onboarding_complete";

const steps = [
  {
    title: "Upload or type your certificate data",
    body:
      "Drop a GIA, HRD, or AGS certificate PDF and GemCopy pre-fills the form automatically. Or type the specs by hand. Only three fields are required.",
    icon: (
      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    title: "Pick your tone",
    body:
      "Amipi Style is the default, calibrated from Amipi's own brand voice. Luxury leans heirloom. Professional is trade-oriented. Minimalist is spec-first and direct.",
    icon: (
      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Copy, paste, publish",
    body:
      "You get a headline, a full description, key features, SEO tags, ready-to-paste Product schema, and 5 Q&As. One click copies any section. Every output is saved to your history.",
    icon: (
      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

export default function OnboardingTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      // Small delay so the tour doesn't land on top of the dashboard paint
      const t = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  function complete() {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-navy-900/60 backdrop-blur-sm flex items-center justify-center px-6"
        >
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`w-6 h-1.5 rounded-full transition-colors ${
                      i === step ? "bg-gold-500" : i < step ? "bg-gold-200" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={complete}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest"
              >
                Skip
              </button>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-cream-100 flex items-center justify-center mb-5">
              {steps[step]!.icon}
            </div>

            <h3 className="text-2xl font-black text-navy-700 mb-3">{steps[step]!.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">{steps[step]!.body}</p>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm font-bold text-gray-400 disabled:opacity-40 hover:text-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (step === steps.length - 1) complete();
                  else setStep((s) => s + 1);
                }}
                className="btn-gold rounded-xl px-6 py-3 text-sm font-black"
              >
                {step === steps.length - 1 ? "Get started" : "Next"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
