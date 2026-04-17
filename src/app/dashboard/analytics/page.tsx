"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCurrentUser, type User } from "@/lib/auth";
import { getDescriptions, type SavedDescription } from "@/lib/storage";

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [descs, setDescs] = useState<SavedDescription[]>([]);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) return;
    setUser(u);
    setDescs(getDescriptions(u.email));
  }, []);

  const total = descs.length;
  const timeSavedMinutes = total * 44.5; // 45min hand-written, 30s GemCopy
  const hours = Math.round(timeSavedMinutes / 60);
  const days = Math.round(timeSavedMinutes / (60 * 8));
  const dollarSaved = Math.round((timeSavedMinutes / 60) * 40);

  const byMonth: Record<string, number> = {};
  descs.forEach((d) => {
    const key = new Date(d.createdAt).toISOString().slice(0, 7);
    byMonth[key] = (byMonth[key] || 0) + 1;
  });
  const months = Object.entries(byMonth).sort(([a], [b]) => a.localeCompare(b));
  const maxPerMonth = Math.max(1, ...months.map(([, v]) => v));

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-navy-700">Your GemCopy impact</h1>
            <p className="text-sm text-gray-500 mt-1">
              Time and money saved since you started using GemCopy.
            </p>
          </div>
          <Link href="/dashboard" className="text-sm font-bold text-navy-600 hover:text-gold-600">
            Back to dashboard
          </Link>
        </div>

        {!user && (
          <p className="text-sm text-gray-500">
            Please <Link className="underline" href="/auth">log in</Link> to see your analytics.
          </p>
        )}

        {user && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Descriptions generated", value: total.toLocaleString() },
                { label: "Hours saved", value: hours.toLocaleString() },
                { label: "Full work-days saved", value: days.toLocaleString() },
                { label: "Dollars saved (est.)", value: `$${dollarSaved.toLocaleString()}` },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black text-navy-700">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-black text-navy-700 mb-4">By month</h2>
              {months.length === 0 ? (
                <p className="text-sm text-gray-500">
                  You have no descriptions yet. Head to the
                  <Link className="underline ml-1" href="/dashboard">dashboard</Link> to generate your first.
                </p>
              ) : (
                <div className="space-y-3">
                  {months.map(([month, count]) => (
                    <div key={month} className="flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 w-24">
                        {month}
                      </span>
                      <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-gold-500"
                          style={{ width: `${(count / maxPerMonth) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-navy-700 w-10 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
