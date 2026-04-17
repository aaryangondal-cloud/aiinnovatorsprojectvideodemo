"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut, type User } from "@/lib/auth";
import { saveDescription, getDescriptions, deleteDescription, type SavedDescription } from "@/lib/storage";
import GeneratorForm from "@/components/GeneratorForm";
import OutputPanel from "@/components/OutputPanel";
import { type FormData } from "@/app/page";

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

const sampleForm: FormData = {
  stoneType: "Natural Diamond",
  caratWeight: "1.50",
  cut: "Excellent",
  color: "F",
  clarity: "VS1",
  metalType: "Platinum",
  metalKarat: "18",
  settingStyle: "Solitaire",
  certificateNumber: "2141438167",
  price: "12500",
  tone: "luxury",
  additionalNotes: "Engagement Ring",
};

function extractHeadline(output: string): string {
  const match = output.match(/\*\*HEADLINE\*\*\s*([\s\S]*?)(?=\*\*[A-Z]|\s*$)/i);
  return match ? match[1].trim().split("\n")[0] : "Generated description";
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [descriptions, setDescriptions] = useState<SavedDescription[]>([]);
  const [activeTab, setActiveTab] = useState<"generate" | "saved">("generate");
  const [selectedDesc, setSelectedDesc] = useState<SavedDescription | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) { router.push("/auth"); return; }
    setUser(u);
    setDescriptions(getDescriptions(u.email));
  }, [router]);

  const refreshDescriptions = useCallback(() => {
    if (user) setDescriptions(getDescriptions(user.email));
  }, [user]);

  const handleGenerate = async () => {
    if (!form.stoneType || !form.caratWeight || !form.metalType) {
      setError("Please fill in stone type, carat weight, and metal type.");
      return;
    }
    setError("");
    setLoading(true);
    setOutput("");
    setSaved(false);

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

  const handleSave = () => {
    if (!output || !user) return;
    saveDescription(user.email, {
      stoneType: form.stoneType,
      caratWeight: form.caratWeight,
      metalType: form.metalType,
      jewelryType: form.additionalNotes,
      price: form.price,
      headline: extractHeadline(output),
      fullOutput: output,
    });
    setSaved(true);
    refreshDescriptions();
  };

  const handleDelete = (id: string) => {
    if (!user) return;
    deleteDescription(user.email, id);
    if (selectedDesc?.id === id) setSelectedDesc(null);
    refreshDescriptions();
  };

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <header className="bg-navy-800 border-b border-navy-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-navy-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <span className="text-white font-black text-base">GemCopy</span>
              <span className="text-gray-400 text-xs ml-2">by Amipi</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-navy-700 rounded-lg px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-navy-700 text-xs font-black">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-white text-xs font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">
            {([
              { key: "generate", label: "Generate", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { key: "saved", label: `Saved (${descriptions.length})`, icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-gold-500 text-navy-700"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GeneratorForm
                form={form}
                setForm={setForm}
                onGenerate={handleGenerate}
                onReset={() => { setForm(defaultForm); setOutput(""); setError(""); setSaved(false); }}
                onLoadSample={() => { setForm(sampleForm); setOutput(""); setError(""); setSaved(false); }}
                loading={loading}
                error={error}
              />
              <div className="flex flex-col gap-4">
                <OutputPanel
                  output={output}
                  loading={loading}
                  onCopy={handleCopy}
                  copied={copied}
                />
                {output && !loading && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-navy-700">
                        {saved ? "Saved to your account" : "Save this description?"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {saved ? "Find it in the Saved tab anytime." : "Keep it in your library for future use."}
                      </p>
                    </div>
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
                        saved
                          ? "bg-green-50 text-green-600 border border-green-100 cursor-default"
                          : "btn-gold"
                      }`}
                    >
                      {saved ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Saved
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          Save Description
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === "saved" && (
          <div>
            {descriptions.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-navy-700 mb-2">No saved descriptions yet</h3>
                <p className="text-gray-400 text-sm mb-6">Generate a description and click Save to build your library.</p>
                <button onClick={() => setActiveTab("generate")} className="btn-gold px-6 py-3 rounded-xl text-sm font-black">
                  Generate your first description
                </button>
              </div>
            ) : selectedDesc ? (
              <div className="max-w-3xl">
                <button
                  onClick={() => setSelectedDesc(null)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-700 font-bold mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all saved
                </button>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-navy-600 px-6 py-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-white font-black text-base truncate max-w-md">{selectedDesc.headline}</h2>
                      <p className="text-blue-200 text-xs mt-0.5">
                        {selectedDesc.stoneType} - {selectedDesc.caratWeight}ct - {new Date(selectedDesc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => { navigator.clipboard.writeText(selectedDesc.fullOutput); }}
                      className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-700 text-xs font-bold px-3 py-2 rounded-lg transition-all shrink-0"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Copy All
                    </button>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{selectedDesc.fullOutput}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-black text-navy-700">{descriptions.length} saved description{descriptions.length !== 1 ? "s" : ""}</h2>
                  <button
                    onClick={() => setActiveTab("generate")}
                    className="btn-gold px-4 py-2.5 rounded-xl text-sm font-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Generate New
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {descriptions.map((desc) => (
                    <div
                      key={desc.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gold-200 transition-all cursor-pointer group"
                      onClick={() => setSelectedDesc(desc)}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-navy-700 text-sm leading-snug line-clamp-2 group-hover:text-navy-500 transition-colors">
                              {desc.headline}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(desc.id); }}
                            className="text-gray-300 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {[desc.stoneType, `${desc.caratWeight}ct`, desc.metalType, desc.jewelryType]
                            .filter(Boolean)
                            .map((tag) => (
                              <span key={tag} className="text-xs bg-navy-50 text-navy-600 border border-navy-100 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          {desc.price && (
                            <span className="text-xs bg-gold-50 text-gold-700 border border-gold-200 px-2 py-0.5 rounded-full font-bold">
                              ${Number(desc.price).toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          <span className="text-xs text-gray-400">
                            {new Date(desc.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="text-xs text-gold-600 font-bold group-hover:translate-x-0.5 transition-transform">
                            View →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-navy-900 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-xs">GemCopy by Amipi - Powered by Google Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}
