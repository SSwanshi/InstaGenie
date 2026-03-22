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

    const dbUser = await User.findById(user.userId);

    if (!dbUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const credits = dbUser.credits || 0;
    const creditsUsed = dbUser.creditsUsed || 0;

    const creditsLeft = credits - creditsUsed;

    return NextResponse.json({
      credits,
      creditsUsed,
      creditsLeft,
    });

  } catch (error) {
    console.error("Usage Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}