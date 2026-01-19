"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {

  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="w-full backdrop-blur-lg bg-white/10 dark:bg-gray-900/20 border-b border-white/20 dark:border-gray-700/30 shadow-lg dark:shadow-gray-900/20">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-300 dark:hover:to-purple-300 transition-all duration-300"
          >
            InstaGenie
          </Link>

          <div className="flex items-center space-x-3">
            {isSignedIn ? (
              <UserButton afterSwitchSessionUrl="/" />
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30 dark:hover:border-gray-600/40"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-400 dark:hover:to-purple-400 backdrop-blur-sm shadow-lg hover:shadow-xl dark:shadow-indigo-500/20 transition-all duration-300 border border-white/20 dark:border-gray-600/30 hover:scale-105"
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