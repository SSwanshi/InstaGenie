// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};