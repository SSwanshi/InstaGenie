import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { hashPassword, comparePassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { HydratedDocument } from "mongoose";
import type { IUser } from "@/models/user";

function getSafeUser(user: HydratedDocument<IUser>) {
  return {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    credits: user.credits,
    plan: user.plan,
    isPremium: user.isPremium,
    planExpiryDays: user.planExpiryDays,
    avatar: user.avatar,

    storyService: user.storyService,
    postService: user.postService,
    reelService: user.reelService,

    creditsUsed: user.creditsUsed,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(req: Request) {
  try {
    await connectDB();
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashed,
      name,
      planExpiryDays: 60,
      planLastUpdatedAt: new Date(),

      storyService: {
        captionGenerated: 0,
        musicSuggested: 0,
        emojiSuggested: 0,
      },
      postService: {
        captionGenerated: 0,
        musicSuggested: 0,
        hashtagGenerated: 0,
      },
      reelService: {
        captionGenerated: 0,
        musicSuggested: 0,
        hashtagGenerated: 0,
        descriptionGenerated: 0,
        topicSuggested: 0,
      },
      
    });

    const token = generateToken({ userId: user._id.toString() });

    const response = NextResponse.json(
      { user: getSafeUser(user), token },
      { status: 201 },
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 24 * 60 * 60, // 2 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function loginUser(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email })
  .select("+password storyService postService reelService");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({ userId: user._id.toString() });

    const response = NextResponse.json(
      { user: getSafeUser(user), token },
      { status: 200 },
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function logoutUser() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 },
  );

  response.cookies.set("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
