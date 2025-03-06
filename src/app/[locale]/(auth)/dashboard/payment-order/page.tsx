"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { StripeService } from "@/features/payment/StripeService";

type LookupKey = "starter" | "premium";
const lookupDetails: Record<LookupKey, { amount: number; description: string }> = {
  starter: { amount: 1000, description: "Starter Package Payment" },
  premium: { amount: 2000, description: "Premium Package Payment" }
};

export default function PaymentOrderPage() {
  const searchParams = useSearchParams();
  const rawKey = searchParams.get("lookup_key");
  const key: LookupKey = rawKey === "premium" ? "premium" : "starter";
  const order = lookupDetails[key];

  useEffect(() => {
    void StripeService.redirectToCheckout({
      amount: order.amount,
      currency: "usd",
      description: order.description,
      applicationId: "",
      successUrl: window.location.origin + "/dashboard/payment-success?status=success",
      cancelUrl: window.location.origin + "/dashboard/payment-success?status=cancelled"
    });
  }, [order]);

  return (
    <div className="p-8">
      <p className="text-center">Redirecting to payment. Please wait...</p>
    </div>
  );
}