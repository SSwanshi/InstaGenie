import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  Content,
} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone, image } = await req.json();

    if (!tone) {
      return NextResponse.json(
        { error: "Tone is required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const systemPrompt = `
You're an expert Instagram caption writer.
Write a catchy, engaging caption under 150 characters.
Tone: ${tone}.
`;

    const contents: Content[] = [];


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
          {
            text: prompt
              ? `${systemPrompt}\nUser prompt: ${prompt}`
              : systemPrompt,
          },
        ],
      });
    }

    else if (prompt) {
      contents.push({
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\nUser prompt: ${prompt}`,
          },
        ],
      });
    } else {
      return NextResponse.json(
        { error: "Either prompt or image is required." },
        { status: 400 }
      );
    }

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 100,
      },
    });

    const caption =
      result.response.text()?.trim() || "No caption generated.";

    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
