import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromCookies(req);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    await User.findByIdAndDelete(user.userId);

    const response = NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );

    response.cookies.set("authToken", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
