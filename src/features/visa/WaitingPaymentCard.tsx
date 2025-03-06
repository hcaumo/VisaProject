import { useTranslations } from "next-intl";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StripeService } from "@/features/payment/StripeService";
import { ApplicationStatus, VisaApplication } from "@/models/VisaApplication";

interface WaitingPaymentCardProps {
  application: VisaApplication;
}

export const WaitingPaymentCard = ({ application }: WaitingPaymentCardProps) => {
  const t = useTranslations("VisaApplication");

  // Only show for applications waiting for payment
  if (application.status !== ApplicationStatus.WAITING_PAYMENT) {
    return null;
  }

  const handlePayment = async () => {
    try {
      // Calculate the fee based on visa type
      const fee = StripeService.getApplicationFee(application.visaType);
      
      // Redirect to Stripe payment
      await StripeService.redirectToCheckout({
        amount: fee * 100, // Stripe expects amount in cents
        currency: 'usd',
        description: `Visa Application - ${t(`visa_type_${application.visaType}`)}`,
        applicationId: application.id,
        successUrl: window.location.origin + `/dashboard/payment-success?status=success&applicationId=${application.id}`,
        cancelUrl: window.location.origin + `/dashboard/payment-success?status=cancelled&applicationId=${application.id}`,
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      alert(t("payment_error"));
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-yellow-800">
            {t("payment_required")}
          </h3>
          <p className="text-yellow-700 mt-1">
            {t("complete_payment_to_submit")}
          </p>
          <div className="mt-2">
            <p className="text-sm text-yellow-600">
              <span className="font-medium">{t("visa_type")}:</span>{" "}
              {t(`visa_type_${application.visaType}`)}
            </p>
            <p className="text-sm text-yellow-600">
              <span className="font-medium">{t("applicants")}:</span>{" "}
              {application.applicantCount}
            </p>
            <p className="text-sm text-yellow-600">
              <span className="font-medium">{t("fee")}:</span> $
              {StripeService.getApplicationFee(application.visaType)}
            </p>
          </div>
        </div>
        <Button 
          onClick={handlePayment}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {t("complete_payment")}
        </Button>
      </div>
    </div>
  );
};