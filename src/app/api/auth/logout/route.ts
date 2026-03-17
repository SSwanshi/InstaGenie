import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear auth token cookie
  response.cookies.set("authToken", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
