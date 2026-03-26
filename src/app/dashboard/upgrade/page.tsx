"use client";

import { useRouter } from "next/navigation";
import { Sparkles, Check, Zap, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type PlanType = "free" | "genie" | "geniepro";

interface PlanDetails {
  name: string;
  credits: number;
  duration: string;
  price: number | null;
  description: string;
  features: { name: string; included: boolean }[];
  color: string;
  icon: React.ReactNode;
}

export default function UpgradePage() {
  const router = useRouter();
  const { user } = useAuth();

  const currentPlan: PlanType =
    user?.plan === "genie" || user?.plan === "geniepro" || user?.plan === "free"
      ? user.plan
      : "free";

  const plans: Record<PlanType, PlanDetails> = {
    free: {
      name: "Free",
      credits: 100,
      duration: "2 months",
      price: null,
      description: "Perfect for getting started",
      features: [
        { name: "100 Credits", included: true },
        { name: "2 Month Validity", included: true },
        { name: "Caption Generation", included: true },
        { name: "Music Suggestions", included: true },
        { name: "Hashtag Generation", included: true },
        { name: "Emoji Suggestions", included: true },
        { name: "Trendy Topics Suggestion", included: false },
      ],
      color: "text-blue-400",
      icon: <Zap className="w-6 h-6" />,
    },
    genie: {
      name: "Genie",
      credits: 500,
      duration: "6 months",
      price: 199,
      description: "For content creators",
      features: [
        { name: "500 Credits", included: true },
        { name: "6 Month Validity", included: true },
        { name: "Caption Generation", included: true },
        { name: "Music Suggestions", included: true },
        { name: "Hashtag Generation", included: true },
        { name: "Emoji Suggestions", included: true },
        { name: "Trendy Topics Suggestion", included: true },
      ],
      color: "text-purple-400",
      icon: <Sparkles className="w-6 h-6" />,
    },
    geniepro: {
      name: "Genie Plus",
      credits: 2000,
      duration: "6 months",
      price: 499,
      description: "For professional creators",
      features: [
        { name: "2000 Credits", included: true },
        { name: "6 Month Validity", included: true },
        { name: "Caption Generation", included: true },
        { name: "Music Suggestions", included: true },
        { name: "Hashtag Generation", included: true },
        { name: "Emoji Suggestions", included: true },
        { name: "Trendy Topics Suggestion", included: true },
      ],
      color: "text-pink-400",
      icon: <Sparkles className="w-6 h-6" />,
    },
  };

  const handleSelectPlan = (planKey: PlanType) => {
    if (plans[planKey].price !== null) {
      router.push(`/dashboard/payment?plan=${planKey}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited AI generation and premium features to boost your content creation
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {Object.entries(plans).map(([key, plan]) => {
            const planKey = key as PlanType;
            const isCurrentPlan = currentPlan === planKey;

            return (
              <div
                key={planKey}
                className={`relative rounded-3xl border transition-all duration-300 overflow-hidden group ${
                  isCurrentPlan
                    ? "border-primary/50 bg-primary/5 shadow-xl shadow-primary/30"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {/* Badge for current plan */}
                {isCurrentPlan && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-2xl text-xs font-bold uppercase tracking-widest">
                    Current
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-xl bg-primary/10`}>
                        <div className={plan.color}>{plan.icon}</div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{plan.name}</h2>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Credits and Price */}
                  <div className="mb-8 p-5 bg-muted/40 rounded-2xl border border-border">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-foreground">{plan.credits}</span>
                      <span className="text-muted-foreground font-medium">Credits</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{plan.duration}</p>
                    {plan.price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary">₹{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/6 months</span>
                      </div>
                    ) : (
                      <span className="text-lg font-semibold text-foreground">Free to Start</span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(planKey)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 rounded-2xl font-bold uppercase tracking-wider text-sm transition-all duration-300 mb-8 ${
                      isCurrentPlan
                        ? "bg-primary/20 text-primary border border-primary/30 cursor-default"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl active:scale-95"
                    }`}
                  >
                    {isCurrentPlan ? "Current Plan" : plan.price ? "Upgrade Now" : "Start Free"}
                  </button>

                  {/* Features List */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      What&apos;s Included
                    </p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className="flex-shrink-0">
                            <Check className="w-5 h-5 text-primary" />
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <Lock className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                        )}
                        <span
                          className={`text-sm font-medium ${
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground/60 line-through"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-8 bg-card border border-border rounded-3xl">
          <h3 className="text-xl font-bold text-foreground mb-6">Which Plan is Right for You?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Genie</span> is your perfect companion if you&apos;re occasionally crafting posts and stories. Struggle less with captions and music selection and let AI handle your creative blocks while you focus on your content vision. Perfect for personal use without the creative overwhelm.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Genie Plus</span> is built for professional content creators who live and breathe reels. Get AI-powered descriptions, caption ideas, smart hashtags, and trendy topic suggestions to stay viral and engaged with your growing audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
