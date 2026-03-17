"use client";

import { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardNavbar from "./_components/Dashboard_navbar";
import DashboardFooter from "./_components/Dashboard_footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* -------------------- Loading State -------------------- */
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-border" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  /* -------------------- Layout -------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden">

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
        <main className="flex-1 min-h-[calc(100vh-4rem)] flex flex-col">
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
