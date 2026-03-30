"use client";

import { FormData } from "@/app/page";

interface Props {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onGenerate: () => void;
  onReset: () => void;
  loading: boolean;
  error: string;
}

const inputClass =
  "w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition";

const labelClass = "block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5";

export default function GeneratorForm({
  form,
  setForm,
  onGenerate,
  onReset,
  loading,
  error,
}: Props) {
  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-stone-900">GIA Certificate Data</h2>
        <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded-full">Step 1</span>
      </div>

      {/* Stone Details */}
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Stone</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Stone Type *</label>
            <select className={inputClass} value={form.stoneType} onChange={set("stoneType")}>
              <option value="">Select stone</option>
              <option>Diamond</option>
              <option>Ruby</option>
              <option>Emerald</option>
              <option>Sapphire</option>
              <option>Pearl</option>
              <option>Alexandrite</option>
              <option>Tanzanite</option>
              <option>Aquamarine</option>
              <option>Opal</option>
              <option>Morganite</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Carat Weight *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 1.25"
              className={inputClass}
              value={form.caratWeight}
              onChange={set("caratWeight")}
            />
          </div>
          <div>
            <label className={labelClass}>Cut Grade</label>
            <select className={inputClass} value={form.cut} onChange={set("cut")}>
              <option value="">Select cut</option>
              <option>Ideal</option>
              <option>Excellent</option>
              <option>Very Good</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Color Grade</label>
            <select className={inputClass} value={form.color} onChange={set("color")}>
              <option value="">Select color</option>
              {["D","E","F","G","H","I","J","K","L","M"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Clarity Grade</label>
            <select className={inputClass} value={form.clarity} onChange={set("clarity")}>
              <option value="">Select clarity</option>
              {["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1","I2"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>GIA Certificate #</label>
            <input
              type="text"
              placeholder="e.g. 2141438167"
              className={inputClass}
              value={form.certificateNumber}
              onChange={set("certificateNumber")}
            />
          </div>
        </div>
      </div>

      {/* Metal and Setting */}
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Metal and Setting</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Metal Type *</label>
            <select className={inputClass} value={form.metalType} onChange={set("metalType")}>
              <option value="">Select metal</option>
              <option>White Gold</option>
              <option>Yellow Gold</option>
              <option>Rose Gold</option>
              <option>Platinum</option>
              <option>Sterling Silver</option>
              <option>Palladium</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Karat</label>
            <select className={inputClass} value={form.metalKarat} onChange={set("metalKarat")}>
              <option value="">Select karat</option>
              <option value="14">14k</option>
              <option value="18">18k</option>
              <option value="22">22k</option>
              <option value="24">24k</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Setting Style</label>
            <select className={inputClass} value={form.settingStyle} onChange={set("settingStyle")}>
              <option value="">Select setting</option>
              <option>Solitaire</option>
              <option>Halo</option>
              <option>Pave</option>
              <option>Three-Stone</option>
              <option>Bezel</option>
              <option>Cathedral</option>
              <option>Tension</option>
              <option>Cluster</option>
              <option>Vintage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing and Tone */}
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Pricing and Tone</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Price (USD)</label>
            <input
              type="number"
              placeholder="e.g. 4500"
              className={inputClass}
              value={form.price}
              onChange={set("price")}
            />
          </div>
          <div>
            <label className={labelClass}>Copy Tone</label>
            <select className={inputClass} value={form.tone} onChange={set("tone")}>
              <option value="luxury">Luxury</option>
              <option value="approachable">Approachable</option>
              <option value="minimalist">Minimalist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          rows={2}
          placeholder="e.g. Engagement ring, conflict-free, handcrafted in NYC..."
          className={`${inputClass} resize-none`}
          value={form.additionalNotes}
          onChange={set("additionalNotes")}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="flex-1 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-xl py-3 text-sm font-medium transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Writing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Description
            </>
          )}
        </button>
        <button
          onClick={onReset}
          disabled={loading}
          className="px-4 py-3 rounded-xl border border-stone-200 text-stone-500 hover:bg-stone-50 text-sm font-medium transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
