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
        ? "bg-primary/10 text-primary border border-primary/20"
        : "text-muted-foreground hover:text-primary hover:bg-muted"
      }`;
  };

  const getIndicator = (href: string) => {
    if (pathname !== href) return null;
    return (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-primary rounded-r-full shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-4 top-20 w-64 h-[calc(100vh-6rem)] 
        bg-card border border-border rounded-2xl z-40 overflow-hidden shadow-lg">

        <div className="flex flex-col h-full py-6 px-4">
          {/* Top Label */}
          <div className="px-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary/60">Main Menu</span>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={getLinkClass(item.href)}>
                  {getIndicator(item.href)}
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                    <Icon
                      size={18}
                      className={`transition-all duration-300 ${isActive ? `text-primary scale-110 drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]` : "group-hover:scale-110 group-hover:text-primary"
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
            <div className="p-5 rounded-2xl bg-card border border-border relative overflow-hidden group/card shadow-md">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  <span className="text-xs font-black text-foreground uppercase tracking-wider">Pro Access</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed font-medium">
                  Unlock unlimited generations and premium AI models.
                </p>
                <button className="w-full py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-black rounded-xl transition-all duration-300 shadow-sm active:scale-95 uppercase tracking-widest">
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
        <div className="absolute inset-0 bg-card border-r border-border" />

        <div className="relative h-full flex flex-col p-6 pt-24">
          {/* Logo in Sidebar */}
          <div className="mb-10 px-4">
            <h2 className="instagenie-logo text-4xl text-primary">InstaGenie</h2>
            <p className="text-muted-foreground text-[10px] mt-2 uppercase tracking-[4px] font-bold">Navigation</p>
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
                    className={isActive ? "text-primary" : "text-muted-foreground"}
                  />
                  <span className="text-base font-bold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button className="flex items-center gap-3 px-6 py-6 text-muted-foreground hover:text-destructive transition-all duration-300 mt-auto border-t border-border mx-[-1.5rem] font-bold">
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

