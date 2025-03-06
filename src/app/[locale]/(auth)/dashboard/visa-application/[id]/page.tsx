"use client";

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { TitleBar } from '@/features/dashboard/TitleBar';
import { VisaApplicationForm } from '@/features/visa/VisaApplicationForm';
import { VisaApplicationService } from '@/features/visa/VisaApplicationService';
import { ApplicationStatus, VisaApplication } from '@/models/VisaApplication';

const ViewEditVisaApplicationPage = () => {
  const t = useTranslations('VisaApplication');
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<VisaApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = params.id as string;

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const app = await VisaApplicationService.getApplicationById(id);
        if (app) {
          setApplication(app);
        } else {
          setError('Application not found');
        }
      } catch (err) {
        setError('Failed to load application');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const isEditable = application?.status === ApplicationStatus.DRAFT || 
                     application?.status === ApplicationStatus.STARTED;

  if (loading) {
    return <div className="flex justify-center p-8">Loading application...</div>;
  }

  if (error || !application) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Application not found'}</h2>
        <p className="mb-6">The application you're looking for could not be found or loaded.</p>
        <Button onClick={handleBack}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={handleBack} className="mr-4">
          ← Back
        </Button>
        <TitleBar
          title={isEditable ? t('edit_application') : t('view_application')}
          description={
            isEditable 
              ? t('edit_application_description') 
              : t('view_application_description')
          }
        />
      </div>

      <div className="bg-white p-4 rounded-md mb-6 border shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{t(`visa_type_${application.visaType}`)}</h3>
            <p className="text-sm text-muted-foreground">
              {t('created_at')}: {application.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {application.status}
          </div>
        </div>
      </div>

      <div className="mt-6">
        {isEditable ? (
          <VisaApplicationForm existingApplication={application} />
        ) : (
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('application_details')}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('basic_information')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('visa_type')}</p>
                    <p>{t(`visa_type_${application.visaType}`)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('applicant_count')}</p>
                    <p>{application.applicantCount}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('travel_information')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('planned_arrival_date')}</p>
                    <p>{application.plannedArrivalDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('planned_departure_date')}</p>
                    <p>{application.plannedDepartureDate}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">{t('accommodation_address')}</p>
                  <p>{application.accommodationAddress}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('applicants')}</h3>
                {application.applicants.map((applicant, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 mb-4">
                    <h4 className="font-medium mb-2">
                      {t('applicant')} {index + 1}: {applicant.firstName} {applicant.lastName}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('nationality')}</p>
                        <p>{applicant.nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('passport')}</p>
                        <p>{applicant.passportNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('email')}</p>
                        <p>{applicant.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('phone')}</p>
                        <p>{applicant.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {application.status === ApplicationStatus.DENIED && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">{t('application_denied')}</h3>
                  <p className="text-red-600">
                    {t('application_denied_message')}
                  </p>
                </div>
              )}
              
              {application.status === ApplicationStatus.APPROVED && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">{t('application_approved')}</h3>
                  <p className="text-green-600">
                    {t('application_approved_message')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewEditVisaApplicationPage;