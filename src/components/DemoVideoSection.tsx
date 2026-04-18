"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DemoVideoSection() {
  const [playing, setPlaying] = useState(false);

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
            Built with Remotion, rendered from the same Amipi brand system you see across the site.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video rounded-3xl overflow-hidden ring-1 ring-gray-200 shadow-2xl bg-navy-gradient"
        >
          <video
            src="/gemcopy-demo.mp4"
            poster="/jewelry/pendant.jpg"
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => setPlaying(true)}
          >
            Your browser does not support the video tag.
          </video>

          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none flex items-end justify-start p-6"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-[10px] text-white font-bold uppercase tracking-widest">
                20 seconds · no audio
              </div>
            </motion.div>
          )}
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Want to be featured in the next version of this video? Call your Amipi rep at
          <a href="tel:+18005302647" className="text-gold-600 font-bold mx-1 hover:underline">
            1-800-530-2647
          </a>
          .
        </p>
      </div>
    </section>
  );
}
