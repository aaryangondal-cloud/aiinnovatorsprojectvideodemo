"use client";

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
    description:
      "Input specs directly from your GIA, HRD, or AGS certificate - stone type, cut, color, clarity, metal, setting, and jewelry type.",
  },
  {
    number: "02",
    title: "Choose your tone",
    description:
      "Select professional, luxury, or direct. The AI adapts the copy to match your brand voice and target audience.",
  },
  {
    number: "03",
    title: "Copy and publish",
    description:
      "Get a headline, full product description, key features, and SEO tags - accurate, no-bull copy ready to publish instantly.",
  },
];

const testimonials = [
  {
    quote:
      "We list 40+ new pieces a month. GemCopy cut our description time from an hour per piece to under a minute. The copy is accurate, professional, and actually sells.",
    name: "Sarah Chen",
    role: "Wholesale Director, Lumiere Diamonds - New York",
    initials: "SC",
  },
  {
    quote:
      "Our online store traffic increased 40% in three months. The SEO tags are exactly what our buyers search for. Every jeweler selling online needs this.",
    name: "Marcus Rivera",
    role: "Founder, Rivera Fine Jewelry - Miami",
    initials: "MR",
  },
  {
    quote:
      "What I love is the accuracy. The specs are always right, the grading language is correct, and the copy is honest - not over-hyped. Our B2B clients trust it.",
    name: "Priya Nair",
    role: "Operations Manager, Ananda Gems - Chicago",
    initials: "PN",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold text-navy-600 tracking-tight">GemCopy</span>
              <span className="text-xs text-gray-400 ml-2 font-normal">by Amipi</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#how-it-works" className="hover:text-navy-600 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-navy-600 transition-colors">Reviews</a>
            <a href="/auth" className="hover:text-navy-600 transition-colors font-bold">Log In</a>
            <a href="/auth" className="btn-gold px-5 py-2 rounded-lg font-bold text-sm">
              Sign Up Free
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-navy-gradient text-white">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center mb-14">
            <span className="inline-block bg-gold-500 text-navy-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              For Independent Jewelers
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-4xl mx-auto">
              Turn Browsers into Buyers
              <br />
              <span className="text-gold-gradient">with AI-Written Descriptions</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              Enter your GIA, HRD, or AGS certificate data. Get accurate, professional, SEO-optimized product copy - no fluff, no bull, in under 10 seconds.
            </p>
            <a
              href="/auth"
              className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started Free
            </a>
          </div>

          {/* Before / After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Before - Raw GIA Data</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-blue-200">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-blue-300">Stone:</span>
                  <span>Diamond</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-blue-300">Carat:</span>
                  <span>1.50ct</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-blue-300">Cut:</span>
                  <span>Excellent</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-blue-300">Color:</span>
                  <span>F</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-blue-300">Clarity:</span>
                  <span>VS1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Metal:</span>
                  <span>18k Platinum Solitaire</span>
                </div>
              </div>
              <p className="text-xs text-blue-300 mt-4 italic">Generic. Cold. Forgettable.</p>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl p-6 border border-gold-400 shadow-lg shadow-gold-500/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-navy-600">After - AI-Written Copy</span>
              </div>
              <p className="font-black text-navy-700 text-base leading-tight mb-3">
                Radiance That Lasts a Lifetime - 1.50ct Excellent-Cut Diamond
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Some stones hold light. This one commands it. Set in polished platinum, our 1.50-carat diamond solitaire captures the rare clarity of an F-color, VS1 stone - a gem so pure it belongs in a collection, not a catalogue...
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["engagement ring", "1.5ct diamond", "VS1 clarity", "platinum solitaire"].map((tag) => (
                  <span key={tag} className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-green-600 font-bold mt-4">Emotional. Searchable. Ready to publish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-navy-600 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-gold-500">{s.value}</p>
                <p className="text-xs text-blue-200 font-medium mt-0.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Simple Process</span>
            <h2 className="text-3xl font-black text-navy-700 mt-2">Ready to publish in 3 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-gold-500 text-navy-700 text-3xl font-black w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-navy-700 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Real Results</span>
            <h2 className="text-3xl font-black text-navy-700 mt-2">Loved by independent jewelers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-700">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy-gradient py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-4">Accurate specs. Compelling copy. No bull.</h2>
          <p className="text-blue-200 text-base mb-8 leading-relaxed">
            Every product listing is a sales opportunity. Let AI turn your GIA, HRD, or AGS certificate data into honest, professional copy that actually converts.
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-xl font-black text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Create Free Account
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-navy-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-navy-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm">GemCopy</span>
            <span className="text-gray-500 text-xs">by Amipi</span>
          </div>
          <p className="text-gray-500 text-xs">
            Powered by Google Gemini AI. Built for independent jewelers worldwide.
          </p>
          <p className="text-gray-600 text-xs">
            © 2025 Amipi INC. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
