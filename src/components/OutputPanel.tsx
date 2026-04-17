"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  output: string;
  loading: boolean;
  onCopy: () => void;
  onRegenerate?: (modifier: string) => void;
  copied: boolean;
}

const SAMPLE_OUTPUT = {
  headline: "Radiance That Lasts a Lifetime, 1.50ct Excellent-Cut Diamond Solitaire",
  description: [
    "Some stones hold light. This one commands it. Set in polished platinum, our 1.50-carat solitaire captures the rare clarity of an F-color, VS1 stone, a gem so pure it belongs in a collection, not a catalogue.",
    "Certified by the Gemological Institute of America (GIA #2141438167), this diamond meets the highest international standards for authenticity and grading accuracy. Ethically sourced and handcrafted, it arrives ready to mark the moment that changes everything.",
  ],
  features: [
    "F-color clarity, near colorless, facing up brilliantly white",
    "VS1 clarity, virtually no inclusions under 10x magnification",
    "Excellent cut grade, maximum light return and fire",
    "Platinum setting, the most durable precious metal for daily wear",
    "GIA certified, internationally recognized authenticity guarantee",
  ],
  tags: ["1.5ct diamond ring", "engagement ring", "VS1 diamond", "F color diamond", "platinum solitaire"],
};

interface ParsedSection {
  label: string;
  content: string;
}

