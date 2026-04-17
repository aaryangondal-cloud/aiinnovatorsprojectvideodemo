import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lato",
});

const SITE_URL = "https://aiinnovatorsprojectvideodemo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GemCopy by Amipi - AI Product Descriptions for Jewelers",
  description:
    "GemCopy converts GIA, HRD, and AGS certificate data into SEO-optimized, conversion-ready jewelry product descriptions in under 30 seconds. Built by Amipi INC for independent jewelers.",
  keywords: [
    "AI product descriptions for jewelry",
    "GIA certificate to product description",
    "jewelry SEO copywriter",
    "Shopify jewelry descriptions",
    "diamond ring description generator",
    "AI copywriter for jewelers",
    "GemCopy",
    "Amipi",
  ],
  openGraph: {
    title: "GemCopy by Amipi - AI Product Descriptions for Jewelers",
    description:
      "Turn GIA, HRD, or AGS certificate data into SEO-optimized, conversion-ready product listings in under 30 seconds.",
    url: SITE_URL,
    siteName: "GemCopy by Amipi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GemCopy by Amipi - AI Product Descriptions for Jewelers",
    description:
      "Turn GIA, HRD, or AGS certificate data into SEO-optimized product listings in under 30 seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GemCopy by Amipi",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-powered product description generator for independent jewelers. Converts GIA, HRD, and AGS gemological certificate data into SEO-optimized, conversion-ready product listings in under 30 seconds.",
  featureList: [
    "GIA certificate to product description conversion",
    "HRD and AGS certificate support",
    "Four writing tones including Amipi Style, Luxury, Professional B2B, and Minimalist",
    "SEO-optimized headlines and tags",
    "Under 10 second generation time",
    "Saved history for every generated description",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  creator: {
    "@type": "Organization",
    name: "Amipi INC",
    url: "https://www.amipi.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Amipi INC",
  alternateName: "Amipi",
  url: "https://www.amipi.com",
  logo: "https://www.amipi.com/images/top-logo.png",
  description:
    "Amipi INC is a family-owned diamond and jewelry company with over 30 years in the trade, operating on a No-Bull Philosophy of transparent pricing and verified certifications.",
  sameAs: [
    "https://www.instagram.com/amipiinc",
    "https://www.linkedin.com/company/amipi-inc",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "SoftwareApplication",
      name: "GemCopy by Amipi",
      url: SITE_URL,
    },
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best AI tool for writing jewelry product descriptions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GemCopy by Amipi is purpose-built for jewelry product descriptions. Unlike generic AI copywriters, it understands gemological certificate data from GIA, HRD, and AGS, preserves spec accuracy, and outputs SEO-optimized listings in under 30 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "How do I turn a GIA certificate into a product description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter the certificate data (stone type, carat, cut, color, clarity, metal, setting, certificate number, and price) into GemCopy, choose a writing tone, and the AI generates a headline, full product description, key features, and SEO tag suggestions in under 10 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Is GemCopy free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GemCopy is free to use during the current demo period. Create an account, enter certificate data, and generate unlimited product descriptions.",
      },
    },
    {
      "@type": "Question",
      name: "What certificate formats does GemCopy support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GemCopy supports GIA (Gemological Institute of America), HRD (Hoge Raad voor Diamant), and AGS (American Gem Society) certificate data.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate one product listing with GemCopy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GemCopy generates a complete product listing in under 10 seconds. The full workflow from entering certificate data to copying the output is under 30 seconds per piece, compared to 30 to 60 minutes for hand-written copy.",
      },
    },
    {
      "@type": "Question",
      name: "What writing tones does GemCopy offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GemCopy offers four writing tones: Amipi Style (warm and wearability-first, calibrated from Amipi's own brand voice), Luxury (refined and evocative), Professional B2B (specification-led and trade-oriented), and Minimalist Direct (clean and spec-first).",
      },
    },
    {
      "@type": "Question",
      name: "Who built GemCopy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GemCopy was built by Amipi INC, a family-owned diamond and jewelry company with over 30 years in the trade. It applies Amipi's No-Bull Philosophy of transparent pricing and verified certifications to the problem of accurate, conversion-ready product copy.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      </head>
      <body className="font-sans">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
