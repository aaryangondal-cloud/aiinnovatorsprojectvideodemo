"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  const [piecesPerMonth, setPiecesPerMonth] = useState(30);
  const [minutesPerPiece, setMinutesPerPiece] = useState(45);
  const [hourlyRate, setHourlyRate] = useState(40);

  const { hoursSaved, dollarsSaved, annualSaved } = useMemo(() => {
    const minutesSaved = piecesPerMonth * (minutesPerPiece - 0.5); // ~30s per piece with GemCopy
    const hours = minutesSaved / 60;
    const dollars = hours * hourlyRate;
    return {
      hoursSaved: Math.max(0, Math.round(hours)),
      dollarsSaved: Math.max(0, Math.round(dollars)),
      annualSaved: Math.max(0, Math.round(dollars * 12)),
    };
  }, [piecesPerMonth, minutesPerPiece, hourlyRate]);

  return (
    <section id="roi" className="bg-navy-gradient text-white py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            How much does hand-writing cost you?
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-2">
            Your ROI, in numbers
          </h2>
          <p className="text-blue-200 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Adjust the sliders to match your listing workflow. We&apos;ll show you what GemCopy saves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Pieces listed per month
                </label>
                <span className="text-xl font-black text-gold-400">{piecesPerMonth}</span>
              </div>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={piecesPerMonth}
                onChange={(e) => setPiecesPerMonth(parseInt(e.target.value))}
                className="w-full accent-gold-400"
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Minutes per description (hand-written)
                </label>
                <span className="text-xl font-black text-gold-400">{minutesPerPiece} min</span>
              </div>
              <input
                type="range"
                min={15}
                max={120}
                step={5}
                value={minutesPerPiece}
                onChange={(e) => setMinutesPerPiece(parseInt(e.target.value))}
                className="w-full accent-gold-400"
              />
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Copywriter hourly rate (USD)
                </label>
                <span className="text-xl font-black text-gold-400">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min={15}
                max={150}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full accent-gold-400"
              />
            </div>
          </div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-4">
              With GemCopy you save
            </p>
            <div className="space-y-5">
              <div>
                <p className="text-4xl font-black text-gold-gradient">{hoursSaved}</p>
                <p className="text-xs text-blue-200 mt-1">hours per month</p>
              </div>
              <div>
                <p className="text-4xl font-black text-gold-gradient">${dollarsSaved.toLocaleString()}</p>
                <p className="text-xs text-blue-200 mt-1">in copywriter time per month</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-5xl font-black text-gold-gradient">${annualSaved.toLocaleString()}</p>
                <p className="text-xs text-blue-200 mt-1">per year, vs hand-writing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
