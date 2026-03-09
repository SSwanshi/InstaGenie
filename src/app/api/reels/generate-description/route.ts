import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { context, style, category } = await req.json();

    if (!context) {
      return NextResponse.json(
        { error: "Context is required" },
        { status: 400 },
      );
    }
    if (!style) {
      return NextResponse.json(
        { error: "Style is not selected" },
        { status: 400 },
      );
    }
    if (!category) {
      return NextResponse.json(
        { error: "category is not selected" },
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
- Write a short, engaging description for an Instagram reel
- Min 100 characters
- Add stats and data if category is educational or news
- Max 500 characters
- Make it engaging and easy to read
- Use at most 2 emojis
- Do NOT use hashtags
- Avoid generic phrases like "living my best life"

Context:
Reel Category: ${category}
Reel Context: ${context}

Tone: ${style}

Write one engaging Instagram Reel description.
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

    const description =
      result.response.text().trim() || "No Description Generated.";
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
