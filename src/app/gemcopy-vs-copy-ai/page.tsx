import type { Metadata } from "next";
import ComparisonTemplate, { type ComparisonData } from "@/components/ComparisonTemplate";

export const metadata: Metadata = {
  title: "GemCopy vs Copy.ai for jewelry retailers",
  description:
    "Copy.ai is a general AI copywriter. GemCopy is jewelry-specific with certificate extraction, schema output, and Shopify publish. Compare features and pricing.",
  alternates: { canonical: "https://aiinnovatorsprojectvideodemo.vercel.app/gemcopy-vs-copy-ai" },
};

const data: ComparisonData = {
  competitor: "Copy.ai",
  slug: "gemcopy-vs-copy-ai",
  directAnswer:
    "GemCopy outperforms Copy.ai for jewelry because it understands gemological grading, generates Shopify-ready schema, and is priced for independent jewelers.",
  tldr:
    "Copy.ai is built for generic product listings and marketing sequences. GemCopy is narrow by design: jewelry copy calibrated on Amipi's Instagram voice with a 30-second workflow from certificate to live Shopify product.",
  rows: [
    { capability: "Jewelry focus", gemcopy: "Exclusive", competitor: "Generic", winner: "gemcopy" },
    { capability: "GIA/HRD/AGS certificate upload", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Entry price", gemcopy: "$29/mo", competitor: "$36/mo (Starter)", winner: "gemcopy" },
    { capability: "Free tier", gemcopy: "3/day", competitor: "2000 words/mo", winner: "tie" },
    { capability: "Schema.org Product output", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Per-piece FAQ schema", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Workflow templates for other industries", gemcopy: "None", competitor: "Dozens", winner: "competitor" },
    { capability: "Shopify direct publish", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
  ],
  whyItMatters: [
    "Copy.ai's 'Product Description' template is generic. For jewelry you need grading vocabulary, cert preservation, and schema output. GemCopy does all three by default.",
    "Shopify publish saves 45 seconds per listing. Over a 500-piece catalog that's six hours.",
    "Per-piece FAQ schema is the single biggest on-page lever for AI search visibility. Copy.ai doesn't generate it; GemCopy does on every output.",
  ],
  faqs: [
    {
      q: "Is Copy.ai good for jewelry?",
      a: "Copy.ai can write serviceable jewelry descriptions with prompt engineering. It won't handle certificate uploads, schema markup, or CMS publishing. For a small catalog it works; for scale, GemCopy is the purpose-built option.",
    },
    {
      q: "What does GemCopy cost per listing?",
      a: "On the Pro tier ($29/mo unlimited), if you generate 100 listings per month your per-listing cost is $0.29. Hand-writing the same listing at $40/hr costs $30. That's a 100x efficiency.",
    },
    {
      q: "Does GemCopy have a Copy.ai-style workflow builder?",
      a: "No. GemCopy is a single workflow: certificate in, listing out. We do not compete on breadth; we compete on depth in jewelry copy.",
    },
  ],
};

export default function Page() {
  return <ComparisonTemplate data={data} />;
}
