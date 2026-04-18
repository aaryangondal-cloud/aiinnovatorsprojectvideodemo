"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Video placeholder. When the real 20-second demo video is recorded,
 * replace the placeholder poster with a real <video> or YouTube embed.
 */
export default function DemoVideoSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Watch It In Action
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-navy-700 mt-2">
            Cert in, copy out. 30 seconds.
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            A real Amipi partner, a real GIA certificate, a real listing. No edits.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-3xl overflow-hidden ring-1 ring-gray-200 shadow-2xl bg-navy-gradient"
        >
          {/* Placeholder poster: pendant image with play overlay */}
          <Image
            src="/jewelry/pendant.jpg"
            alt="GemCopy demo video, placeholder"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-navy-900/60 flex flex-col items-center justify-center text-white text-center px-6">
            <div className="w-20 h-20 rounded-full bg-gold-500 text-navy-700 flex items-center justify-center shadow-2xl mb-4">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">
              Video coming soon
            </p>
            <p className="text-sm text-blue-100 max-w-md">
              A 20-second product demo is being recorded with one of our partner jewelers.
              Drop it in <code className="bg-white/10 px-1.5 py-0.5 rounded text-gold-300">src/components/DemoVideoSection.tsx</code> when ready.
            </p>
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Want to be in the video? Call your Amipi rep at
          <a href="tel:+18005302647" className="text-gold-600 font-bold mx-1 hover:underline">1-800-530-2647</a>.
        </p>
      </div>
    </section>
  );
}
