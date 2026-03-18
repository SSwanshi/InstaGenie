"use client";

import {
  Mail,
  Calendar,
  Sparkles,
  Camera,
  Video,
  FileText,
  Clock,
  Zap,
} from "lucide-react";
import UserActions from "./UserActions";
import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createAvatar } from '@dicebear/core';
import { 
  bottts, 
  avataaars, 
  croodles,
} from '@dicebear/collection';
import AvatarPicker from "@/components/AvatarPicker";

const stylesMap = {
  humans: avataaars,
  animals: croodles,
  robots: bottts,
} as const;

export default function UserPage() {

  const { user, isLoading} = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<{ style: string; seed: string } | null>(null);

  const parsedAvatar = useMemo(() => {
    if (localAvatar) return localAvatar;
    try {
      return user?.avatar ? JSON.parse(user.avatar) : { style: "humans", seed: user?.name || "User" };
    } catch {
      return { style: "humans", seed: user?.name || "User" };
    }
  }, [user, localAvatar]);

  const handleUpdateAvatar = async (avatarData: { style: string; seed: string }) => {
    setIsUpdating(true);
    setLocalAvatar(avatarData);
    try {
      const res = await fetch("/api/auth/update-avatar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: JSON.stringify(avatarData) }),
      });

      if (res.ok) {
        // Force refresh all components by reloading the page
        window.location.reload();
      } else {
        setLocalAvatar(null);
        alert("Failed to update avatar.");
      }
    } catch {
      setLocalAvatar(null);
      alert("Error updating avatar.");
    } finally {
      setIsUpdating(false);
    }
  };

  const currentAvatarSvg = useMemo(() => {
    const style = stylesMap[parsedAvatar.style as keyof typeof stylesMap] || avataaars;
    // @ts-expect-error - Mixed DiceBear collections have incompatible option types
    return createAvatar(style, {
      seed: parsedAvatar.seed,
      size: 128,
    }).toString();
  }, [parsedAvatar]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-border" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullName = user.name || "User";

  const stats = [
    { label: "Posts Generated", value: "—", icon: Camera, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Stories Created", value: "—", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Reels Made", value: "—", icon: Video, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "AI Credits", value: user.credits.toString(), icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="min-h-screen bg-transparent p-4 relative">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Profile Card */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-8">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(71,110,102,0.15),_transparent_60%)]" />
          </div>

          <div className="px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 mb-8 text-center md:text-left">
              <div className="relative group">
                <div 
                  className="w-32 h-32 rounded-[2rem] border-4 border-card shadow-2xl bg-muted flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  dangerouslySetInnerHTML={{ __html: currentAvatarSvg }}
                  onClick={() => setIsPickerOpen(true)}
                />
                {isUpdating && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-[2rem]">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  </div>
                )}
                <button 
                  onClick={() => setIsPickerOpen(true)}
                  className="absolute -bottom-1 -right-1 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="pb-2">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">{fullName}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mt-1 justify-center md:justify-start">
                  <span className="text-sm font-medium">@{fullName.toLowerCase().replace(/\s+/g, "")}</span>
                  <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  <span className="text-sm font-medium capitalize">{user.plan} user</span>
                </div>
              </div>
            </div>

            {/* Avatar Picker Component */}
            <AvatarPicker 
              open={isPickerOpen}
              onClose={() => setIsPickerOpen(false)}
              onSelect={handleUpdateAvatar}
            />

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                  <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Joined</p>
                  <p className="text-sm font-semibold text-foreground">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Account Status</p>
                  <p className="text-sm font-semibold text-foreground">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:border-primary/30 transition-all duration-300">
                <div className={`inline-flex p-2.5 ${stat.bg} rounded-xl mb-4`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Plan Details */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-6">
          <div className="p-8">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Plan & Billing
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-5 bg-muted/40 rounded-2xl border border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Current Plan</p>
                <p className="text-lg font-bold text-foreground capitalize">{user.plan}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                {user.plan === "free" ? "Free Plan" : user.plan === "genie" ? "Genie" : "Genie Pro"}
              </span>
            </div>

            {user.plan === "free" && (
              <>
                <p className="text-sm text-muted-foreground mb-5">
                  Upgrade to <span className="text-primary font-semibold">Pro</span> to unlock unlimited AI generations and get more credits every month.
                </p>

                <button className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-200 shadow-sm cursor-pointer">
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro
                </button>
              </>
            )}

            {user.plan !== "free" && (
               <p className="text-sm text-primary font-semibold">
                 You are currently on a premium plan. Enjoy your extra features!
               </p>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden">
          <div className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Account Actions</h3>
            <UserActions />
          </div>
        </div>

      </div>
    </div>
  );
}
