import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt, type, image } = await req.json();

    if (!type) {
      return NextResponse.json(
        { error: "type is required." },
        { status: 400 }
      );
    }

    if (!prompt && !image) {
      return NextResponse.json(
        { error: "Either prompt or image is required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const instruction = `
You are an expert Instagram hashtag generator.

Rules:
- Output ONLY hashtags
- No sentences
- No explanations
- No emojis
- Space-separated hashtags
- Generate 5 to 7 hashtags
- Tone: ${type}
`;

    const contents: Content[] = [
      {
        role: "user",
        parts: [{ text: instruction }],
      },
    ];

    if (image) {
      contents.push({
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: image,
            },
          },
        ],
      });
    }

    if (prompt) {
      contents.push({
        role: "user",
        parts: [{ text: `Context: ${prompt}` }],
      });
    }

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 60,
      },
    });

    let hashtag = "No hashtag generated.";

    try {
      const raw =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (raw) {
        hashtag = raw
          .split(/\s+/)
          .filter(word => word.startsWith("#"))
          .join(" ");
      }
    } catch {
      console.warn("Failed to parse Gemini response");
    }

    return NextResponse.json({ hashtags: hashtag });

  } catch (error: unknown) {
  let message = "Internal server error";
  let status = 500;

  if (error instanceof Error) {
    if (
      error.message.includes("overloaded") ||
      error.message.includes("503")
    ) {
      message = "AI service is busy. Please try again.";
      status = 503;
    }

    console.error("Gemini hashtag API error:", error.message);
  } else {
    console.error("Gemini hashtag API error:", error);
  }

  return NextResponse.json({ error: message }, { status });
}

}
