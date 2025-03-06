"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { 
  Clock, 
  CreditCard, 
  Edit, 
  Eye, 
  FileText, 
  PlusCircle, 
  RefreshCw, 
  XCircle 
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ApplicationStatus, VisaApplication } from "@/models/VisaApplication";
import { VisaApplicationService } from "@/features/visa/VisaApplicationService";
import { WaitingPaymentCard } from "@/features/visa/WaitingPaymentCard";

export const ApplicationList = () => {
  const t = useTranslations("VisaApplication");
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const apps = await VisaApplicationService.getApplications();
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Group applications by status
  const draftApplications = applications.filter(
    app => app.status === ApplicationStatus.DRAFT
  );
  
  const waitingPaymentApplications = applications.filter(
    app => app.status === ApplicationStatus.WAITING_PAYMENT
  );
  
  const pendingApplications = applications.filter(
    app => [ApplicationStatus.PENDING, ApplicationStatus.STARTED].includes(app.status)
  );
  
  const completedApplications = applications.filter(
    app => [ApplicationStatus.COMPLETED, ApplicationStatus.APPROVED, ApplicationStatus.DENIED].includes(app.status)
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
    let bgColor = "bg-gray-100 text-gray-800";
    let icon = <Clock className="w-4 h-4 mr-1" />;

    switch (status) {
      case ApplicationStatus.DRAFT:
        bgColor = "bg-gray-100 text-gray-800";
        icon = <Edit className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.STARTED:
        bgColor = "bg-blue-100 text-blue-800";
        icon = <RefreshCw className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.WAITING_PAYMENT:
        bgColor = "bg-yellow-100 text-yellow-800";
        icon = <CreditCard className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.PENDING:
        bgColor = "bg-orange-100 text-orange-800";
        icon = <Clock className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.COMPLETED:
        bgColor = "bg-green-100 text-green-800";
        icon = <FileText className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.APPROVED:
        bgColor = "bg-green-100 text-green-800";
        icon = <FileText className="w-4 h-4 mr-1" />;
        break;
      case ApplicationStatus.DENIED:
        bgColor = "bg-red-100 text-red-800";
        icon = <XCircle className="w-4 h-4 mr-1" />;
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {icon}
        {t(`status_${status}`)}
      </span>
    );
  };

  // Application card component
  const ApplicationCard = ({ application }: { application: VisaApplication }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium mr-3">
                {t(`visa_type_${application.visaType}`)}
              </h3>
              <StatusBadge status={application.status} />
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {t("created_at")}: {application.createdAt.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              {t("applicants")}: {application.applicantCount}
            </p>
            {application.plannedArrivalDate && application.plannedDepartureDate && (
              <p className="text-sm text-gray-500">
                {t("travel_dates")}: {application.plannedArrivalDate} - {application.plannedDepartureDate}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            {application.status === ApplicationStatus.DRAFT && (
              <Button asChild size="sm">
                <Link href={`/dashboard/visa-application/edit/${application.id}`}>
                  <Edit className="w-4 h-4 mr-1" />
                  {t("continue_application")}
                </Link>
              </Button>
            )}
            {application.status !== ApplicationStatus.DRAFT && (
              <Button asChild size="sm" variant="outline">
                <Link href={`/dashboard/visa-application/view/${application.id}`}>
                  <Eye className="w-4 h-4 mr-1" />
                  {t("view_details")}
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Show payment card for applications waiting for payment */}
        {application.status === ApplicationStatus.WAITING_PAYMENT && (
          <div className="mt-4">
            <WaitingPaymentCard application={application} />
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="py-8 text-center">Loading applications...</div>;
  }

  if (applications.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4">
          <FileText className="w-12 h-12 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">{t("no_applications")}</h3>
        <p className="text-gray-500 mb-4">{t("no_applications_description")}</p>
        <Button asChild>
          <Link href="/dashboard/visa-application/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("start_first_application")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("my_applications")}</h2>
        <Button asChild>
          <Link href="/dashboard/visa-application/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("new_application")}
          </Link>
        </Button>
      </div>

      {/* Applications waiting for payment */}
      {waitingPaymentApplications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-yellow-800">
            {t("status_waiting_payment")}
          </h3>
          {waitingPaymentApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}

      {/* Pending applications */}
      {pendingApplications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t("pending_applications")}</h3>
          {pendingApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}

      {/* Draft applications */}
      {draftApplications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t("draft_applications")}</h3>
          {draftApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}

      {/* Completed applications */}
      {completedApplications.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("completed_applications")}</h3>
          {completedApplications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};