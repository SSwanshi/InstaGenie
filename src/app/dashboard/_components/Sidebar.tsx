"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Film, Video, User, Sparkles, LogOut } from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, color: "text-blue-400" },
    { name: "Post Generator", href: "/dashboard/post", icon: FileText, color: "text-purple-400" },
    { name: "Story Generator", href: "/dashboard/story", icon: Film, color: "text-pink-400" },
    { name: "Reel Generator", href: "/dashboard/reel", icon: Video, color: "text-orange-400" },
    { name: "Profile", href: "/dashboard/user", icon: User, color: "text-emerald-400" },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
    ${isActive
        ? "bg-gradient-to-r from-purple-500/20 to-transparent text-white border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
        : "text-gray-400 hover:text-purple-300 hover:bg-purple-500/5"
      }`;
  };

  const getIndicator = (href: string) => {
    if (pathname !== href) return null;
    return (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-purple-500 rounded-r-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-4 top-20 w-64 h-[calc(100vh-6rem)] 
        bg-[#030014]/80 backdrop-blur-2xl border border-purple-500/20 rounded-2xl z-40 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">

        <div className="flex flex-col h-full py-6 px-4">
          {/* Top Label */}
          <div className="px-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-purple-500/60">Main Menu</span>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={getLinkClass(item.href)}>
                  {getIndicator(item.href)}
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-purple-500/10' : ''}`}>
                    <Icon
                      size={18}
                      className={`transition-all duration-300 ${isActive ? `text-purple-400 scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]` : "group-hover:scale-110 group-hover:text-purple-300"
                        }`}
                    />
                  </div>
                  <span className={`text-sm font-bold transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Upgrade Card */}
          <div className="mt-auto px-2">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600/20 via-[#130b24] to-transparent border border-purple-500/20 relative overflow-hidden group/card shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-purple-500/20 rounded-lg">
                    <Sparkles size={14} className="text-purple-400 animate-pulse" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-wider">Pro Access</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-4 leading-relaxed font-medium">
                  Unlock unlimited generations and premium AI models.
                </p>
                <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 active:scale-95 uppercase tracking-widest">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Spacer */}
      <div className="hidden lg:block w-72 flex-shrink-0" />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-[100] transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Mobile Background with Blur */}
        <div className="absolute inset-0 bg-[#030014]/95 backdrop-blur-2xl border-r border-purple-500/20" />

        <div className="relative h-full flex flex-col p-6 pt-24">
          {/* Logo in Sidebar */}
          <div className="mb-10 px-4">
            <h2 className="instagenie-logo text-4xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">InstaGenie</h2>
            <p className="text-purple-500/60 text-[10px] mt-2 uppercase tracking-[4px] font-bold">Navigation</p>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClass(item.href)}
                  onClick={() => setMobileOpen(false)}
                >
                  {getIndicator(item.href)}
                  <Icon
                    size={20}
                    className={isActive ? "text-purple-400" : "text-gray-500"}
                  />
                  <span className="text-base font-bold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button className="flex items-center gap-3 px-6 py-6 text-gray-500 hover:text-red-400 transition-all duration-300 mt-auto border-t border-purple-500/10 mx-[-1.5rem] font-bold">
            <LogOut size={20} />
            <span className="uppercase tracking-widest text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

