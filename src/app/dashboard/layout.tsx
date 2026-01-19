"use client";
import Sidebar from "./_components/Sidebar";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardNavbar from "./_components/Dashboard_navbar";
import DashboardFooter from "./_components/Dashboard_footer";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !userId) {
      redirect("/login");
    }
  }, [isLoaded, userId]);

  // Show loading state while auth is being checked
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Dashboard Navbar */}
      <DashboardNavbar 
        isMobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16"> {/* pt-16 accounts for fixed navbar */}
        <Sidebar 
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
        />
        
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Dashboard Footer */}
      <DashboardFooter />
    </div>
  );
}