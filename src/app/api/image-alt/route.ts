import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { IMAGE_ALT_PROMPT } from "@/lib/prompts";
import { checkLimit, ipFromRequest } from "@/lib/rate-limit";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const runtime = "nodejs";
export const maxDuration = 15;

/**
 * Generates accessibility + SEO-friendly alt text for a product image.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = ipFromRequest(req);
    const rl = await checkLimit("image-alt", ip, 20, "24h");
    if (!rl.success) {
      return NextResponse.json({ error: "Daily alt-text quota reached." }, { status: 429 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please upload an image file." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 5MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.2, maxOutputTokens: 128 },
    });

    const result = await model.generateContent([
      { inlineData: { mimeType: file.type, data: base64 } },
      { text: IMAGE_ALT_PROMPT },
    ]);
    const altText = result.response.text().trim().replace(/^["']|["']$/g, "");

    return NextResponse.json({ altText });
  } catch (err) {
    console.error("Image alt error:", err);
    return NextResponse.json({ error: "Failed to generate alt text." }, { status: 500 });
  }
}
