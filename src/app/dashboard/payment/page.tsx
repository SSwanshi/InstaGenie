"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, CreditCard, Landmark, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { PAID_PLAN_CONFIG, resolvePaidPlan } from "@/lib/plan-config";

export default function PaymentPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentMessage, setPaymentMessage] = useState<string | null>(null);

	const selectedPlan = useMemo(() => {
		return resolvePaidPlan(searchParams.get("plan")) ?? PAID_PLAN_CONFIG.genie;
	}, [searchParams]);

	const handleDemoPayment = async () => {
		setIsProcessing(true);
		setPaymentMessage(null);

		try {
			const res = await fetch("/api/payment", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ plan: selectedPlan.dbPlan }),
			});

			const data = await res.json().catch(() => ({}));
			if (!res.ok) {
				setPaymentMessage(data?.error || "Payment failed. Please try again.");
				return;
			}

			setPaymentMessage("Payment successful. Your plan and credits are updated.");
		} catch {
			setPaymentMessage("Network error. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="max-w-6xl mx-auto">
				<button
					onClick={() => router.push("/dashboard/upgrade")}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Upgrade Plans
				</button>

				<div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
					<section className="lg:col-span-3 bg-card border border-border rounded-3xl p-6 md:p-8">
						<div className="flex items-center justify-between mb-8">
							<div>
								<h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
									Complete Your Upgrade
								</h1>
								<p className="text-muted-foreground mt-2">
									Demo checkout flow for your selected plan.
								</p>
							</div>
							<div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
								<ShieldCheck className="w-4 h-4" />
								<span className="text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
							</div>
						</div>

						<div>
							<p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
								Payment Method
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<button
									onClick={() => setMethod("upi")}
									className={`rounded-2xl border px-4 py-4 text-left transition-all ${
										method === "upi"
											? "border-primary/40 bg-primary/10"
											: "border-border bg-background hover:border-primary/20"
									}`}
								>
									<Wallet className="w-5 h-5 text-primary mb-2" />
									<p className="font-bold text-foreground">UPI</p>
									<p className="text-xs text-muted-foreground">Google Pay, PhonePe, Paytm</p>
								</button>

								<button
									onClick={() => setMethod("card")}
									className={`rounded-2xl border px-4 py-4 text-left transition-all ${
										method === "card"
											? "border-primary/40 bg-primary/10"
											: "border-border bg-background hover:border-primary/20"
									}`}
								>
									<CreditCard className="w-5 h-5 text-primary mb-2" />
									<p className="font-bold text-foreground">Card</p>
									<p className="text-xs text-muted-foreground">Credit & Debit Cards</p>
								</button>

								<button
									onClick={() => setMethod("netbanking")}
									className={`rounded-2xl border px-4 py-4 text-left transition-all ${
										method === "netbanking"
											? "border-primary/40 bg-primary/10"
											: "border-border bg-background hover:border-primary/20"
									}`}
								>
									<Landmark className="w-5 h-5 text-primary mb-2" />
									<p className="font-bold text-foreground">Net Banking</p>
									<p className="text-xs text-muted-foreground">All major banks</p>
								</button>
							</div>
						</div>

						<div className="mt-8 p-5 rounded-2xl border border-border bg-muted/30">
							<p className="text-sm text-muted-foreground mb-2">Selected Method</p>
							<p className="text-lg font-bold text-foreground uppercase tracking-wide">{method}</p>
						</div>

						<button
							type="button"
							onClick={handleDemoPayment}
							disabled={isProcessing}
							className="w-full mt-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold uppercase tracking-wider text-sm shadow-md hover:bg-primary/90 active:scale-[0.99] transition-all"
						>
							{isProcessing ? "Processing..." : `Pay ₹${selectedPlan.price} (Demo)`}
						</button>

						<p className="text-xs text-muted-foreground mt-3 text-center">
							This is a demo payment page UI only. No real transaction will be processed.
						</p>

						{paymentMessage && (
							<p className="text-sm mt-3 text-center text-foreground">{paymentMessage}</p>
						)}
					</section>

					<aside className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 md:p-8 h-fit">
						<div className="flex items-center gap-3 mb-5">
							<div className="p-2 rounded-xl bg-primary/10 text-primary">
								<Sparkles className="w-5 h-5" />
							</div>
							<div>
								<p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">Order Summary</p>
								<h2 className="text-2xl font-bold text-foreground">{selectedPlan.name}</h2>
							</div>
						</div>

						<div className="rounded-2xl border border-border bg-muted/40 p-5 mb-6">
							<p className="text-sm text-muted-foreground mb-1">{selectedPlan.description}</p>
							<div className="mt-3 flex items-end gap-2">
								<span className="text-4xl font-bold text-primary">₹{selectedPlan.price}</span>
								<span className="text-sm text-muted-foreground">/{selectedPlan.durationLabel}</span>
							</div>
							<p className="text-sm text-foreground mt-2 font-semibold">{selectedPlan.credits} Credits Included</p>
						</div>

						<div className="space-y-3">
							{selectedPlan.perks.map((perk) => (
								<div key={perk} className="flex items-start gap-3">
									<Check className="w-4 h-4 mt-0.5 text-primary" />
									<span className="text-sm text-foreground">{perk}</span>
								</div>
							))}
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
