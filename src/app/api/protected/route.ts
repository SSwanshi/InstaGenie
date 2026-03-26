import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function startOfUtcDay(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function getElapsedUtcDays(from: Date, to: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((startOfUtcDay(to) - startOfUtcDay(from)) / msPerDay);
}

export async function GET(req: NextRequest) {
  try {
    // Check for authToken in cookies
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userData = await User.findById(user.userId).select("-password");

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    const lastUpdatedAt = userData.planLastUpdatedAt ?? userData.createdAt ?? now;
    const elapsedDays = getElapsedUtcDays(new Date(lastUpdatedAt), now);

    if (userData.isPremium && elapsedDays > 0) {
      userData.planExpiryDays = Math.max(0, (userData.planExpiryDays ?? 0) - elapsedDays);
      userData.planLastUpdatedAt = now;
      await userData.save();
    }

    return NextResponse.json({
      message: "Successfully fetched user data",
      user: userData,
    });
  } catch (error) {
    console.error("Protected route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}