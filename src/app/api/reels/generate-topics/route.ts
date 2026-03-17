import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { genre, targetAudience, category } = await req.json();

    if (!genre) {
      return NextResponse.json(
        { error: "Context is required" },
        { status: 400 },
      );
    }
    if (!targetAudience) {
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
You are an expert Instagram Reels content strategist.

Your task is to generate REEL IDEAS (not captions).

Each idea must describe:
- what the video will show
- the concept or storyline of the reel
- what makes it engaging or viral

First, analyze:
- Reel Category: ${category}
- Genre: ${genre}
- Target Audience: ${targetAudience}

IMPORTANT RULES:
- Generate VIDEO IDEAS, not captions.
- Each idea should clearly describe what the creator should record.
- Ideas must be specific and visual (not generic phrases).
- Avoid short caption-like sentences.
- Do NOT write hooks, quotes, or one-liners.
- Avoid vague ideas like "stay motivated" or "enjoy life".
- Focus on real, shootable reel concepts.
- Make ideas relatable or trend-driven for the target audience.

Output:
- 5 to 7 reel ideas
- One per line
- Each line should be 8–15 words
- Plain text only
- No emojis, no hashtags, no explanations

Return only the list of reel ideas.
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
      result.response.text().trim() || "No Topics Suggested.";
    return NextResponse.json({ audio });
  } catch (error) {
    console.error("Gemini Caption API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
