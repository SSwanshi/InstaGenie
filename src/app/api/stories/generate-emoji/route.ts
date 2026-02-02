import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt, expression, image } = await req.json();

    if (!expression) {
      return NextResponse.json(
        { error: "Expression is required." },
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
You are an expert social media content assistant specializing in Instagram Stories.

Task:
Suggest emojis that enhance the story’s emotional expression and encourage interaction.

Guidelines:
- Generate 3–5 emojis only
- Match the selected expression precisely
- Emojis must feel natural and human
- Do not repeat emojis
- Avoid generic emojis unless strongly relevant
- Suitable for Instagram Stories
- No text, no explanations, no numbering

Expression: ${expression}

Story context:
${prompt || "Visual-only story"}

Return ONLY the emojis as a single line string.
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

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 60,
      },
    });

    const emojis = result.response.text().trim();

    return NextResponse.json({ emojis });
  } catch (error: unknown) {
    let message = "Internal server error";
    let status = 500;

    if (error instanceof Error) {
      if (error.message.includes("overloaded") || error.message.includes("503")) {
        message = "AI service is busy. Please try again.";
        status = 503;
      }
      console.error("Gemini emoji API error:", error.message);
    } else {
      console.error("Gemini emoji API error:", error);
    }

    return NextResponse.json({ error: message }, { status });
  }
}
