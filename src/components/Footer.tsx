import Image from "next/image";

const linkColumns = [
  {
    heading: "About Amipi",
    links: [
      { label: "Amipi INC", href: "https://www.amipi.com" },
      { label: "Our Story", href: "https://www.amipi.com/about.html" },
      { label: "Instagram", href: "https://www.instagram.com/amipiinc" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/amipi-inc" },
    ],
  },
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Reviews", href: "/#testimonials" },
      { label: "FAQ", href: "/#faq" },
      { label: "Sign up free", href: "/auth" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "GIA certificate guide", href: "/gia-certificate-to-product-description" },
      { label: "VS1 clarity explained", href: "/resources/vs1-clarity-explained" },
      { label: "GIA vs HRD vs AGS", href: "/resources/gia-vs-hrd-vs-ags" },
      { label: "2026 jewelry copy guide", href: "/resources/jewelry-copy-guide" },
    ],
  },
];

const credentials = [
  { label: "30+ years in the diamond trade" },
  { label: "Offices in New York and Mumbai" },
  { label: "Exclusively GIA, HRD, and AGS certified" },
  { label: "BBB A+ accredited" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top: credibility strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 mb-10 border-b border-white/10">
          {credentials.map((c) => (
            <div key={c.label} className="flex items-start gap-2 text-xs text-blue-200">
              <svg className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="leading-snug">{c.label}</span>
            </div>
          ))}
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
              <span className="text-white font-bold text-sm leading-tight">GemCopy<br />by Amipi</span>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed">
              AI-powered jewelry product descriptions, built by a family-owned diamond company
              with over three decades in the trade.
            </p>
          </div>

          {linkColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-blue-200 hover:text-gold-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            2026 Amipi INC. All rights reserved. GemCopy is a tool of Amipi INC.
          </p>
          <p className="text-xs text-gray-500">Powered by Google Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
}
