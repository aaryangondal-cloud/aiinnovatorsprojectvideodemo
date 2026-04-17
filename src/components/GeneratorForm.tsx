"use client";

import { useRef, useState } from "react";
import type { FormData as GemCopyForm } from "@/app/page";

interface Props {
  form: GemCopyForm;
  setForm: React.Dispatch<React.SetStateAction<GemCopyForm>>;
  onGenerate: () => void;
  onReset: () => void;
  onLoadSample: () => void;
  loading: boolean;
  error: string;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all";

const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5";

const sectionHeadingClass =
  "text-xs font-black text-navy-600 uppercase tracking-widest mb-3 flex items-center gap-2";

// Smart default: map metal type to common karat. Platinum has no karat (marked 950).
const KARAT_DEFAULT: Record<string, string> = {
  Platinum: "",
  "White Gold": "18",
  "Yellow Gold": "18",
  "Rose Gold": "18",
  "Sterling Silver": "",
  Palladium: "",
};

const LANGUAGES = ["English", "Spanish", "French", "Hindi", "Hebrew"] as const;

export default function GeneratorForm({
  form,
  setForm,
  onGenerate,
  onReset,
  onLoadSample,
  loading,
  error,
}: Props) {
  const [showMore, setShowMore] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set =
    (key: keyof GemCopyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((f) => {
        const next = { ...f, [key]: value };
        // Smart default: auto-fill karat when metal type changes.
        if (key === "metalType" && !f.metalKarat && KARAT_DEFAULT[value] !== undefined) {
          next.metalKarat = KARAT_DEFAULT[value]!;
        }
        // Smart default: auto-fill cut to Excellent for natural diamonds.
        if (key === "stoneType" && !f.cut && (value === "Natural Diamond" || value === "Lab-Grown Diamond")) {
          next.cut = "Excellent";
        }
        return next;
      });
    };

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadMessage(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/extract-certificate", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setUploadMessage(data.error || "Extraction failed.");
        return;
      }
      const extracted = data.extracted as Record<string, string>;
      let filledCount = 0;
      setForm((f) => {
        const next = { ...f };
        for (const [key, value] of Object.entries(extracted)) {
          if (value && key in next) {
            (next as Record<string, string>)[key] = value;
            filledCount += 1;
          }
        }
        return next;
      });
      setUploadMessage(`Pre-filled ${filledCount} fields from your certificate.`);
    } catch {
      setUploadMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="bg-navy-600 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-base">Certificate Data</h2>
          <p className="text-blue-200 text-xs mt-0.5">Step 1 - GIA, HRD, or AGS</p>
        </div>
        <button
          onClick={onLoadSample}
          disabled={loading}
          className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-700 text-xs font-bold px-3 py-2 rounded-lg transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Sample
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* PDF / image upload */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || loading}
            className="w-full border-2 border-dashed border-gray-200 hover:border-gold-400 hover:bg-cream-50 rounded-xl px-4 py-4 text-left transition-all disabled:opacity-50 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-50 group-hover:bg-gold-100 flex items-center justify-center transition-colors">
                {uploading ? (
                  <svg className="w-4 h-4 animate-spin text-gold-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-navy-700">
                  {uploading ? "Reading your certificate..." : "Upload a GIA, HRD, or AGS certificate"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  PDF or image. We'll extract the specs automatically.
                </p>
              </div>
            </div>
          </button>
          {uploadMessage && (
            <p className="text-xs text-gold-700 mt-2 bg-gold-50 border border-gold-100 rounded-lg px-3 py-2">
              {uploadMessage}
            </p>
          )}
        </div>

        {/* Required fields */}
        <div>
          <p className={sectionHeadingClass}>
            <span className="w-5 h-5 rounded bg-navy-100 text-navy-600 flex items-center justify-center text-xs font-black">1</span>
            Required
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Stone Type *</label>
              <select className={inputClass} value={form.stoneType} onChange={set("stoneType")}>
                <option value="">Select stone</option>
                <option>Natural Diamond</option>
                <option>Lab-Grown Diamond</option>
                <option>Ruby</option>
                <option>Emerald</option>
                <option>Sapphire</option>
                <option>Pearl</option>
                <option>Alexandrite</option>
                <option>Tanzanite</option>
                <option>Aquamarine</option>
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
              <label className={labelClass}>Copy Tone</label>
              <select className={inputClass} value={form.tone} onChange={set("tone")}>
                <option value="amipi">Amipi Style (recommended)</option>
                <option value="luxury">Luxury</option>
                <option value="professional">Professional (B2B)</option>
                <option value="minimalist">Direct and Clean</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible More Details */}
        <div>
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-navy-600 hover:text-gold-600 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showMore ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {showMore ? "Hide" : "Add"} more details
          </button>

          {showMore && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
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
                    {["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Clarity Grade</label>
                  <select className={inputClass} value={form.clarity} onChange={set("clarity")}>
                    <option value="">Select clarity</option>
                    {["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"].map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Certificate #</label>
                  <input
                    type="text"
                    placeholder="e.g. 2141438167"
                    className={inputClass}
                    value={form.certificateNumber}
                    onChange={set("certificateNumber")}
                  />
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
                <div>
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
                <div>
                  <label className={labelClass}>Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="4500"
                      className={`${inputClass} pl-7`}
                      value={form.price}
                      onChange={set("price")}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Language</label>
                  <select className={inputClass} value={form.language || "English"} onChange={set("language")}>
                    {LANGUAGES.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Additional Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Ethically sourced, conflict-free, handcrafted, bridal collection..."
                  className={`${inputClass} resize-none`}
                  value={form.additionalNotes}
                  onChange={set("additionalNotes")}
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3.5 text-sm font-black transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                AI is writing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Description
              </>
            )}
          </button>
          <button
            onClick={onReset}
            disabled={loading}
            className="px-5 py-3.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-bold transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
