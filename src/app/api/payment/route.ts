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

		const updatedUser = await User.findByIdAndUpdate(
			authUser.userId,
			{
				$set: {
					isPremium: true,
					plan: selectedPlan.dbPlan,
					planLastUpdatedAt: new Date(),
				},
				$inc: {
					planExpiryDays: selectedPlan.planDays,
					credits: selectedPlan.credits,
				},
			},
			{ new: true }
		).select("-password");

		if (!updatedUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json({
			message: "Payment processed successfully",
			user: updatedUser,
			appliedPlan: {
				plan: selectedPlan.uiPlan,
				creditsAdded: selectedPlan.credits,
				daysAdded: selectedPlan.planDays,
			},
		});
	} catch (error) {
		console.error("Payment route error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
