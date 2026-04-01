"use client";

import Link from "next/link";
import {
  Mail,
  Calendar,
  Sparkles,
  Camera,
  Video,
  FileText,
  Zap,
  X,
  Hash,
  Music,
  MessageSquare,
  Lightbulb,
  AlignLeft,
  LucideIcon,
} from "lucide-react";
import UserActions from "./UserActions";
import { useState, useMemo, useEffect } from "react";
import { useAuth, type User } from "@/hooks/useAuth";
import { createAvatar } from "@dicebear/core";
import { bottts, avataaars, croodles } from "@dicebear/collection";
import AvatarPicker from "@/components/AvatarPicker";

const stylesMap = {
  humans: avataaars,
  animals: croodles,
  robots: bottts,
} as const;

type ServiceKey = "post" | "story" | "reel" | "comments" | "photoPicker";

interface ServiceDialogProps {
  service: ServiceKey;
  user: User;
  onClose: () => void;
}

const serviceConfig = {
  post: {
    title: "Post Service",
    icon: Camera,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    accent: "bg-purple-500",
    fields: [
      { key: "captionGenerated", label: "Captions Generated", icon: MessageSquare },
      { key: "musicSuggested", label: "Music Suggested", icon: Music },
      { key: "hashtagGenerated", label: "Hashtags Generated", icon: Hash },
    ],
  },
  story: {
    title: "Story Service",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    accent: "bg-blue-500",
    fields: [
      { key: "captionGenerated", label: "Captions Generated", icon: MessageSquare },
      { key: "musicSuggested", label: "Music Suggested", icon: Music },
      { key: "emojiSuggested", label: "Emojis Suggested", icon: Sparkles },
    ],
  },
  reel: {
    title: "Reel Service",
    icon: Video,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    accent: "bg-orange-500",
    fields: [
      { key: "captionGenerated", label: "Captions Generated", icon: MessageSquare },
      { key: "musicSuggested", label: "Music Suggested", icon: Music },
      { key: "hashtagGenerated", label: "Hashtags Generated", icon: Hash },
      { key: "descriptionGenerated", label: "Descriptions Generated", icon: AlignLeft },
      { key: "topicSuggested", label: "Topics Suggested", icon: Lightbulb },
    ],
  },
  comments: {
    title: "Comments Service",
    icon: MessageSquare,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    accent: "bg-pink-500",
    fields: [
      { key: "commentGenerated", label: "Comments Generated", icon: MessageSquare },
    ],
  },
  photoPicker: {
    title: "Photo Picker",
    icon: Camera,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    accent: "bg-indigo-500",
    fields: [
      { key: "photoPicked", label: "Photos Picked", icon: Sparkles },
    ],
  },
};

