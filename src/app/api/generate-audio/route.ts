import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  Content,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
    try {
        const {prompt,mood,image} = await req.json();
        if(!mood) {
            return NextResponse.json(
                {error: "Mood is required."},
                {status: 400}
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });

        const systemPrompt = `
You are an expert Instagram & Reels audio curator.

First, carefully analyze the IMAGE and infer:
- setting (nature, city, indoors, travel, lifestyle, etc.)
- time of day
- colors, lighting, energy
- emotions suggested by visuals

Then, combine this visual understanding with the selected MOOD.

IMPORTANT RULES:
- The image understanding must dominate over the mood.
- The mood is a refinement, not the main signal.
- But the audio must have the same mood as selected.
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

Selected Mood: ${mood}
`;



        const contents: Content[] = [];
        if(image) {
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
        else if(prompt) {
            contents.push({
                role: "user",
                parts: [
                    {
                        text: `${systemPrompt}\nUser prompt: ${prompt}`,
                    },
                ],
            });
        }
        else{
            return NextResponse.json(
                {error: "Either prompt or image is required."},
                {status: 400}
            );
        }
        const result = await model.generateContent({
            contents,
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 100,
            },
        });
        
        const audio = result.response.text()?.trim() || "No audio generated.";

        return NextResponse.json({audio});

    } catch (error){
        console.error("Gemini Audio API error:", error);
        return NextResponse.json(
            {error: "Internal server error."},
            {status: 500}
        );
    
    }
}