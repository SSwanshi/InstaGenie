import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!, 
});

export async function POST(req: NextRequest) {
    try {
        const { prompt, tone, image } = await req.json();

        if (!tone) {
            return NextResponse.json({ error: "Tone is required." }, { status: 400 });
        }

        // Build messages based on inputs
        let messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

        // SYSTEM: always provide the hashtag role
        const systemMessage: OpenAI.Chat.ChatCompletionMessageParam = {
            role: "system",
            content: `You're an expert Instagram hashtag writer. Write a catchy, engaging, short hashtags minimum 5. Just give hashtags and no content. Tone: ${tone}.`,
        };


        if (image) {
            // IMAGE + optional prompt
            const visionContent: OpenAI.Chat.ChatCompletionContentPart[] = [
                {
                    type: "image_url",
                    image_url: { url: `data:image/jpeg;base64,${image}` },
                },
            ];

            if (prompt) {
                visionContent.push({
                    type: "text",
                    text: prompt,
                });
            }

            messages = [
                systemMessage,
                {
                    role: "user",
                    content: visionContent,
                },
            ];
        } else if (prompt) {
            // TEXT only
            messages = [
                systemMessage,
                {
                    role: "user",
                    content: prompt,
                },
            ];
        } else {
            return NextResponse.json(
                { error: "Either prompt or image is required." },
                { status: 400 }
            );
        }

        // OpenAI call
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // fast & supports vision
            messages,
            max_tokens: 100,
            temperature: 0.9,
        });

        const hashtag = response.choices[0]?.message?.content?.trim();

        return NextResponse.json({ hashtag });
    } catch (error) {
        console.error("hashtag API error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
