import { currentUser } from "@clerk/nextjs/server";
import {
  User,
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

export default async function UserPage() {
  const user = await currentUser();

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const lastSignIn = user?.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "User";

  const primaryEmail = user?.emailAddresses?.[0]?.emailAddress ?? "No email";

  const stats = [
    { label: "Posts Generated", value: "—", icon: Camera, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Stories Created", value: "—", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Reels Made", value: "—", icon: Video, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "AI Credits Used", value: "—", icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
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
            {/* Avatar */}
            <div className="flex items-end gap-5 -mt-12 mb-6">
              <div className="relative">
                {user?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt={fullName}
                    className="w-24 h-24 rounded-2xl border-4 border-card shadow-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-4 border-card shadow-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                )}
                
              </div>
              <div className="pb-1">
                <h2 className="text-2xl font-bold text-foreground">{fullName}</h2>
                <p className="text-muted-foreground text-sm">@{user?.username ?? "user"}</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/40 rounded-2xl border border-border">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</p>
                  <p className="text-sm font-semibold text-foreground truncate">{primaryEmail}</p>
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
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Last Active</p>
                  <p className="text-sm font-semibold text-foreground">{lastSignIn}</p>
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
                <p className="text-lg font-bold text-foreground">Free</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Free Plan
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-5">
              Upgrade to <span className="text-primary font-semibold">Pro</span> to unlock unlimited AI generations and get more credits every month.
            </p>

            <button className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-200 shadow-sm cursor-pointer">
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </button>
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
