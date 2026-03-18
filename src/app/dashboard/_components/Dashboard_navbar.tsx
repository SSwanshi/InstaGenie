"use client";

import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { avataaars, bottts, croodles } from "@dicebear/collection";

const stylesMap = {
  humans: avataaars,
  animals: croodles,
  robots: bottts,
} as const;

interface DashboardNavbarProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function DashboardNavbar({
  isMobileMenuOpen,
  setMobileMenuOpen
}: DashboardNavbarProps) {
  const { user } = useAuth();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left side - Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="instagenie-logo text-2xl font-bold text-primary transition-all duration-300 hover:scale-105 hover:text-primary/80"
          >
            InstaGenie
          </Link>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4">

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Profile Button */}
          <Link
            href="/dashboard/user"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:border-primary/50 bg-muted hover:bg-muted/80 transition-all duration-300 overflow-hidden"
            title="User Profile"
          >
            {userAvatarSvg ? (
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: userAvatarSvg }}
              />
            ) : (
              <User size={18} className="text-foreground" />
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}