"use client";

interface Props {
  output: string;
  loading: boolean;
  onCopy: () => void;
  copied: boolean;
}

const SAMPLE_OUTPUT = {
  headline: "Radiance That Lasts a Lifetime - 1.50ct Excellent-Cut Diamond Solitaire",
  description: [
    "Some stones hold light. This one commands it. Set in polished platinum, our 1.50-carat solitaire captures the rare clarity of an F-color, VS1 stone - a gem so pure it belongs in a collection, not a catalogue. The Excellent cut grade means every facet was placed with intention, engineered to return light with maximum brilliance.",
    "Certified by the Gemological Institute of America (GIA #2141438167), this diamond meets the highest international standards for authenticity and grading accuracy. Ethically sourced and handcrafted, it arrives ready to mark the moment that changes everything.",
  ],
  features: [
    "Exceptional F-color clarity - near colorless, facing up brilliantly white",
    "VS1 clarity - virtually no inclusions visible even under 10x magnification",
    "Excellent cut grade - maximum light return and fire",
    "Platinum setting - the most durable precious metal for daily wear",
    "GIA certified - internationally recognized authenticity guarantee",
  ],
  tags: ["1.5ct diamond ring", "engagement ring", "VS1 diamond", "F color diamond", "platinum solitaire", "GIA certified diamond", "excellent cut diamond", "diamond solitaire ring"],
};

function parseOutput(text: string) {
  const sections: { label: string; content: string }[] = [];
  const patterns = [
    { label: "Headline", regex: /\*\*HEADLINE\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i },
    { label: "Product Description", regex: /\*\*PRODUCT DESCRIPTION\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i },
    { label: "Key Features", regex: /\*\*KEY FEATURES\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i },
    { label: "SEO Tags", regex: /\*\*SEO TAGS\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i },
  ];
  for (const { label, regex } of patterns) {
    const match = text.match(regex);
    if (match) sections.push({ label, content: match[1].trim() });
  }
  return sections.length > 0 ? sections : null;
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const handleCopy = () => navigator.clipboard.writeText(text);
  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-400 hover:text-navy-600 transition-colors flex items-center gap-1"
      title={`Copy ${label}`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      Copy
    </button>
  );
}

export default function OutputPanel({ output, loading, onCopy, copied }: Props) {
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
          <p className="text-blue-200 text-xs mt-0.5">Step 2 - Review and copy</p>
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
        {/* Empty state - shows a live preview example */}
        {!output && !loading && (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium px-2">Sample output preview</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="space-y-5 opacity-60 pointer-events-none select-none">
              {/* Sample headline */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Headline</p>
                  <p className="font-black text-navy-700 text-lg leading-snug">{SAMPLE_OUTPUT.headline}</p>
                </div>
              </div>

              {/* Sample description */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Product Description</p>
                <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                  {SAMPLE_OUTPUT.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Sample features */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">Key Features</p>
                <ul className="space-y-1.5">
                  {SAMPLE_OUTPUT.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-gold-500 mt-0.5 shrink-0">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample SEO tags */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gold-600 mb-1.5">SEO Tags</p>
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
                Fill in your GIA data on the left and click
                <span className="font-bold text-navy-600"> Generate Description</span> to get your copy
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
            <p className="text-xs text-gray-400 mt-1 mb-5">Analyzing your certificate data - this takes about 5 seconds</p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            {/* Shimmer preview lines */}
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
          <div className="flex-1 space-y-6 overflow-y-auto animate-fade-up">
            {sections ? (
              sections.map(({ label, content }) => (
                <div key={label} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black uppercase tracking-widest text-gold-600">{label}</p>
                    <CopyButton text={content} label={label} />
                  </div>

                  {label === "Headline" && (
                    <p className="font-black text-navy-700 text-xl leading-snug">{content}</p>
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

                  {/* Divider between sections */}
                  {label !== "SEO Tags" && <div className="mt-5 border-b border-gray-100" />}
                </div>
              ))
            ) : (
              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{output}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
