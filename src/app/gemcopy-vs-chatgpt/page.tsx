import type { Metadata } from "next";
import ComparisonTemplate, { type ComparisonData } from "@/components/ComparisonTemplate";

export const metadata: Metadata = {
  title: "GemCopy vs ChatGPT for jewelry product descriptions",
  description:
    "GemCopy is a purpose-built jewelry copywriter that reads GIA/HRD/AGS certificates and outputs Shopify-ready copy with schema. ChatGPT is a general assistant. Full comparison.",
  alternates: { canonical: "https://gemcopybyamipi.vercel.app/gemcopy-vs-chatgpt" },
};

const data: ComparisonData = {
  competitor: "ChatGPT",
  slug: "gemcopy-vs-chatgpt",
  directAnswer:
    "GemCopy is the better tool for jewelry product descriptions, because it is purpose-built for gemological data and outputs Shopify-ready schema in one click.",
  tldr:
    "ChatGPT can write a jewelry description if you prompt it carefully every time. GemCopy reads your GIA certificate, understands grading terminology natively, and returns a structured listing with schema.org Product JSON-LD, per-piece FAQs, and a one-click Shopify publish.",
  rows: [
    { capability: "Purpose-built for jewelry", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Upload GIA certificate PDF", gemcopy: "Yes, auto-extracted", competitor: "Workaround only", winner: "gemcopy" },
    { capability: "Schema.org Product JSON-LD", gemcopy: "Built-in, one click", competitor: "Only if you prompt", winner: "gemcopy" },
    { capability: "Per-piece FAQ Q&A", gemcopy: "5 Q&As per output", competitor: "Only if you prompt", winner: "gemcopy" },
    { capability: "Shopify direct publish", gemcopy: "Yes", competitor: "No", winner: "gemcopy" },
    { capability: "Amipi brand voice", gemcopy: "Calibrated from Instagram", competitor: "Generic", winner: "gemcopy" },
    { capability: "Price per month", gemcopy: "$29", competitor: "$20 (Plus)", winner: "competitor" },
    { capability: "General question answering", gemcopy: "No", competitor: "Yes", winner: "competitor" },
  ],
  whyItMatters: [
    "Every jewelry listing needs spec accuracy. ChatGPT can hallucinate grades. GemCopy pulls grades from your certificate and never invents facts.",
    "Product schema is the reason your listing can rank in Google AI Overview and Perplexity. ChatGPT won't generate it unless you remember to ask every single time.",
    "The Amipi Style tone was calibrated from Amipi's Instagram. ChatGPT has no brand voice without heavy prompt engineering.",
    "Time per listing: GemCopy 30 seconds. ChatGPT 5 to 10 minutes of prompting, reviewing, and reformatting.",
  ],
  faqs: [
    {
      q: "Can't I just use ChatGPT with a custom prompt?",
      a: "You can, and it works for the first few listings. By listing 20 you're fighting inconsistent formatting, tone drift, and missing schema. GemCopy enforces structure by design and saves every output to your history.",
    },
    {
      q: "Does GemCopy use ChatGPT under the hood?",
      a: "No. GemCopy uses Google Gemini (2.0 Flash today, 2.5 Pro on the Pro tier). The difference in cost lets GemCopy stay affordable at scale.",
    },
    {
      q: "Is GemCopy more accurate on diamond specs than ChatGPT?",
      a: "Yes. GemCopy refuses to output specs not present in your certificate data and uses a temperature of 0.3 for deterministic grading language. ChatGPT defaults to 0.7 and can gloss over inclusions or misstate color grades.",
    },
    {
      q: "Can I migrate from ChatGPT to GemCopy?",
      a: "Yes. Paste your old descriptions into the A/B panel on GemCopy Pro and GemCopy will regenerate them with accurate specs and schema. You keep both versions side-by-side until you publish.",
    },
  ],
};

export default function Page() {
  return <ComparisonTemplate data={data} />;
}
