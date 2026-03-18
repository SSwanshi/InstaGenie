"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [particleStates, setParticleStates] = useState<Array<{
    left: number;
    top: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    const particles = Array.from({ length: 10 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2
    }));
    setParticleStates(particles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      console.log("Registered:", data);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error occurred");
    }

  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background transition-colors duration-300 flex items-center justify-center p-4">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,var(--border)_25px,var(--border)_26px,transparent_27px,transparent_74px,var(--border)_75px,var(--border)_76px,transparent_77px),linear-gradient(var(--border)_1px,transparent_1px)] bg-[length:100px_100px]"></div>
      </div>

      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.03)_25px,rgba(255,255,255,0.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.03)_75px,rgba(255,255,255,0.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100px_100px]"></div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {particleStates.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-card rounded-3xl border border-border shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join InstaGenie and boost your aesthetics</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all duration-300 placeholder:text-muted-foreground/50"
                placeholder="Instagram User"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all duration-300 placeholder:text-muted-foreground/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all duration-300 placeholder:text-muted-foreground/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full group relative px-8 py-4 mt-2 bg-primary text-primary-foreground font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] transform flex items-center justify-center gap-2"
          >
            Create Account
            <UserPlus className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline transition-all">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}