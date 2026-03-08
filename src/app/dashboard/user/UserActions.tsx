"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserActions() {
  const { user } = useUser();
  const router = useRouter();

  async function handleDeleteAccount() {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
      )
    )
      return;

    try {
      await user?.delete();
      router.push("/");
    } catch {
      alert("Failed to delete account. Please try again.");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SignOutButton redirectUrl="/">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-muted hover:bg-muted/80 border border-border rounded-2xl text-foreground font-semibold transition-all duration-200 cursor-pointer">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </SignOutButton>

      <button
        onClick={handleDeleteAccount}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-red-600 font-semibold transition-all duration-200 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
        Delete Account
      </button>
    </div>
  );
}
