"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApplicationStatus as Status, VisaApplication } from "@/models/VisaApplication";
import { VisaApplicationService } from "./VisaApplicationService";
import { StripeService } from "@/features/payment/StripeService";

// Status badge component
const StatusBadge = ({ status }: { status: Status }) => {
  let bgColor = "";
  let textColor = "";

  switch (status) {
    case Status.DRAFT:
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
      break;
    case Status.STARTED:
      bgColor = "bg-blue-200";
      textColor = "text-blue-800";
      break;
    case Status.WAITING_PAYMENT:
      bgColor = "bg-amber-200";
      textColor = "text-amber-800";
      break;
    case Status.PENDING:
      bgColor = "bg-yellow-200";
      textColor = "text-yellow-800";
      break;
    case Status.WAITING_SIGNATURES:
      bgColor = "bg-purple-200";
      textColor = "text-purple-800";
      break;
    case Status.COMPLETED:
      bgColor = "bg-green-200";
      textColor = "text-green-800";
      break;
    case Status.APPROVED:
      bgColor = "bg-green-200";
      textColor = "text-green-800";
      break;
    case Status.DENIED:
      bgColor = "bg-red-200";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-gray-200";
      textColor = "text-gray-800";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

// Application card component with optional actions for different application statuses
const ApplicationCard = ({
  application,
  onSelect,
  onSubmitApplication,
  onViewLegalAgreement,
}: {
  application: VisaApplication;
  onSelect: (id: string) => void;
  onSubmitApplication?: (application: VisaApplication) => void;
  onViewLegalAgreement?: (application: VisaApplication) => void;
}) => {
  const t = useTranslations("VisaApplication");

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">
          {t(`visa_type_${application.visaType}`)}
        </h3>
        <StatusBadge status={application.status} />
      </div>

      <div className="text-sm text-gray-500 mb-4">
        <p>
          {t("applicant_count")}: {application.applicantCount}
        </p>
        <p>
          {t("travel_dates")}: {application.plannedArrivalDate} - {application.plannedDepartureDate}
        </p>
        <p>
          {t("created_at")}: {application.createdAt.toLocaleDateString()}
        </p>
      </div>

      {application.status === Status.DRAFT ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onSelect(application.id || "")}
          >
            {t("continue_application")}
          </Button>
          {onSubmitApplication && (
            <Button
              variant="default"
              className="flex-1"
              onClick={() => onSubmitApplication(application)}
            >
              {t("submit_application")}
            </Button>
          )}
        </div>
      ) : application.status === Status.PENDING ? (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onSelect(application.id || "")}
        >
          {t("view_details")}
        </Button>
      ) : application.status === Status.WAITING_SIGNATURES && onViewLegalAgreement ? (
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onSelect(application.id || "")}
          >
            {t("view_details")}
          </Button>
          <Button
            variant="default"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => onViewLegalAgreement(application)}
          >
            {t("view_sign_agreement")}
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onSelect(application.id || "")}
        >
          {t("view_details")}
        </Button>
      )}
    </div>
  );
};
// Main application status component
export const ApplicationStatus = () => {
  const t = useTranslations("VisaApplication");
  const router = useRouter();
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Load applications on component mount
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const apps = await VisaApplicationService.getApplications();
        setApplications(apps);
      } catch (error) {
        console.error("Failed to load applications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Handle application selection
  const handleSelectApplication = (id: string) => {
    router.push(`/dashboard/visa-application/${id}`);
  };

  // Handle submitting a draft application and redirecting to Stripe checkout
  const handleSubmitApplication = async (application: VisaApplication) => {
    try {
      // Submit the application (assumes submitApplication updates the application status)
      await VisaApplicationService.submitApplication(application.id || "");
      const fee = StripeService.getApplicationFee(application.visaType);
      await StripeService.redirectToCheckout({
        amount: fee * 100, // Stripe expects amount in cents
        currency: "usd",
        description: `Visa Application - ${t(`visa_type_${application.visaType}`)}`,
        applicationId: application.id,
        successUrl: window.location.origin + `/dashboard/payment-success?status=success&applicationId=${application.id}`,
        cancelUrl: window.location.origin + `/dashboard/payment-success?status=cancelled&applicationId=${application.id}`,
      });
    } catch (error) {
      console.error("Error submitting application and redirecting to Stripe", error);
      // Optionally display an error message to the user
    }
  };


  // Handle viewing/signing a legal agreement
  const handleViewLegalAgreement = (application: VisaApplication) => {
    // Open the legal agreement in a new tab if URL is available
    if (application.legalAgreementSignedUrl) {
      window.open(application.legalAgreementSignedUrl, '_blank');
    } else {
      console.error("No legal agreement URL available");
      // Optionally display an error message to the user
    }
  };

  // Filter applications by status
  const waitingPaymentApplications = applications.filter(app => app.status === Status.WAITING_PAYMENT);
  const pendingApplications = applications.filter(app => app.status === Status.PENDING);
  const waitingSignaturesApplications = applications.filter(app => app.status === Status.WAITING_SIGNATURES);
  const draftApplications = applications.filter(app => app.status === Status.DRAFT || app.status === Status.STARTED);
  const completedApplications = applications.filter(app =>
    app.status === Status.COMPLETED || app.status === Status.APPROVED || app.status === Status.DENIED
  );

  if (loading) {
    return <div className="flex justify-center p-8">Loading applications...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t("my_applications")}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              data-cal-link="glima-drexfy/certificate"
              data-cal-namespace="certificate"
              data-cal-config='{"layout":"month_view"}'
            >
              {t("schedule_call")}
            </Button>
            <Button onClick={() => router.push("/dashboard/visa-application/new")}>
              {t("new_application")}
            </Button>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2">{t("no_applications")}</h3>
            <p className="text-gray-500 mb-4">{t("no_applications_description")}</p>
            <Button onClick={() => router.push("/dashboard/visa-application/new")}>
              {t("start_first_application")}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {waitingPaymentApplications.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-amber-200">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">{t("status_waiting_payment")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {waitingPaymentApplications.map(app => (
                    <div key={app.id} className="relative">
                      <ApplicationCard
                        application={app}
                        onSelect={handleSelectApplication}
                      />
                      <div className="mt-2">
                        <Button
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                          onClick={() => router.push(`/dashboard/payment-success?status=pending&applicationId=${app.id}`)}
                        >
                          {t("complete_payment")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingApplications.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">{t("pending_applications")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingApplications.map(app => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onSelect={handleSelectApplication}
                    />
                  ))}
                </div>
              </div>
            )}

            {waitingSignaturesApplications.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">{t("waiting_signatures")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {waitingSignaturesApplications.map(app => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onSelect={handleSelectApplication}
                      onViewLegalAgreement={handleViewLegalAgreement}
                    />
                  ))}
                </div>
              </div>
            )}

            {draftApplications.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">{t("draft_applications")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {draftApplications.map(app => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onSelect={handleSelectApplication}
                      onSubmitApplication={handleSubmitApplication}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedApplications.length > 0 && (
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">{t("completed_applications")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedApplications.map(app => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onSelect={handleSelectApplication}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};