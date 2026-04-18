"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmipiRepWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-navy-gradient px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500 text-navy-700 flex items-center justify-center font-black text-base">
                  A
                </div>
                <div>
                  <p className="font-black text-sm leading-tight">Your Amipi rep</p>
                  <p className="text-xs text-blue-200">Real humans. New York-based.</p>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                GemCopy is free for Amipi partners. If you have a question, a stone that needs
                special handling, or you want a custom tone for your brand, we&apos;re one
                call away.
              </p>
              <div className="space-y-2 pt-2">
                <a
                  href="tel:+18005302647"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cream-50 hover:bg-gold-50 border border-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-gold-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-700">Call us</p>
                    <p className="text-[11px] text-gray-500">1-800-530-2647 (toll-free)</p>
                  </div>
                </a>
                <a
                  href="tel:+12123549700"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cream-50 hover:bg-gold-50 border border-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-gold-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-700">NYC direct</p>
                    <p className="text-[11px] text-gray-500">1-212-354-9700</p>
                  </div>
                </a>
                <a
                  href="mailto:info@amipi.com?subject=GemCopy%20question"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cream-50 hover:bg-gold-50 border border-gray-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-gold-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-navy-700">Email</p>
                    <p className="text-[11px] text-gray-500">info@amipi.com</p>
                  </div>
                </a>
              </div>
              <p className="text-[10px] text-gray-400 text-center pt-1">
                Mon to Fri, 9 AM to 6 PM Eastern
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Amipi rep contact"
        className="flex items-center gap-2 bg-navy-700 hover:bg-navy-800 text-white px-4 py-3 rounded-full shadow-xl transition-all"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <span className="w-7 h-7 rounded-full bg-gold-500 text-navy-700 flex items-center justify-center font-black text-xs">
              A
            </span>
            <span className="text-sm font-bold pr-1">Your Amipi rep</span>
          </>
        )}
      </button>
    </div>
  );
}
