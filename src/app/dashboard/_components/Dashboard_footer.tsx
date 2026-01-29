"use client";

import Link from "next/link";
import { Github, Globe, Linkedin, Instagram } from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto px-6 pb-8">
      <div className="relative group overflow-hidden rounded-2xl bg-card border border-border backdrop-blur-xl transition-all duration-500 hover:border-border/80">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright & Brand */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <div className="flex items-center gap-2">
              <span className="instagenie-logo text-xl text-primary">InstaGenie</span>
              <span className="text-muted-foreground text-xs font-mono">v1.2</span>
            </div>
            <p className="text-muted-foreground text-xs font-medium">
              © {currentYear} Created by <span className="text-foreground hover:text-primary transition-colors cursor-pointer">Sarvjeet Swanshi</span>
            </p>
          </div>

          {/* Practical Links */}
          <div className="flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <SocialLink href="https://sarvjeet-swanshi.vercel.app/" icon={Globe} />
            <SocialLink href="https://github.com/SSwanshi" icon={Github} />
            <SocialLink href="https://www.linkedin.com/in/sarvjeet-swanshi-6b6b0b296" icon={Linkedin} />
            <SocialLink href="https://www.instagram.com/sarvjeet_swanshi" icon={Instagram} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1 shadow-sm"
    >
      <Icon size={16} />
    </a>
  );
}