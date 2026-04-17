import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { buildGeneratePrompt, Tone } from "@/lib/prompts";
import { checkLimit, ipFromRequest } from "@/lib/rate-limit";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Public, unauthenticated demo endpoint for the try-before-signup section.
 * Heavily rate-limited per IP to prevent abuse.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = ipFromRequest(req);
    const rl = await checkLimit("generate-demo", ip, 3, "24h");
    if (!rl.success) {
      return NextResponse.json(
        {
          error:
            "You've reached the free demo limit. Create a free account to generate unlimited descriptions.",
          limitReached: true,
          resetAt: rl.resetAt,
        },
        { status: 429 }
      );
    }

    const { stoneType, caratWeight, metalType, tone = "amipi" } = await req.json();

    if (!stoneType || !caratWeight || !metalType) {
      return NextResponse.json(
        { error: "Stone type, carat weight, and metal type are required." },
        { status: 400 }
      );
    }

    const prompt = buildGeneratePrompt({
      stoneType,
      caratWeight,
      metalType,
      tone: tone as Tone,
    });

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
    });
    const text = (await model.generateContent(prompt)).response.text();

    return NextResponse.json({
      description: text,
      remaining: rl.remaining,
    });
  } catch (err) {
    console.error("Demo generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}
