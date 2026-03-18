import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { avatar } = await req.json();
    if (!avatar) {
      return NextResponse.json({ error: "Avatar data is required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.avatar = avatar;
    await user.save();

    const updatedUser = await User.findById(decoded.userId).select("-password");

    return NextResponse.json({
      message: "Avatar updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update avatar error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
