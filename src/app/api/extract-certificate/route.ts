import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { CERTIFICATE_EXTRACTION_PROMPT } from "@/lib/prompts";
import { checkLimit, ipFromRequest } from "@/lib/rate-limit";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Accepts a multipart/form-data upload with a "file" field containing a PDF
 * or image of a GIA/HRD/AGS certificate. Uses Gemini's multimodal capability
 * to extract structured fields and return them as JSON ready to populate
 * the GemCopy form.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = ipFromRequest(req);
    const rl = await checkLimit("extract-cert", ip, 10, "24h");
    if (!rl.success) {
      return NextResponse.json(
        { error: "Upload limit reached for today. Sign up for unlimited extractions." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 10MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
    });

    const result = await model.generateContent([
      { inlineData: { mimeType: file.type || "application/pdf", data: base64 } },
      { text: CERTIFICATE_EXTRACTION_PROMPT },
    ]);
    const raw = result.response.text().trim();

    // Attempt to parse JSON; Gemini occasionally wraps in ``` fences despite instruction.
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed: Record<string, string>;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "Could not parse certificate. Try a clearer scan." },
        { status: 422 }
      );
    }

    return NextResponse.json({ extracted: parsed });
  } catch (err) {
    console.error("Certificate extraction error:", err);
    return NextResponse.json(
      { error: "Failed to extract certificate. Please try again." },
      { status: 500 }
    );
  }
}
