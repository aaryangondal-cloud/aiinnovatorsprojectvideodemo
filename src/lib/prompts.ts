/**
 * Centralized prompt templates for GemCopy's AI generation.
 * Every tone, the base prompt, the extraction prompt, and regenerate modifiers live here.
 */

export type Tone = "amipi" | "luxury" | "professional" | "minimalist";

export const TONE_GUIDES: Record<Tone, string> = {
  amipi:
    "Write exactly like Amipi's Instagram: warm, wearability-first, conversational. Lead with how the piece feels to wear: 'clean', 'effortless', 'easy to wear', 'hits different'. One or two punchy sentences then the specs. Friendly and confident, never stuffy. No over-hyped luxury language. Think: 'Your Favorite Diamond Guys' energy, approachable, honest, direct.",
  luxury:
    "Use elevated, aspirational language. Evoke exclusivity, craftsmanship, and timeless elegance. Words like 'rare', 'artisanal', 'heirloom-quality'. Speak to emotion and legacy.",
  professional:
    "Use precise, professional B2B language. Be accurate and direct. Focus on grading credentials, certification authority, and investment value. Speak to trade buyers and serious retail customers.",
  minimalist:
    "Use clean, direct language. No fluff, no over-selling. Let the specs speak for themselves. Short, confident sentences. Emphasize accuracy and quality.",
};

export interface GenerateParams {
  stoneType: string;
  caratWeight: string;
  cut?: string;
  color?: string;
  clarity?: string;
  metalType: string;
  metalKarat?: string;
  settingStyle?: string;
  certificateNumber?: string;
  price?: string;
  tone: Tone;
  additionalNotes?: string;
  language?: string; // "English" (default), "Spanish", "French", "Hindi", "Hebrew"
  modifier?: string; // "warmer" | "shorter" | "more technical" | free-text
}

export function buildGeneratePrompt(p: GenerateParams): string {
  const language = p.language || "English";
  const modifierLine = p.modifier
    ? `\nSPECIAL INSTRUCTION FROM USER: Make this version ${p.modifier}. Keep accuracy to the certificate data.`
    : "";

  return `You are an expert jewelry copywriter specializing in certified gemstones and fine jewelry. You have deep knowledge of GIA, HRD, and AGS grading standards and you write product copy that is 100% accurate to the certificate data while being emotionally resonant and SEO-optimized.

TONE: ${TONE_GUIDES[p.tone]}

LANGUAGE: Write the entire output in ${language}. All section headers must remain in English (HEADLINE, PRODUCT DESCRIPTION, KEY FEATURES, SEO TAGS, PRODUCT SCHEMA, FAQ).${modifierLine}

CERTIFICATE DATA:
- Stone: ${p.stoneType}
- Carat Weight: ${p.caratWeight}ct
- Cut: ${p.cut || "Not specified"}
- Color: ${p.color || "Not specified"}
- Clarity: ${p.clarity || "Not specified"}
- Metal: ${p.metalType}${p.metalKarat ? " " + p.metalKarat + "k" : ""}
- Setting: ${p.settingStyle || "Not specified"}
- Certificate #: ${p.certificateNumber || "Not specified"}
- Price: ${p.price ? "$" + p.price : "Not specified"}
${p.additionalNotes ? "- Additional details: " + p.additionalNotes : ""}

Write a complete product listing with EXACTLY these sections in this exact order, each prefixed by the bold header shown:

**HEADLINE**
(8 to 12 words, emotionally resonant, includes key specs)

**PRODUCT DESCRIPTION**
(120 to 160 words, 2 paragraphs. First paragraph: sensory and emotional. Second paragraph: specs and provenance. Never invent facts not in the certificate data.)

**KEY FEATURES**
(5 bullet points, each one line, no leading dashes or bullets, just plain text separated by newlines.)

**SEO TAGS**
(8 to 10 keywords, comma separated, no hashtags, all lowercase.)

**PRODUCT SCHEMA**
Return valid JSON-LD Product schema on a single line (no line breaks inside the JSON), wrapped in a \`\`\`json code fence. Fields: @context, @type, name, description, image, brand (Amipi), sku (certificate number), material (metal), weight (carat weight in carats), offers (price + priceCurrency USD + availability InStock), additionalProperty array with Carat Weight, Color, Clarity, Cut, Certificate Number.

**FAQ**
5 Q&A pairs specific to THIS piece. Format each as:
Q: <question>
A: <answer>

Write questions a potential buyer would actually ask (certification, resizability, care, metal type, stone origin, etc.). Keep answers under 40 words.

Format your response EXACTLY as shown above with the bold section headers. Do not add any text before the first **HEADLINE** or after the last FAQ answer.`;
}

export const CERTIFICATE_EXTRACTION_PROMPT = `You are parsing a jewelry or gemstone certificate from GIA, HRD, or AGS.

Extract the following fields from the attached document and return ONLY a single JSON object with these keys (all string values, empty string if not found):

{
  "stoneType": "one of: Natural Diamond, Lab-Grown Diamond, Ruby, Emerald, Sapphire, Pearl, Alexandrite, Tanzanite, Aquamarine, Morganite",
  "caratWeight": "decimal number as string, e.g. 1.50",
  "cut": "one of: Ideal, Excellent, Very Good, Good, Fair",
  "color": "single letter D through M",
  "clarity": "one of: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2",
  "certificateNumber": "the report number printed on the certificate",
  "metalType": "usually blank on a stone certificate, leave empty unless explicitly mentioned",
  "metalKarat": "usually blank, leave empty unless explicitly mentioned",
  "settingStyle": "usually blank, leave empty unless explicitly mentioned"
}

Return ONLY the JSON object, no markdown fences, no preamble, no explanation.`;

export const IMAGE_ALT_PROMPT = `You are writing alt text for a jewelry product image.

The image attached is a piece of jewelry. Write a single sentence alt text under 125 characters that:
- Names the jewelry type (ring, earrings, bracelet, pendant, etc.)
- Names the primary stone and setting if visible
- Uses natural language readable by screen readers
- Includes 1 to 2 natural SEO keywords
- No marketing fluff, no exclamation points

Return ONLY the alt text, no quotes, no preamble.`;
