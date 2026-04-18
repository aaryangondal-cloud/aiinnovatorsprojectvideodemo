import type { Metadata } from "next";
import ComparisonTemplate, { type ComparisonData } from "@/components/ComparisonTemplate";

export const metadata: Metadata = {
  title: "GemCopy vs Jasper for jewelry product descriptions",
  description:
    "Jasper is a general-purpose marketing copy tool. GemCopy is built for jewelry, reads GIA certificates, and publishes directly to Shopify. Compared feature-by-feature.",
  alternates: { canonical: "https://gemcopybyamipi.vercel.app/gemcopy-vs-jasper" },
};

const data: ComparisonData = {
  competitor: "Jasper",
  slug: "gemcopy-vs-jasper",
  directAnswer:
    "For independent jewelers, GemCopy is better than Jasper because it understands gemological grading, extracts GIA certificates, and costs a fraction of Jasper's price.",
  tldr:
    "Jasper is a powerful general marketing tool priced for mid-market teams. GemCopy is a focused jewelry product description engine with GIA/HRD/AGS extraction, schema output, and Shopify publish for $29/mo.",
  rows: [
    { capability: "Jewelry-specific workflow", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Reads GIA/HRD/AGS certificates", gemcopy: "Yes, vision extraction", competitor: "No", winner: "gemcopy" },
    { capability: "Entry price", gemcopy: "$29/mo", competitor: "$49/mo (Creator)", winner: "gemcopy" },
    { capability: "Generic marketing copy", gemcopy: "No", competitor: "Yes", winner: "competitor" },
    { capability: "Brand voice library", gemcopy: "4 tones, Amipi-calibrated", competitor: "Custom brand voice", winner: "tie" },
    { capability: "Schema.org Product output", gemcopy: "Yes, one click", competitor: "No", winner: "gemcopy" },
    { capability: "Shopify direct publish", gemcopy: "Yes", competitor: "Plugin only", winner: "gemcopy" },
    { capability: "Per-piece FAQ generation", gemcopy: "Yes", competitor: "Manual", winner: "gemcopy" },
  ],
  whyItMatters: [
    "Jasper is optimized for blog posts and ad copy. Jewelry listings need spec accuracy, schema markup, and CMS publishing - capabilities GemCopy is built around.",
    "Pricing: $29/mo vs $49/mo is material when you're an independent jeweler. GemCopy Pro is less than one hour of copywriter time.",
    "GemCopy's certificate upload saves 90 seconds per listing vs even the best Jasper prompt workflow.",
  ],
  faqs: [
    {
      q: "Is Jasper good for jewelry product descriptions?",
      a: "Jasper can produce decent jewelry copy if you build a custom template and feed it the certificate data by hand. It won't output schema.org JSON-LD and won't publish to Shopify. For occasional listings it's fine; for catalog scale it's slower than GemCopy.",
    },
    {
      q: "Can I use my Jasper brand voice in GemCopy?",
      a: "Not directly today. GemCopy Enterprise includes custom tone training. Paste your brand guidelines and reference pieces, and GemCopy fits your voice.",
    },
    {
      q: "Does GemCopy work for non-jewelry products?",
      a: "No. GemCopy is focused on jewelry only. If you need general marketing copy, Jasper is the better fit and GemCopy isn't trying to compete there.",
    },
    {
      q: "Can I try GemCopy before paying?",
      a: "Yes. Free tier gets 3 generations per day with no credit card. Pro is $29/mo with a 14-day trial.",
    },
  ],
};

export default function Page() {
  return <ComparisonTemplate data={data} />;
}