function ServiceDialog({ service, user, onClose }: ServiceDialogProps) {
  const config = serviceConfig[service];
  const serviceDataKey = `${service}Service` as keyof typeof user;
  const serviceData = (user[serviceDataKey] as unknown as Record<string, number>) || {};
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className={`relative bg-card rounded-[2rem] border border-border shadow-2xl w-full max-w-md overflow-hidden ${
          service === "reel" ? "mt-20" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 ${config.bg} rounded-xl border ${config.border}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{config.title}</h3>
                <p className="text-xs text-muted-foreground">Usage breakdown</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            {config.fields.map((field) => {
              const FieldIcon = field.icon;
              const value = serviceData[field.key] ?? 0;
              return (
                <div
                  key={field.key}
                  className="flex items-center justify-between p-4 bg-muted/40 rounded-2xl border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${config.bg} rounded-lg`}>
                      <FieldIcon className={`w-4 h-4 ${config.color}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{field.label}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground tabular-nums">{value}</span>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className={`mt-4 p-4 ${config.bg} rounded-2xl border ${config.border}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${config.color}`}>Total Actions</span>
              <span className={`text-xl font-bold ${config.color} tabular-nums`}>
                {config.fields.reduce((sum, f) => sum + (serviceData[f.key] ?? 0), 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserPage() {
  const { user, isLoading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [localAvatar, setLocalAvatar] = useState<{ style: string; seed: string } | null>(null);
  const [openService, setOpenService] = useState<ServiceKey | null>(null);
  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);

  

  // Handle dialog open/close to disable scroll and interaction
  useEffect(() => {
    if (openService) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.classList.add("dialog-open");
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("dialog-open");
    }
    handleCreditsLeft();
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("dialog-open");
    };
  }, [openService]);

  const parsedAvatar = useMemo(() => {
    if (localAvatar) return localAvatar;
    try {
      return user?.avatar
        ? JSON.parse(user.avatar)
        : { style: "humans", seed: user?.name || "User" };
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

  const handleCreditsLeft = async () => {
  try {
    const res = await fetch("/api/credits-left", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    if (!text) throw new Error("Empty response");
    const data = JSON.parse(text);

    if (res.ok) {
      setCreditsLeft(data.creditsLeft);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

  const currentAvatarSvg = useMemo(() => {
    const style =
      stylesMap[parsedAvatar.style as keyof typeof stylesMap] || avataaars;
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

  const safePlanExpiryDays = Math.max(0, user.planExpiryDays ?? 0);
  const planExpiryDateLabel = (() => {
    const date = user.planExpiryDate ? new Date(user.planExpiryDate) : null;

    if (!date || Number.isNaN(date.getTime())) {
      return "Not Available";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  const fullName = user.name || "User";

  const serviceCards: { key: ServiceKey; label: string; icon: LucideIcon; color: string; bg: string; border: string }[] = [
    {
      key: "post",
      label: "Post Service",
      icon: Camera,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      key: "story",
      label: "Story Service",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      key: "reel",
      label: "Reel Service",
      icon: Video,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      key: "comments",
      label: "Comments Service",
      icon: MessageSquare,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
    {
      key: "photoPicker",
      label: "Photo Picker",
      icon: Camera,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
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

          <div className="px-8 pb-8 ">
            {/* Avatar + Name + AI Credits row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 -mt-12 mb-8">
              {/* Left: Avatar + Name */}
              <div className="flex flex-col md:flex-row items-center md:items-center gap-6 text-center md:text-left">
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
                <div>
                  <h2 className="text-3xl font-bold text-foreground tracking-tight">{fullName}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1 justify-center md:justify-start">
                    <span className="text-sm font-medium">
                      @{fullName.toLowerCase().replace(/\s+/g, "")}
                    </span>
                    <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                    <span className="text-sm font-medium capitalize">{user.plan} user</span>
                  </div>
                </div>
              </div>

              {/* Right: AI Credits */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Animated outer circle */}
                  <svg className="absolute inset-0 w-full h-full animate-spin" style={{animationDuration: '4s'}} viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" className="text-primary" />
                        <stop offset="100%" stopColor="currentColor" className="text-primary opacity-20" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="70 200" strokeLinecap="round" />
                  </svg>

                  {/* Static background circle */}
                  <div className="absolute inset-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full border border-primary/20" />

                  {/* Content circle */}
                  <div className="relative w-32 h-32 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/5 to-transparent rounded-full border-2 border-primary/30 shadow-lg">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground font-bold tracking-wide">Genie Credits Left</p>
                      <p className="text-3xl font-bold text-primary tabular-nums leading-tight">
      {creditsLeft !== null ? creditsLeft : "--"}
    </p>
                    </div>
                  </div>
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

              <div className="relative flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border overflow-hidden">
                {safePlanExpiryDays > 0 && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-bl-xl text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
                    {safePlanExpiryDays} Days Left
                  </div>
                )}
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Plan Expiry Date</p>
                  <p className="text-sm font-semibold text-foreground">{planExpiryDateLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Credits Used</p>
                  <p className="text-sm font-semibold text-foreground">{user.creditsUsed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Usage */}
        <div className="bg-card rounded-[2.5rem] border border-border shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              Service Usage
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {serviceCards.map(({ key, label, icon: Icon, color, bg, border }) => (
                <button
                  key={key}
                  onClick={() => setOpenService(key)}
                  className={`group flex flex-col items-center gap-4 p-6 ${bg} border ${border} rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-200 cursor-pointer text-center`}
                >
                  <div className={`p-3.5 bg-card rounded-2xl border ${border} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click for details</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
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
                  Upgrade to <span className="text-primary font-semibold">Pro</span> to unlock
                  unlimited AI generations and get more credits every month.
                </p>
                <Link href="/dashboard/upgrade" className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-200 shadow-sm cursor-pointer">
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro
                </Link>
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

      {/* Service Dialog */}
      {openService && (
        <ServiceDialog
          service={openService}
          user={user}
          onClose={() => setOpenService(null)}
        />
      )}
    </div>
  );
}