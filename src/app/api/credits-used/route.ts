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
      comments: ["commentGenerated"],
      photoPicker: ["photoPicked"],
    };

    if (!validFields[type]) {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    if (!validFields[type].includes(field)) {
      return NextResponse.json({ message: "Invalid field" }, { status: 400 });
    }

    let update = {};
    if (field === "captionGenerated") {
      update = { $inc: { creditsUsed: 10 } };
    }
    else if(field === "musicSuggested"){
        update = { $inc: { creditsUsed: 10 } };
    }
    else if(field === "emojiSuggested"){
        update = { $inc: { creditsUsed: 5 } };
    }
    else if(field === "descriptionGenerated"){
        update = { $inc: { creditsUsed: 20 } };
    }
    else if(field === "topicSuggested"){
        update = { $inc: { creditsUsed: 20 } };
    }
    else if(field === "hashtagGenerated" && type === "reel"){
        update = { $inc: { creditsUsed: 10 } };
    }
    else if(field === "hashtagGenerated" && type === "post"){
        update = { $inc: { creditsUsed: 5 } };
    }
    else if(field === "commentGenerated" && type === "comments"){
        update = { $inc: { creditsUsed: 5 } };
    }
    else if(field === "photoPicked" && type === "photoPicker"){
        update = { $inc: { creditsUsed: 10 } };
    }

    const updatedUser = await User.findByIdAndUpdate(user.userId, update, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Usage updated",
      update: update,
    });
  } catch (error) {
    console.error("Usage Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
