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
You are an expert Instagram & Reels audio curator.

First, carefully analyze the context and infer:
- emotions suggested by visuals
- map the context with the category (${category}) of the reel

Then, combine this visual understanding with the selected ${style}.

IMPORTANT RULES:
- The context understanding must dominate over the style.
- The style is a refinement, not the main signal.
- But the audio must have the same style as selected.
- Do NOT suggest songs whose title directly matches the mood
  (e.g. avoid "Happy", "Sad", "Energetic", etc.).
- Avoid generic or obvious choices.
- The Audio must exist in real life.
- Prefer cinematic, aesthetic, or viral background audios.

Output:
- 5 to 7 audio suggestions
- One per line
- Plain text only
- No markdown, no symbols, no explanations

Context:
Reel Category: ${category}
Reel Context: ${context}

Return the suggestions as a simple list, one per line.
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

    const audio =
      result.response.text().trim() || "No Audio Suggested.";
    return NextResponse.json({ audio });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
