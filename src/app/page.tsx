"use client";

import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import OutputPanel from "@/components/OutputPanel";

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
}

const defaultForm: FormData = {
  stoneType: "",
  caratWeight: "",
  cut: "",
  color: "",
  clarity: "",
  metalType: "",
  metalKarat: "",
  settingStyle: "",
  certificateNumber: "",
  price: "",
  tone: "luxury",
  additionalNotes: "",
};

export default function Home() {
  const [form, setForm] = useState<FormData>(defaultForm);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!form.stoneType || !form.caratWeight || !form.metalType) {
      setError("Please fill in stone type, carat weight, and metal type.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setOutput(data.description);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setOutput("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-stone-900">GemCopy</span>
              <span className="text-xs text-stone-400 ml-2">by Amipi</span>
            </div>
          </div>
          <p className="text-sm text-stone-500 hidden sm:block">
            AI-powered product descriptions from GIA data
          </p>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-gold-600 font-medium mb-3">
          For Independent Jewelers
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight mb-4">
          Turn Browsers into Buyers
          <br />
          <span className="text-gold-500">with AI-Written Descriptions</span>
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          Paste your GIA certificate specs. Get compelling, SEO-optimized copy that sells - in seconds.
        </p>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GeneratorForm
          form={form}
          setForm={setForm}
          onGenerate={handleGenerate}
          onReset={handleReset}
          loading={loading}
          error={error}
        />
        <OutputPanel
          output={output}
          loading={loading}
          onCopy={handleCopy}
          copied={copied}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-400">
        Built with Claude AI for Amipi INC - AI Innovators Class Project
      </footer>
    </main>
  );
}
