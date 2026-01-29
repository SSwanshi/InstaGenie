"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-background border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="instagenie-logo text-3xl text-primary hover:text-primary/80 transition-colors"
          >
            InstaGenie
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            {isSignedIn ? (
              <UserButton afterSwitchSessionUrl="/" />
            ) : (
              <>
                {/* Login */}
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-full text-muted-foreground
                    border border-border bg-card
                    hover:bg-accent hover:border-primary/40
                    transition-all duration-300"
                >
                  Login
                </Link>

                {/* Signup */}
                <Link
                  href="/signup"
                  className="px-6 py-2 rounded-full font-semibold text-primary-foreground
                    bg-primary hover:bg-primary/90
                    shadow-lg shadow-primary/30
                    hover:shadow-primary/50 hover:scale-105
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
