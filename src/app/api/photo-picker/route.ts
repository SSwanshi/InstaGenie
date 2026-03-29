import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { images, mood, priority } = await req.json();

    if (!images || !Array.isArray(images) || images.length < 2) {
      return NextResponse.json(
        { error: "At least 2 images are required." },
        { status: 400 }
      );
    }

    if (!mood || !priority) {
      return NextResponse.json(
        { error: "Mood and priority are required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const systemPrompt = `
You are an intelligent photo selection assistant.

Your task is to analyze multiple images and select the best one based on user preferences.

Step 1: For each image:
- Understand the scene, subject, and overall quality
- Evaluate visual appeal (clarity, lighting, composition, expression)

Step 2: Consider user preferences:
- Mood: ${mood}
- Priority: ${priority}

Step 3: Select:
- The BEST image (most suitable overall)
- Optionally rank top 3 images

Guidelines:
- Prefer clear, sharp, well-lit images
- Avoid blurry, dark, or awkward photos
- Prefer natural expressions and confident poses
- Consider background cleanliness and composition
- Match the selected image with the given mood and priority

Important:
- Do NOT describe all images in detail
- Do NOT output long explanations

Output format (strict JSON only, without markdown formatting):
{
  "best_index": number,
  "top_choices": [number, number, number],
  "reason": "short explanation"

  in reason when you explain the best image, focus on how it matches the mood and priority. For example, if the priority is "confidence", you might say "Image 2 has a confident pose and strong eye contact, making it the best choice for the confidence mood. Also when you point the image number then make it 1 based indexing instead of 0 based indexing. So if the best image is the first one in the array then you should say Image 1 instead of Image 0."
}
`;

    const parts: Part[] = [{ text: systemPrompt }];

    // Add images to parts. Format indicates we should provide them sequentially.
    images.forEach((image: string, index: number) => {
      // Assuming images are sent as base64 strings
      parts.push({ text: `Image ${index}:` });
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: image,
        },
      });
    });

    const contents: Content[] = [
      {
        role: "user",
        parts,
      },
    ];

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    let evaluation = null;

    try {
      const raw =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (raw) {
        evaluation = JSON.parse(raw);
      }
    } catch {
      console.warn("Failed to parse Gemini response");
    }

    if (!evaluation) {
      return NextResponse.json({ error: "Failed to evaluate images." }, { status: 500 });
    }

    return NextResponse.json(evaluation);

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

      console.error("Gemini photo picker API error:", error.message);
    } else {
      console.error("Gemini photo picker API error:", error);
    }

    return NextResponse.json({ error: message }, { status });
  }
}
