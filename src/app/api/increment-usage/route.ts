import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromCookies(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { type, field } = await req.json();

    const validFields: Record<string, string[]> = {
      story: ["captionGenerated", "musicSuggested", "emojiSuggested"],
      post: ["captionGenerated", "musicSuggested", "hashtagGenerated"],
      reel: [
        "captionGenerated",
        "musicSuggested",
        "hashtagGenerated",
        "descriptionGenerated",
        "topicSuggested",
      ],
    };

    if (!validFields[type]) {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    if (!validFields[type].includes(field)) {
      return NextResponse.json({ message: "Invalid field" }, { status: 400 });
    }

    const updateField = `${type}Service.${field}`;

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      {
        $inc: { [updateField]: 1 },
      },
      { new: true } 
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Usage updated",
      updatedField: updateField,
    });
  } catch (error) {
    console.error("Usage Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}