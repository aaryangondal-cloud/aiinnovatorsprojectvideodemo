"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const sampleData = {
  stoneType: "Natural Diamond",
  caratWeight: "1.50",
  metalType: "Platinum",
  tone: "amipi",
};

function extractHeadline(output: string): string | null {
  const match = output.match(/\*\*HEADLINE\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i);
  return match ? match[1]!.trim() : null;
}

function extractDescription(output: string): string | null {
  const match = output.match(/\*\*PRODUCT DESCRIPTION\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|$)/i);
  return match ? match[1]!.trim() : null;
}

export default function TryDemoSection() {
  const [form, setForm] = useState(sampleData);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const res = await fetch("/api/generate-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate.");
        if (data.limitReached) setLimitReached(true);
        return;
      }
      setOutput(data.description);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const headline = output ? extractHeadline(output) : null;
  const description = output ? extractDescription(output) : null;

  return (
    <section id="try-demo" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Try It Right Now
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-navy-700 mt-2">
            No signup. No card. Just a real result.
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Enter three fields below and watch GemCopy write a live listing in under 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-cream-50 rounded-2xl border border-gray-100 p-6 md:p-8"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                  Stone type
                </label>
                <select
                  value={form.stoneType}
                  onChange={(e) => setForm({ ...form, stoneType: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option>Natural Diamond</option>
                  <option>Lab-Grown Diamond</option>
                  <option>Ruby</option>
                  <option>Emerald</option>
                  <option>Sapphire</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                  Carat weight
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.caratWeight}
                  onChange={(e) => setForm({ ...form, caratWeight: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                  Metal type
                </label>
                <select
                  value={form.metalType}
                  onChange={(e) => setForm({ ...form, metalType: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option>Platinum</option>
                  <option>White Gold</option>
                  <option>Yellow Gold</option>
                  <option>Rose Gold</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                  Copy tone
                </label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="amipi">Amipi Style</option>
                  <option value="luxury">Luxury</option>
                  <option value="professional">Professional</option>
                  <option value="minimalist">Minimalist</option>
                </select>
              </div>

              <motion.button
                onClick={handleGenerate}
                disabled={loading || limitReached}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-gold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3.5 text-sm font-black flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Writing your copy...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate live example
                  </>
                )}
              </motion.button>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                  {error}
                </p>
              )}

              <p className="text-[11px] text-gray-400 text-center">
                Free demo: 3 generations per day. Sign up for unlimited.
              </p>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-gold-200 p-6 md:p-8 min-h-[380px] relative"
          >
            {!output && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-50">
                <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">Your live copy will appear here</p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex gap-1.5 mb-3">
                  {[0, 0.15, 0.3].map((d) => (
                    <span
                      key={d}
                      className="w-2 h-2 rounded-full bg-gold-500 animate-bounce"
                      style={{ animationDelay: `${d}s` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-medium">Analyzing specs, writing copy...</p>
              </div>
            )}
            {output && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-3 block">
                  Generated in live Gemini call
                </span>
                {headline && (
                  <h3 className="text-xl font-black text-navy-700 leading-tight mb-3">{headline}</h3>
                )}
                {description && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {description}
                  </p>
                )}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href="/auth"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Get the full output with features, SEO tags, and schema
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
