import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      stoneType,
      caratWeight,
      cut,
      color,
      clarity,
      metalType,
      metalKarat,
      settingStyle,
      certificateNumber,
      price,
      tone,
      additionalNotes,
    } = body;

    if (!stoneType || !caratWeight || !metalType) {
      return NextResponse.json(
        { error: "Stone type, carat weight, and metal type are required." },
        { status: 400 }
      );
    }

    const toneGuide: Record<string, string> = {
      luxury:
        "Use elevated, aspirational language. Evoke exclusivity, craftsmanship, and timeless elegance. Words like 'rare', 'artisanal', 'heirloom-quality'. Speak to emotion and legacy.",
      approachable:
        "Use warm, friendly language. Focus on love, celebration, and meaning. Avoid jargon. Make the reader feel excited and confident in their choice.",
      minimalist:
        "Use clean, precise language. Let the specs speak. Short sentences, zero fluff. Emphasize quality and simplicity.",
    };

    const prompt = `You are an expert jewelry copywriter for small independent jewelers. Your job is to turn raw GIA certificate data into compelling, SEO-optimized product descriptions that convert online shoppers into buyers.

TONE: ${toneGuide[tone] || toneGuide.luxury}

GIA CERTIFICATE DATA:
- Stone: ${stoneType}
- Carat Weight: ${caratWeight}ct
- Cut: ${cut || "Not specified"}
- Color Grade: ${color || "Not specified"}
- Clarity Grade: ${clarity || "Not specified"}
- Metal: ${metalType}${metalKarat ? ` ${metalKarat}k` : ""}
- Setting Style: ${settingStyle || "Not specified"}
- GIA Certificate #: ${certificateNumber || "Not specified"}
- Price: ${price ? `$${price}` : "Not specified"}
${additionalNotes ? `- Additional Details: ${additionalNotes}` : ""}

Write a product description with these exact sections:

**HEADLINE** (8-12 words, emotionally resonant, includes key specs)

**PRODUCT DESCRIPTION** (120-160 words, 2 paragraphs - first focuses on beauty and emotion, second covers the stone's credentials and why it matters)

**KEY FEATURES** (5 bullet points, each starting with a strong noun or adjective, mix emotional and technical)

**SEO TAGS** (8-10 comma-separated keywords a buyer would actually search for)

Format your response exactly as shown above with the bold section headers. Do not add any preamble or closing remarks.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ description: text });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate description. Check your API key." },
      { status: 500 }
    );
  }
}
