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
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left side - Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="instagenie-logo text-2xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105"
          >
            InstaGenie
          </Link>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4">

          {/* Search or notifications could go here */}

          {/* User Profile */}
          <div className="flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full border border-white/20 hover:border-sky-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]",
                  userButtonPopoverCard: "bg-black/95 backdrop-blur-2xl border border-white/10 shadow-2xl",
                  userButtonPopoverText: "text-gray-200",
                  userButtonPopoverActionButton: "hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-200 rounded-lg",
                }
              }}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}