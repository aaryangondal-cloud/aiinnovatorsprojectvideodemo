"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    if (mode === "signup") {
      if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
      const user = signUp(name, email, password);
      if (!user) { setError("An account with this email already exists. Try logging in."); setLoading(false); return; }
    } else {
      const user = signIn(email, password);
      if (!user) { setError("Incorrect email or password."); setLoading(false); return; }
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-navy-800 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5">
        <a href="/" className="flex items-center gap-2.5 w-fit">
          <img src="https://www.amipi.com/images/small-logo.png" alt="Amipi" className="h-8 w-auto" />
          <span className="text-white font-black text-lg tracking-tight">GemCopy by Amipi</span>
        </a>
      </header>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Tab switcher */}
            <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`py-4 text-sm font-black uppercase tracking-widest transition-all ${
                    mode === m
                      ? "bg-white text-navy-700 border-b-2 border-gold-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {m === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>

            <div className="p-8">
              <div className="mb-7">
                <h1 className="text-2xl font-black text-navy-700">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {mode === "login"
                    ? "Log in to access your saved descriptions."
                    : "Start generating and saving AI-written jewelry copy."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@yourstore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold rounded-xl py-3.5 text-sm font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {mode === "login" ? "Logging in..." : "Creating account..."}
                    </>
                  ) : (
                    mode === "login" ? "Log In to GemCopy" : "Create Free Account"
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-6">
                {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
                <button
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                  className="text-navy-600 font-bold hover:underline"
                >
                  {mode === "login" ? "Sign up free" : "Log in"}
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6">
            GemCopy by Amipi. Built for independent jewelers.
          </p>
        </div>
      </div>
    </div>
  );
}
