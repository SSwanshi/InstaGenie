"use client";

import Link from "next/link";
import { Github, Globe, Linkedin, Instagram } from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto px-6 pb-8">
      <div className="relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/20">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright & Brand */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <div className="flex items-center gap-2">
              <span className="instagenie-logo text-xl text-sky-400">InstaGenie</span>
              <span className="text-gray-600 text-xs font-mono">v1.2</span>
            </div>
            <p className="text-gray-500 text-xs font-medium">
              © {currentYear} Created by <span className="text-gray-300 hover:text-sky-400 transition-colors cursor-pointer">Sarvjeet Swanshi</span>
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
      className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/5 transition-all duration-300 hover:-translate-y-1 shadow-sm"
    >
      <Icon size={16} />
    </a>
  );
}