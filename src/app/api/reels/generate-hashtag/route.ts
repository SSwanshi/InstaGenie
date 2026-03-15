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
You are a professional Instagram growth strategist specializing in viral hashtag strategies.

Rules:
- Generate relevant Instagram hashtags for a reel
- Min 7 hashtags
- Max 18 hashtags
- Mix of small, medium, and high-volume hashtags
- Highly relevant to the reel category and context
- Focus on discoverability and reach
- Do NOT include explanations
- Do NOT include normal text, only hashtags
- Avoid banned or spammy hashtags
- Avoid repeating hashtags
- Keep hashtags concise and natural

Context:
Reel Category: ${category}
Reel Context: ${context}

Return only the hashtags in one line separated by spaces.
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

    const hashtag =
      result.response.text().trim() || "No Hashtags Generated.";
    return NextResponse.json({ hashtag });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
