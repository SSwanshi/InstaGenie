"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Film, Video, User } from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Post Generator", href: "/dashboard/post", icon: FileText },
    { name: "Story Generator", href: "/dashboard/story", icon: Film },
    { name: "Reel Generator", href: "/dashboard/reel", icon: Video },
    { name: "Profile", href: "/user", icon: User },
  ];

  const linkClass = (href: string) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
      pathname === href
        ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 shadow-lg border border-indigo-500/30"
        : "hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-300 hover:text-white hover:shadow-md"
    }`;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-6 border-r border-gray-800/50 backdrop-blur-xl z-40 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Desktop Content Spacer */}
      <div className="hidden lg:block w-72 flex-shrink-0"></div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] z-[70] lg:hidden transform transition-transform duration-300 ease-in-out border-r border-gray-800/50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20"> 
          {/* Mobile Header */}
          <div className="mb-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                InstaGenie
              </h2>
              <p className="text-gray-400 text-sm mt-1">Choose a service</p>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href)}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}