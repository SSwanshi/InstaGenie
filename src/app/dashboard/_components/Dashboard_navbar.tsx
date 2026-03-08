"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface DashboardNavbarProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function DashboardNavbar({
  isMobileMenuOpen,
  setMobileMenuOpen
}: DashboardNavbarProps) {
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

          {/* User Profile */}
          <div className="flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full border border-border hover:border-primary/50 transition-all duration-300",
                  userButtonPopoverCard: "bg-background border border-border shadow-xl",
                  userButtonPopoverText: "text-foreground",
                  userButtonPopoverActionButton: "hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 rounded-lg",
                }
              }}
            />
          </div>

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