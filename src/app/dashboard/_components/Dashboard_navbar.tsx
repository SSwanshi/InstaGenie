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
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-white/90 dark:bg-gray-800/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-gray-900/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-800/85">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Left side - Brand (with sidebar spacing on desktop) */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 dark:from-cyan-300 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 dark:hover:from-cyan-200 dark:hover:via-blue-300 dark:hover:to-purple-400 transition-all duration-300 hover:scale-105"
          >
            InstaGenie
          </Link>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-[1px] group transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-50 dark:group-hover:bg-gray-700 transition-all duration-300">
              {isMobileMenuOpen ? (
                <X size={16} className="text-gray-700 dark:text-white transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
              ) : (
                <Menu size={16} className="text-gray-700 dark:text-white transition-all duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
              )}
            </div>
          </button>

          {/* User Profile */}
          <div className="flex items-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border-2 border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25",
                  userButtonPopoverCard: "bg-white/95 dark:bg-gray-800/95 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl backdrop-blur-xl",
                  userButtonPopoverText: "text-gray-700 dark:text-gray-200",
                  userButtonPopoverActionButton: "hover:bg-gray-100/60 dark:hover:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 rounded-lg",
                  userButtonPopoverActionButtonText: "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}