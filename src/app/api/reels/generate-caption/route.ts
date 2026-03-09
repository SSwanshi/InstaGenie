import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { category, description, style } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: "Description is required." },
        { status: 400 },
      );
    }
    if (!category) {
      return NextResponse.json(
        { error: "Cateogy is not selected." },
        { status: 400 },
      );
    }
    if (!style) {
      return NextResponse.json(
        { error: "Style is not selected." },
        { status: 400 },
      );
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const systemPrompt = `
You are a professional Instagram Reels content creator.

Rules:
- Sound natural and human, not like AI
- Write a short, catchy caption for a reel
- Max 120 characters
- Start with a strong hook if possible
- Use at most 2 emojis
- Do NOT use hashtags
- Avoid generic phrases like "living my best life"

Context:
Reel Category: ${category}
Reel Description: ${description}

Tone: ${style}

Write one engaging Instagram Reel caption.
`;
    const contents: Content[] = [
      {
        role: "user",
        parts: [
          {
            text: systemPrompt,
          },
        ],
      },
    ];

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 100,
      },
    });

    const caption = result.response.text().trim() || "No caption generated.";

    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
