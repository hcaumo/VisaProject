"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TitleBar } from "@/features/dashboard/TitleBar";
import { VisaApplicationService } from "@/features/visa/VisaApplicationService";

export default function PaymentSuccessPage() {
  const t = useTranslations("Payment");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const applicationId = searchParams.get("applicationId");
  const [countdown, setCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(true);

  // Process payment result
  useEffect(() => {
    const processPayment = async () => {
      if (status === "success" && applicationId) {
        try {
          // Update application status to PENDING
          await VisaApplicationService.completePayment(applicationId);
        } catch (error) {
          console.error("Error completing payment:", error);
        }
      }
      setIsProcessing(false);
    };

    processPayment();
  }, [status, applicationId]);

  // Auto-redirect after 5 seconds
  useEffect(() => {
    if (isProcessing) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/dashboard";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isProcessing]);

  const isSuccess = status === "success";

  return (
    <>
      <TitleBar
        title={isSuccess ? t("payment_successful") : t("payment_cancelled")}
        description={isSuccess ? t("payment_successful_description") : t("payment_cancelled_description")}
      />

      <div className="mt-6 bg-white rounded-lg shadow-md p-8 border">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {isSuccess ? (
            <CheckCircle className="w-20 h-20 text-green-500" />
          ) : (
            <XCircle className="w-20 h-20 text-red-500" />
          )}

          <h1 className="text-3xl font-bold">
            {isSuccess ? t("payment_successful") : t("payment_cancelled")}
          </h1>

          <p className="text-lg text-muted-foreground">
            {isSuccess
              ? t("payment_successful_description")
              : t("payment_cancelled_description")}
          </p>

          <div className="text-sm text-muted-foreground">
            {t("redirecting_in")} {countdown} {t("seconds")}...
          </div>

          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/dashboard">{t("go_to_dashboard")}</Link>
            </Button>
            
            {!isSuccess && (
              <Button asChild variant="outline">
                <Link href="/dashboard/visa-application/new">
                  {t("try_again")}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}