export type UiPaidPlanType = "genie" | "geniepro";
export type DbPaidPlanType = "genie" | "geniepro";

export interface PaidPlanConfig {
  uiPlan: UiPaidPlanType;
  dbPlan: DbPaidPlanType;
  name: string;
  credits: number;
  planDays: number;
  durationLabel: string;
  price: number;
  description: string;
  perks: string[];
}

export const PAID_PLAN_CONFIG: Record<UiPaidPlanType, PaidPlanConfig> = {
  genie: {
    uiPlan: "genie",
    dbPlan: "genie",
    name: "Genie",
    credits: 500,
    planDays: 180,
    durationLabel: "6 months",
    price: 199,
    description: "Perfect for regular creators who need more volume.",
    perks: [
      "500 generation credits",
      "Priority caption responses",
      "Advanced hashtag suggestions",
    ],
  },
  geniepro: {
    uiPlan: "geniepro",
    dbPlan: "geniepro",
    name: "Genie Plus",
    credits: 2000,
    planDays: 180,
    durationLabel: "6 months",
    price: 499,
    description: "Best for power creators and agencies.",
    perks: [
      "2000 generation credits",
      "Fastest generation queue",
      "Priority feature access",
    ],
  },
};

export function resolvePaidPlan(plan: string | null | undefined): PaidPlanConfig | null {
  if (plan === "genie" || plan === "geniepro") {
    return PAID_PLAN_CONFIG[plan];
  }

  // Backward compatibility for older URLs/body values.
  if (plan === "genie_plus") {
    return PAID_PLAN_CONFIG.geniepro;
  }

  return null;
}