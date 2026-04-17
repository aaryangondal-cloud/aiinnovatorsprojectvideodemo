import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { buildGeneratePrompt, Tone } from "@/lib/prompts";
import { checkLimit, ipFromRequest } from "@/lib/rate-limit";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const REQUIRED_SECTIONS = [
  "**HEADLINE**",
  "**PRODUCT DESCRIPTION**",
  "**KEY FEATURES**",
  "**SEO TAGS**",
  "**PRODUCT SCHEMA**",
  "**FAQ**",
];

function hasAllSections(text: string) {
  return REQUIRED_SECTIONS.every((s) => text.includes(s));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      stoneType,
      caratWeight,
      metalType,
      tone = "amipi",
      language = "English",
      modifier,
      tier = "free", // "free" | "pro"
    } = body;

    if (!stoneType || !caratWeight || !metalType) {
      return NextResponse.json(
        { error: "Stone type, carat weight, and metal type are required." },
        { status: 400 }
      );
    }

    // Per-IP rate limit: 20/min free, 200/min pro. Authenticated limiting is
    // applied on top when Supabase session is wired in Phase D.
    const ip = ipFromRequest(req);
    const limit = tier === "pro" ? 200 : 20;
    const rl = await checkLimit("generate", ip, limit, "1m");
    if (!rl.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again in a minute.", resetAt: rl.resetAt },
        { status: 429 }
      );
    }

    const prompt = buildGeneratePrompt({
      stoneType,
      caratWeight,
      cut: body.cut,
      color: body.color,
      clarity: body.clarity,
      metalType,
      metalKarat: body.metalKarat,
      settingStyle: body.settingStyle,
      certificateNumber: body.certificateNumber,
      price: body.price,
      additionalNotes: body.additionalNotes,
      tone: tone as Tone,
      language,
      modifier,
    });

    const modelId = tier === "pro" ? "gemini-2.0-flash" : "gemini-2.0-flash";
    // Note: switch to gemini-2.5-pro for paid tier when that model is available
    // via the @google/generative-ai SDK in this deployment.

    const model = client.getGenerativeModel({
      model: modelId,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    });

    let text = (await model.generateContent(prompt)).response.text();

    // Retry once if the response is missing required sections.
    if (!hasAllSections(text)) {
      const retry = await model.generateContent(
        prompt +
          "\n\nIMPORTANT: Your previous response was missing required sections. Return ALL six sections with the exact bold headers shown, in order: HEADLINE, PRODUCT DESCRIPTION, KEY FEATURES, SEO TAGS, PRODUCT SCHEMA, FAQ."
      );
      text = retry.response.text();
    }

    return NextResponse.json({ description: text });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}
