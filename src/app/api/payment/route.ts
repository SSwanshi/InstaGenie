import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserFromCookies } from "@/lib/auth";
import User from "@/models/user";
import { resolvePaidPlan } from "@/lib/plan-config";

export async function POST(req: NextRequest) {
	try {
		const authUser = await getUserFromCookies(req);
		if (!authUser?.userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json().catch(() => null);
		const selectedPlan = resolvePaidPlan(body?.plan);

		if (!selectedPlan) {
			return NextResponse.json({ error: "Invalid or missing plan" }, { status: 400 });
		}

		await connectDB();

		const user = await User.findById(authUser.userId);

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const now = new Date();
		const paidPlanDurationDays = 180;
		const previousPlanExpiryDays = Math.max(0, user.planExpiryDays ?? 0);
		const shouldOverwriteExpiry = user.plan === "free" || !user.isPremium;
		const nextPlanExpiryDays = shouldOverwriteExpiry
			? paidPlanDurationDays
			: previousPlanExpiryDays + selectedPlan.planDays;
		const nextPlanExpiryDate = new Date(now);
		nextPlanExpiryDate.setUTCDate(nextPlanExpiryDate.getUTCDate() + nextPlanExpiryDays);

		user.isPremium = true;
		user.plan = selectedPlan.dbPlan;
		user.planExpiryDays = nextPlanExpiryDays;
		user.planExpiryDate = nextPlanExpiryDate;
		user.planLastUpdatedAt = now;
		user.credits = (user.credits ?? 0) + selectedPlan.credits;

		const updatedUser = await user.save();

		return NextResponse.json({
			message: "Payment processed successfully",
			user: updatedUser,
			appliedPlan: {
				plan: selectedPlan.uiPlan,
				creditsAdded: selectedPlan.credits,
				daysAdded: shouldOverwriteExpiry ? paidPlanDurationDays : selectedPlan.planDays,
			},
		});
	} catch (error) {
		console.error("Payment route error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
