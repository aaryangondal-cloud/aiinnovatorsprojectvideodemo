"use client";

interface Props {
  output: string;
  loading: boolean;
  onCopy: () => void;
  copied: boolean;
}

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

export default function OutputPanel({ output, loading, onCopy, copied }: Props) {
  const sections = output ? parseOutput(output) : null;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-xl font-semibold text-stone-900">Generated Copy</h2>
          {output && (
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded-full">Step 2</span>
          {output && (
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 text-xs bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded-lg transition"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                  </svg>
                  Copy All
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {!output && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-stone-400">
          <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-500">Your description will appear here</p>
          <p className="text-xs text-stone-400 mt-1 max-w-xs">
            Fill in the GIA data on the left and click Generate
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gold-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-700">Claude is writing your copy...</p>
          <p className="text-xs text-stone-400 mt-1">This takes about 5 seconds</p>
          <div className="flex gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gold-300 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Output */}
      {output && !loading && (
        <div className="flex-1 space-y-5 overflow-y-auto">
          {sections ? (
            sections.map(({ label, content }) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-600 mb-2">{label}</p>
                {label === "Headline" && (
                  <p className="font-display text-xl font-semibold text-stone-900 leading-snug">{content}</p>
                )}
                {label === "Product Description" && (
                  <div className="text-sm text-stone-700 leading-relaxed space-y-3">
                    {content.split("\n\n").map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
                )}
                {label === "Key Features" && (
                  <ul className="space-y-1.5">
                    {content
                      .split("\n")
                      .filter((l) => l.trim())
                      .map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                          <span className="text-gold-400 mt-0.5 shrink-0">
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
                        className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <pre className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed">{output}</pre>
          )}
        </div>
      )}
    </div>
  );
}
