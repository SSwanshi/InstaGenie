import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  Content,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt, tone, context } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Comment to reply to is required." },
        { status: 400 }
      );
    }

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
You are an expert at writing natural, human-like replies to comments on social media.

Step 1: Understand the input:
- Comment to reply: ${prompt}
- Context (if any): ${context || "none"}
- Tone: ${tone}

Step 2: Generate replies that feel natural and conversational.

Guidelines:
- Sound like a real person, not AI
- Keep replies short and natural (1–2 lines max)
- Match the selected tone strongly
- If context is provided, continue the conversation naturally
- Do NOT repeat the original comment
- Avoid generic replies like "thanks" or "lol"
- Make replies engaging, relevant, and varied
- Use slightly casual, imperfect language when suitable

Tone-specific behavior:
- Friendly / Casual → relaxed and natural
- Funny / Playful → light humor
- Flirty → subtle and smooth (not cringe)
- Roast → witty, sarcastic but not offensive
- Polite / Professional → respectful and clean
- Supportive / Encouraging → positive and uplifting

Output:
- Generate 3 to 6 unique reply options
- Each reply on a new line
- No numbering, no bullets, no explanations
`;

    const textContent = context
      ? `${systemPrompt}\nComment: ${prompt}\nContext: ${context}\nTone: ${tone}`
      : `${systemPrompt}\nComment: ${prompt}\nTone: ${tone}`;

    const contents: Content[] = [];

    contents.push({
      role: "user",
      parts: [
        {
          text: textContent,
        },
      ],
    });

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 100,
      },
    });

    const reply =
      result.response.text()?.trim() || "No reply generated.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error generating reply:", error);
    return NextResponse.json(
      { error: "Failed to generate reply." },
      { status: 500 }
    );
  }
}
