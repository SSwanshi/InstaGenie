"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Sidebar from "./_components/Sidebar";
import DashboardNavbar from "./_components/Dashboard_navbar";
import DashboardFooter from "./_components/Dashboard_footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !userId) {
      redirect("/login");
    }
  }, [isLoaded, userId]);

  /* -------------------- Loading State -------------------- */
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white/20" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  /* -------------------- Not Authenticated -------------------- */
  if (!userId) return null;

  /* -------------------- Layout -------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-[#030014] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Navbar */}
      <DashboardNavbar
        isMobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Content */}
      <div className="flex flex-1 pt-16 relative z-10">

        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />

        {/* Main */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col bg-transparent backdrop-blur-[2px]">
          <div className="flex-1">
            {children}
          </div>
          {/* Footer inside main to respect sidebar layout */}
          <div className="w-full mt-[20px]">
            <DashboardFooter />
          </div>

        </main>
      </div>
    </div>
  );
}