function parseOutput(text: string): ParsedSection[] | null {
  const sections: ParsedSection[] = [];
  const patterns = [
    { label: "Headline", regex: /\*\*HEADLINE\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
    { label: "Product Description", regex: /\*\*PRODUCT DESCRIPTION\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
    { label: "Key Features", regex: /\*\*KEY FEATURES\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
    { label: "SEO Tags", regex: /\*\*SEO TAGS\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
    { label: "Product Schema", regex: /\*\*PRODUCT SCHEMA\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
    { label: "FAQ", regex: /\*\*FAQ\*\*\s*([\s\S]*?)(?=\n\s*\*\*[A-Z]|\s*$)/i },
  ];
  for (const { label, regex } of patterns) {
    const match = text.match(regex);
    if (match) sections.push({ label, content: match[1]!.trim() });
  }
  return sections.length > 0 ? sections : null;
}

function extractJsonFromSchemaSection(content: string): string {
  const fenceMatch = content.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fenceMatch) return fenceMatch[1]!.trim();
  const anyFence = content.match(/```\s*([\s\S]*?)\s*```/);
  if (anyFence) return anyFence[1]!.trim();
  return content.trim();
}

function parseFaqPairs(content: string): Array<{ q: string; a: string }> {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const pairs: Array<{ q: string; a: string }> = [];
  let currentQ: string | null = null;
  let currentA: string[] = [];
  for (const line of lines) {
    if (/^Q[:\s]/i.test(line)) {
      if (currentQ) pairs.push({ q: currentQ, a: currentA.join(" ").trim() });
      currentQ = line.replace(/^Q[:\s]+/i, "").trim();
      currentA = [];
    } else if (/^A[:\s]/i.test(line)) {
      currentA.push(line.replace(/^A[:\s]+/i, "").trim());
    } else {
      currentA.push(line);
    }
  }
  if (currentQ) pairs.push({ q: currentQ, a: currentA.join(" ").trim() });
  return pairs;
}

function SectionCopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  }
  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-navy-600 transition-colors flex items-center gap-1"
      aria-label={`Copy ${label}`}
    >
      {done ? (
        <>
          <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-600 font-bold">Copied</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

const REGEN_MODIFIERS = [
  { key: "warmer", label: "Warmer" },
  { key: "shorter", label: "Shorter" },
  { key: "more technical", label: "More technical" },
  { key: "more emotional", label: "More emotional" },
];

export default function OutputPanel({ output, loading, onCopy, onRegenerate, copied }: Props) {
  const [visibleSections, setVisibleSections] = useState<number>(0);
  const prevOutputRef = useRef<string>("");

  useEffect(() => {
    if (output && output !== prevOutputRef.current) {
      prevOutputRef.current = output;
      setVisibleSections(0);
      const parsed = parseOutput(output);
      if (!parsed) return;
      parsed.forEach((_, i) => {
        setTimeout(() => setVisibleSections(i + 1), i * 220);
      });
    }
    if (!output) setVisibleSections(0);
  }, [output]);

  const sections = output ? parseOutput(output) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Card header */}
      <div className="bg-navy-600 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-white font-black text-base">Generated Copy</h2>
            {output && <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />}
          </div>
          <p className="text-blue-200 text-xs mt-0.5">Step 2 - Review, copy, publish</p>
        </div>
        {output && (
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-700 text-xs font-bold px-3 py-2 rounded-lg transition-all"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy All
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex-1 p-6 flex flex-col">
        {/* Empty state - sample preview */}
        {!output && !loading && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium px-2">Sample output preview</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="space-y-5 opacity-60 pointer-events-none select-none">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Headline</p>
                <p className="font-black text-navy-700 text-lg leading-snug">{SAMPLE_OUTPUT.headline}</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Product Description</p>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  {SAMPLE_OUTPUT.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Plus: Key Features, SEO Tags, Product Schema, FAQs</p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_OUTPUT.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Fill in your specs on the left and click
                <span className="font-bold text-navy-600"> Generate Description</span>
              </p>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-gold-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-base font-black text-navy-700">AI is writing your copy...</p>
            <p className="text-xs text-gray-400 mt-1 mb-5">Writing 6 sections including schema and FAQs</p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <div className="w-full mt-8 space-y-3">
              {[80, 100, 60, 90, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded-full shimmer-loading"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Real output */}
        {output && !loading && (
          <div className="flex-1 space-y-6 overflow-y-auto">
            {sections ? (
              <>
                {sections.map(({ label, content }, idx) => (
                  <div
                    key={label}
                    className="group"
                    style={{
                      opacity: idx < visibleSections ? 1 : 0,
                      transform: idx < visibleSections ? "translateY(0)" : "translateY(12px)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-black uppercase tracking-widest text-gold-600">{label}</p>
                      <SectionCopyButton
                        text={label === "Product Schema" ? extractJsonFromSchemaSection(content) : content}
                        label={label}
                      />
                    </div>

                    {label === "Headline" && (
                      <h3 className="font-black text-navy-700 text-xl leading-snug">{content}</h3>
                    )}

                    {label === "Product Description" && (
                      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                        {content.split("\n\n").map((para, i) => (
                          <p key={i}>{para.trim()}</p>
                        ))}
                      </div>
                    )}

                    {label === "Key Features" && (
                      <ul className="space-y-2">
                        {content
                          .split("\n")
                          .filter((l) => l.trim())
                          .map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                              <span className="text-gold-500 mt-0.5 shrink-0">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </span>
                              <span>{item.replace(/^[-*•]\s*/, "")}</span>
                            </li>
                          ))}
                      </ul>
                    )}

                    {label === "SEO Tags" && (
                      <div className="flex flex-wrap gap-2">
                        {content.split(",").map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-2.5 py-1 rounded-full font-medium"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    {label === "Product Schema" && (
                      <div>
                        <p className="text-[11px] text-gray-500 mb-2">
                          Paste this inside your product page&apos;s <code className="bg-gray-100 px-1 rounded">&lt;head&gt;</code> tag wrapped in a <code className="bg-gray-100 px-1 rounded">&lt;script type=&quot;application/ld+json&quot;&gt;</code> block.
                        </p>
                        <pre className="text-[11px] bg-navy-900 text-blue-100 p-4 rounded-lg overflow-x-auto max-h-48 font-mono leading-relaxed">
                          {extractJsonFromSchemaSection(content)}
                        </pre>
                      </div>
                    )}

                    {label === "FAQ" && (
                      <div className="space-y-2">
                        {parseFaqPairs(content).map((pair, i) => (
                          <details
                            key={i}
                            className="group/faq rounded-lg border border-gray-200 p-3 open:border-gold-300 open:shadow-sm"
                          >
                            <summary className="cursor-pointer list-none font-bold text-sm text-navy-700 flex items-center justify-between">
                              <span>{pair.q}</span>
                              <span className="ml-3 text-gold-600 transition-transform group-open/faq:rotate-45 text-xl font-light leading-none">+</span>
                            </summary>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{pair.a}</p>
                          </details>
                        ))}
                      </div>
                    )}

                    {label !== "FAQ" && <div className="mt-5 border-b border-gray-100" />}
                  </div>
                ))}

                {/* Regenerate pills */}
                {onRegenerate && (
                  <div
                    className="pt-4"
                    style={{
                      opacity: visibleSections >= sections.length ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-3">
                      Not quite right? Regenerate with:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {REGEN_MODIFIERS.map((m) => (
                        <button
                          key={m.key}
                          onClick={() => onRegenerate(m.key)}
                          className="text-xs font-bold text-navy-700 bg-cream-100 hover:bg-gold-100 border border-gray-200 hover:border-gold-300 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {m.label}
                        </button>
                      ))}
                      <button
                        onClick={() => onRegenerate("")}
                        className="text-xs font-bold text-navy-700 bg-white hover:bg-gold-50 border border-gray-200 hover:border-gold-300 px-3 py-1.5 rounded-full transition-colors inline-flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try again
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{output}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
