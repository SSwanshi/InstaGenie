"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Settings } from "lucide-react";
import { createAvatar } from '@dicebear/core';
import { 
  bottts, 
  avataaars, 
  croodles,
} from '@dicebear/collection';

const stylesMap = {
  humans: avataaars,
  animals: croodles,
  robots: bottts,
} as const;

export default function Navbar() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userAvatarSvg = useMemo(() => {
    if (!user) return "";
    try {
      const parsed = user.avatar ? JSON.parse(user.avatar) : { style: "humans", seed: user.name || "User" };
     
      const style = stylesMap[parsed.style as keyof typeof stylesMap] || avataaars;
      // @ts-expect-error - Mixed DiceBear collections have incompatible option types
      return createAvatar(style, {
        seed: parsed.seed,
        size: 32,
      }).toString();
    } catch {
      return createAvatar(avataaars, {
        seed: user.name || "User",
        size: 32,
      }).toString();
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch {
      alert("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return null;
  }

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
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group overflow-hidden focus:outline-none"
                  title="Profile"
                >
                  {userAvatarSvg ? (
                    <div 
                      className="w-8 h-8 rounded-full overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: userAvatarSvg }}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <User size={18} className="text-primary" />
                    </div>
                  )}
                  <div className="hidden sm:block pr-4 overflow-hidden">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-left truncate max-w-[180px]">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground text-left">
                      {user?.plan || "Free"}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Profile Option */}
                    <Link
                      href="/dashboard/user"
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:bg-primary/10 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings size={18} />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Logout Option */}
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut size={18} />
                      <span className="text-sm font-medium">
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
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

                {/* Signup - Hidden on mobile */}
                <Link
                  href="/signup"
                  className="hidden sm:block px-6 py-2 rounded-full font-semibold text-primary-foreground
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
