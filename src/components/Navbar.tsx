"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black/40 backdrop-blur-xl border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="instagenie-logo text-3xl text-sky-400 hover:text-sky-300 transition-colors"
          >
            InstaGenie
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <UserButton afterSwitchSessionUrl="/" />
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full text-gray-200
                    border border-white/15 bg-white/5
                    hover:bg-white/10 hover:border-sky-400/40
                    transition-all duration-300"
                >
                  Login
                </Link>

                {/* Signup */}
                <Link
                  href="/signup"
                  className="px-6 py-2 rounded-full font-semibold text-black
                    bg-sky-400 hover:bg-sky-300
                    shadow-lg shadow-sky-500/30
                    hover:shadow-sky-400/50 hover:scale-105
                    transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
}
