"use client";

import { LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserActions() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (_error) {
      alert("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  }

  async function handleDeleteAccount() {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
      )
    )
      return;

    setIsDeletingAccount(true);
    try {
      const response = await fetch("/api/auth/delete", { method: "DELETE" });
      
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      router.push("/");
    } catch (_error) {
      alert("Failed to delete account. Please try again.");
      setIsDeletingAccount(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-muted hover:bg-muted/80 border border-border rounded-2xl text-foreground font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="w-4 h-4" />
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>

      <button
        onClick={handleDeleteAccount}
        disabled={isDeletingAccount}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-2xl text-red-600 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-4 h-4" />
        {isDeletingAccount ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
}
