import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
      professional:
        "Use precise, professional B2B language. Be accurate and direct. Focus on grading credentials, certification authority, and investment value. Speak to trade buyers and serious retail customers.",
      minimalist:
        "Use clean, direct language. No fluff, no over-selling. Let the specs speak for themselves. Short, confident sentences. Emphasize accuracy and quality.",
    };

    const prompt = `You are an expert jewelry copywriter specializing in diamond and fine jewelry product listings. Your copy is accurate, professional, and honest - never over-hyped or misleading. Every spec you mention must match the certificate data exactly. Your job is to turn raw certificate data into compelling, SEO-optimized product descriptions that convert online shoppers into buyers.

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

    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ description: text });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate description. Check your API key." },
      { status: 500 }
    );
  }
}
