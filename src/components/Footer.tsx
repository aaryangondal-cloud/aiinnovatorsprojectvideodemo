import Image from "next/image";

const linkColumns = [
  {
    heading: "Amipi",
    links: [
      { label: "About Amipi", href: "https://www.amipi.com/about.html" },
      { label: "Contact Us", href: "https://www.amipi.com/contact-us.html" },
      { label: "Schedule a Virtual Meeting", href: "https://www.amipi.com/contact-us.html" },
      { label: "Instagram", href: "https://www.instagram.com/amipiinc" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/amipi-inc" },
    ],
  },
  {
    heading: "GemCopy",
    links: [
      { label: "Try it live", href: "/#try-demo" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
      { label: "Your savings", href: "/#roi" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "GIA certificate guide", href: "/gia-certificate-to-product-description" },
      { label: "VS1 clarity explained", href: "/resources/vs1-clarity-explained" },
      { label: "GIA vs HRD vs AGS", href: "/resources/gia-vs-hrd-vs-ags" },
      { label: "All resources", href: "/resources" },
    ],
  },
];

const credentials = [
  { label: "30+ years in the diamond trade" },
  { label: "42 W 48th St, New York" },
  { label: "GIA, HRD, and AGS certified" },
  { label: "Amipi partner exclusive" },
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
          {/* Brand + real contact info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="https://www.amipi.com/images/small-logo.png" alt="Amipi" width={36} height={36} className="h-9 w-auto" unoptimized />
              <span className="text-white font-bold text-sm leading-tight">Amipi Labs<br />GemCopy</span>
            </div>
            <address className="not-italic text-xs text-blue-200 leading-relaxed space-y-2">
              <p>
                42 W 48th St, 15th Floor<br />
                New York, NY 10036
              </p>
              <p>
                <a href="tel:+18005302647" className="hover:text-gold-400 transition-colors block">
                  Toll-free: 1-800-530-2647
                </a>
                <a href="tel:+12123549700" className="hover:text-gold-400 transition-colors block">
                  NYC: 1-212-354-9700
                </a>
                <a href="mailto:info@amipi.com" className="hover:text-gold-400 transition-colors block">
                  info@amipi.com
                </a>
              </p>
            </address>
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
            2026 Amipi INC. All rights reserved. GemCopy is an Amipi Labs product, free for Amipi partners.
          </p>
          <p className="text-xs text-gray-500">Built in New York.</p>
        </div>
      </div>
    </footer>
  );
}
