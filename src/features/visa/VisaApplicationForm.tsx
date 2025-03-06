"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StripeService } from "@/features/payment/StripeService";
import { AutentiqueClientService } from "@/features/visa/AutentiqueClientService";
import { VisaApplicationService } from "@/features/visa/VisaApplicationService";
import {
  ApplicationStatus,
  DocumentType,
  LegalServiceType,
  MaritalStatus,
  VisaApplication,
  VisaType,
  defaultVisaApplication,
  emptyApplicant,
  visaApplicationSchema,
} from "@/models/VisaApplication";

// Steps in the visa application process
enum ApplicationStep {
  VISA_TYPE_SELECTION = 0,
  PERSONAL_INFORMATION = 1,
  TRAVEL_INFORMATION = 2,
  DOCUMENTS = 3,
  REVIEW = 4,
}

interface VisaApplicationFormProps {
  existingApplication?: VisaApplication;
}

export const VisaApplicationForm = ({ existingApplication }: VisaApplicationFormProps) => {
  const t = useTranslations("VisaApplication");
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(
    ApplicationStep.VISA_TYPE_SELECTION
  );

  // Initialize form with default values or existing application
  const form = useForm<VisaApplication>({
    resolver: zodResolver(visaApplicationSchema),
    defaultValues: existingApplication || defaultVisaApplication,
  });

  // Set up field array for applicants
  const { fields: applicantFields, append, remove } = useFieldArray({
    control: form.control,
    name: "applicants",
  });

  // Watch for changes in applicant count to update the applicants array
  const applicantCount = form.watch("applicantCount");
  
  useEffect(() => {
    // Update applicants array when applicant count changes
    const currentApplicants = applicantFields.length;
    
    if (applicantCount > currentApplicants) {
      // Add new applicants
      for (let i = currentApplicants; i < applicantCount; i++) {
        append({ ...emptyApplicant });
      }
    } else if (applicantCount < currentApplicants) {
      // Remove excess applicants
      for (let i = currentApplicants - 1; i >= applicantCount; i--) {
        remove(i);
      }
    }
  }, [applicantCount, applicantFields.length, append, remove]);

  const onSubmit = async (data: VisaApplication) => {
    try {
      // Set legal agreement consent to true automatically
      data.legalAgreementConsent = true;

      let applicationId: string | undefined;
      
      // Generate and send the legal agreement for signature if not already done
      if (!data.legalAgreementDocumentId && data.applicants.length > 0) {
        // Get the primary applicant
        const primaryApplicant = data.applicants[0];
        
        // Generate the legal agreement HTML
        const agreementHtml = await AutentiqueClientService.generateAgreementHtml({
          clientName: `${primaryApplicant?.firstName || ''} ${primaryApplicant?.lastName || ''}`,
          clientMaritalStatus: primaryApplicant?.maritalStatus ? t(`marital_status_${primaryApplicant.maritalStatus}`) : "",
          clientNationality: primaryApplicant?.nationality || '',
          clientDocumentType: primaryApplicant?.documentType ? t(`document_type_${primaryApplicant.documentType}`) : "",
          clientDocumentNumber: primaryApplicant?.documentNumber || "",
          clientDocumentIssuer: primaryApplicant?.documentIssuer || "",
          clientDocumentExpiryDate: primaryApplicant?.documentExpiryDate || "",
          clientAddress: primaryApplicant?.address || "",
          clientTaxId: primaryApplicant?.taxId || "",
          clientPhone: primaryApplicant?.phone || '',
          clientEmail: primaryApplicant?.email || '',
          consultantName: data.legalAgreementConsultant || "Advogados ZR",
          serviceDescription: data.legalAgreementServiceDescription || (data.legalAgreementService ? t(`legal_service_${data.legalAgreementService}`) : ""),
          serviceValue: data.legalAgreementValue || 0,
          signatureLocation: data.legalAgreementSignatureLocation || "",
          signatureDate: data.legalAgreementSignatureDate || new Date().toISOString().split('T')[0],
        });
        
        // Create the document in Autentique
        const documentId = await AutentiqueClientService.createDocument(
          `Visa Application - ${t(`visa_type_${data.visaType}`)} - ${primaryApplicant?.firstName || 'Unknown'} ${primaryApplicant?.lastName || 'User'}`,
          agreementHtml,
          `${primaryApplicant?.firstName || 'Unknown'} ${primaryApplicant?.lastName || 'User'}`,
          primaryApplicant?.email || 'unknown@example.com'
        );
        
        if (documentId) {
          // Update the application with the document ID
          data.legalAgreementDocumentId = documentId;
          
          // Get the signed document URL
          const signedUrl = await AutentiqueClientService.getSignedDocumentUrl(documentId);
          if (signedUrl) {
            data.legalAgreementSignedUrl = signedUrl;
          }
        } else {
          throw new Error("Failed to create legal agreement document");
        }
      }
      
      if (existingApplication?.id) {
        // Update existing application
        const updatedApp = await VisaApplicationService.updateApplication(existingApplication.id, data);
        applicationId = existingApplication.id;
        
        // Submit if it's a draft
        if (existingApplication.status === ApplicationStatus.DRAFT && updatedApp) {
          await VisaApplicationService.submitApplication(existingApplication.id);
        }
      } else {
        // Create new application
        const newApp = await VisaApplicationService.createApplication(data);
        applicationId = newApp.id;
        
        // Submit the application
        if (newApp.id) {
          await VisaApplicationService.submitApplication(newApp.id);
        }
      }
      
      // Calculate the fee based on visa type
      const fee = StripeService.getApplicationFee(data.visaType);
      
      // Redirect to Stripe payment
      await StripeService.redirectToCheckout({
        amount: fee * 100, // Stripe expects amount in cents
        currency: 'usd',
        description: `Visa Application - ${t(`visa_type_${data.visaType}`)}`,
        applicationId,
        successUrl: window.location.origin + `/dashboard/payment-success?status=success&applicationId=${applicationId}`,
        cancelUrl: window.location.origin + `/dashboard/payment-success?status=cancelled&applicationId=${applicationId}`,
      });
      
      // Note: The code below will only execute if the Stripe redirect fails
      // and the simulation in StripeService is triggered
      // We'll just redirect to the dashboard without showing an alert
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(t("application_submission_error"));
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      return next <= ApplicationStep.REVIEW ? next : prev;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      const next = prev - 1;
      return next >= ApplicationStep.VISA_TYPE_SELECTION ? next : prev;
    });
  };

  // Generate an array of numbers for applicant count dropdown
  const applicantCountOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 border">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Object.values(ApplicationStep)
            .filter((step) => typeof step === "number")
            .map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  Number(step) <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    Number(step) <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {Number(step) + 1}
                </div>
                <span className="text-xs">
                  {t(`step_${step}_title`)}
                </span>
              </div>
            ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-muted" />
          </div>
          <div
            className="absolute inset-0 flex items-center"
            style={{
              width: `${
                (currentStep / (Object.keys(ApplicationStep).length / 2 - 1)) *
                100
              }%`,
            }}
          >
            <div className="w-full h-1 bg-primary" />
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Visa Type Selection */}
          {currentStep === ApplicationStep.VISA_TYPE_SELECTION && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t("step_0_title")}</h2>
              <p className="text-muted-foreground">{t("step_0_description")}</p>

              <FormField
                control={form.control}
                name="visaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("visa_type")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_visa_type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(VisaType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {t(`visa_type_${type}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t("visa_type_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicantCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("applicant_count")}</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value, 10))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("select_applicant_count")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {applicantCountOptions.map((count) => (
                          <SelectItem key={count} value={count.toString()}>
                            {count}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t("applicant_count_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === ApplicationStep.PERSONAL_INFORMATION && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">{t("step_1_title")}</h2>
              <p className="text-muted-foreground">{t("step_1_description")}</p>

              {applicantFields.map((applicantField, applicantIndex) => (
                <div key={applicantField.id} className="border rounded-lg p-4 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("applicant")} {applicantIndex + 1}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.firstName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("first_name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_first_name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.lastName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("last_name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_last_name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.dateOfBirth`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("date_of_birth")}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.nationality`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("nationality")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_nationality")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.maritalStatus`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("marital_status")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("select_marital_status")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(MaritalStatus).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {t(`marital_status_${status}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("address")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_address")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.taxId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("tax_id")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_tax_id")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.documentType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("document_type")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("select_document_type")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(DocumentType).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {t(`document_type_${type}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.documentNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("document_number")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_document_number")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.documentIssuer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("document_issuer")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_document_issuer")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.documentExpiryDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("document_expiry_date")}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.passportNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("passport_number")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_passport_number")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.passportExpiryDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("passport_expiry_date")}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email")}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t("enter_email")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`applicants.${applicantIndex}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phone")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("enter_phone")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Travel Information */}
          {currentStep === ApplicationStep.TRAVEL_INFORMATION && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t("step_2_title")}</h2>
              <p className="text-muted-foreground">{t("step_2_description")}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="plannedArrivalDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("planned_arrival_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plannedDepartureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("planned_departure_date")}</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="accommodationAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("accommodation_address")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enter_accommodation_address")} {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("accommodation_address_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === ApplicationStep.DOCUMENTS && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">{t("step_3_title")}</h2>
              <p className="text-muted-foreground">{t("step_3_description")}</p>

              {/* Applicant-specific documents */}
              {applicantFields.map((applicantField, applicantIndex) => (
                <div key={applicantField.id} className="border rounded-lg p-4 space-y-4">
                  <h3 className="text-xl font-semibold">
                    {t("applicant")} {applicantIndex + 1}: {form.watch(`applicants.${applicantIndex}.firstName`)} {form.watch(`applicants.${applicantIndex}.lastName`)}
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name={`applicants.${applicantIndex}.passportScan`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>{t("passport_scan")}</FormLabel>
                        <FormControl>
                          <FileInput
                            accept=".pdf,.jpg,.jpeg,.png"
                            buttonText={t("upload_passport_scan")}
                            value={value as File | null}
                            onChange={onChange}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("passport_scan_description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`applicants.${applicantIndex}.photoId`}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>{t("photo_id")}</FormLabel>
                        <FormControl>
                          <FileInput
                            accept=".jpg,.jpeg,.png"
                            buttonText={t("upload_photo_id")}
                            value={value as File | null}
                            onChange={onChange}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("photo_id_description")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <h3 className="text-xl font-semibold mt-8">{t("common_documents")}</h3>

              <FormField
                control={form.control}
                name="proofOfAccommodation"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t("proof_of_accommodation")}</FormLabel>
                    <FormControl>
                      <FileInput
                        accept=".pdf,.jpg,.jpeg,.png"
                        buttonText={t("upload_proof_of_accommodation")}
                        value={value as File | null}
                        onChange={onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("proof_of_accommodation_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financialProof"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>{t("financial_proof")}</FormLabel>
                    <FormControl>
                      <FileInput
                        accept=".pdf,.jpg,.jpeg,.png"
                        buttonText={t("upload_financial_proof")}
                        value={value as File | null}
                        onChange={onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("financial_proof_description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional fields based on visa type */}
              {form.watch("visaType") === VisaType.BUSINESS && (
                <FormField
                  control={form.control}
                  name="invitationLetter"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t("invitation_letter")}</FormLabel>
                      <FormControl>
                        <FileInput
                          accept=".pdf,.jpg,.jpeg,.png"
                          buttonText={t("upload_invitation_letter")}
                          value={value as File | null}
                          onChange={onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("invitation_letter_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("visaType") === VisaType.STUDENT && (
                <FormField
                  control={form.control}
                  name="enrollmentProof"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t("enrollment_proof")}</FormLabel>
                      <FormControl>
                        <FileInput
                          accept=".pdf,.jpg,.jpeg,.png"
                          buttonText={t("upload_enrollment_proof")}
                          value={value as File | null}
                          onChange={onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("enrollment_proof_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("visaType") === VisaType.WORK && (
                <FormField
                  control={form.control}
                  name="employmentContract"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t("employment_contract")}</FormLabel>
                      <FormControl>
                        <FileInput
                          accept=".pdf,.jpg,.jpeg,.png"
                          buttonText={t("upload_employment_contract")}
                          value={value as File | null}
                          onChange={onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("employment_contract_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("visaType") === VisaType.FAMILY && (
                <FormField
                  control={form.control}
                  name="familyRelationshipProof"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t("family_relationship_proof")}</FormLabel>
                      <FormControl>
                        <FileInput
                          accept=".pdf,.jpg,.jpeg,.png"
                          buttonText={t("upload_family_relationship_proof")}
                          value={value as File | null}
                          onChange={onChange}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("family_relationship_proof_description")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}


          {/* Step 5: Review */}
          {currentStep === ApplicationStep.REVIEW && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t("step_4_title")}</h2>
              <p className="text-muted-foreground">{t("step_4_description")}</p>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-semibold mb-2">{t("visa_type")}</h3>
                <p>{t(`visa_type_${form.watch("visaType")}`)}</p>
                <p className="text-sm text-muted-foreground">
                  {t("applicant_count")}: {form.watch("applicantCount")}
                </p>

                <div className="border-t my-4"></div>

                <h3 className="font-semibold mb-2">{t("personal_information")}</h3>
                
                {applicantFields.map((applicantField, applicantIndex) => (
                  <div key={applicantField.id} className="mb-4 border-l-4 border-primary pl-4">
                    <h4 className="font-medium mb-2">
                      {t("applicant")} {applicantIndex + 1}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">{t("name")}</p>
                        <p>
                          {form.watch(`applicants.${applicantIndex}.firstName`)} {form.watch(`applicants.${applicantIndex}.lastName`)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("date_of_birth")}</p>
                        <p>{form.watch(`applicants.${applicantIndex}.dateOfBirth`)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("nationality")}</p>
                        <p>{form.watch(`applicants.${applicantIndex}.nationality`)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("passport")}</p>
                        <p>
                          {form.watch(`applicants.${applicantIndex}.passportNumber`)} (Expires: {form.watch(`applicants.${applicantIndex}.passportExpiryDate`)})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("email")}</p>
                        <p>{form.watch(`applicants.${applicantIndex}.email`)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t("phone")}</p>
                        <p>{form.watch(`applicants.${applicantIndex}.phone`)}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t my-4"></div>

                <h3 className="font-semibold mb-2">{t("travel_information")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("planned_arrival_date")}</p>
                    <p>{form.watch("plannedArrivalDate")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("planned_departure_date")}</p>
                    <p>{form.watch("plannedDepartureDate")}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">{t("accommodation_address")}</p>
                  <p>{form.watch("accommodationAddress")}</p>
                </div>

                <div className="border-t my-4"></div>

                <h3 className="font-semibold mb-2">{t("documents")}</h3>
                
                {applicantFields.map((applicantField, applicantIndex) => (
                  <div key={applicantField.id} className="mb-4 border-l-4 border-primary pl-4">
                    <h4 className="font-medium mb-2">
                      {t("applicant")} {applicantIndex + 1}: {form.watch(`applicants.${applicantIndex}.firstName`)} {form.watch(`applicants.${applicantIndex}.lastName`)}
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        {form.watch(`applicants.${applicantIndex}.passportScan`)
                          ? `${t("passport_scan")}: ${form.watch(`applicants.${applicantIndex}.passportScan`)?.name}`
                          : `${t("passport_scan")}: ${t("not_uploaded")}`}
                      </li>
                      <li>
                        {form.watch(`applicants.${applicantIndex}.photoId`)
                          ? `${t("photo_id")}: ${form.watch(`applicants.${applicantIndex}.photoId`)?.name}`
                          : `${t("photo_id")}: ${t("not_uploaded")}`}
                      </li>
                    </ul>
                  </div>
                ))}
                
                <h4 className="font-medium mt-4 mb-2">{t("common_documents")}</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    {form.watch("proofOfAccommodation")
                      ? `${t("proof_of_accommodation")}: ${form.watch("proofOfAccommodation")?.name}`
                      : `${t("proof_of_accommodation")}: ${t("not_uploaded")}`}
                  </li>
                  <li>
                    {form.watch("financialProof")
                      ? `${t("financial_proof")}: ${form.watch("financialProof")?.name}`
                      : `${t("financial_proof")}: ${t("not_uploaded")}`}
                  </li>
                </ul>
              </div>

              <div className="border p-4 rounded-md bg-yellow-50 text-yellow-800">
                <h3 className="font-semibold mb-2">{t("terms_and_conditions_title")}</h3>
                <p className="text-sm">{t("terms_and_conditions_text")}</p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === ApplicationStep.VISA_TYPE_SELECTION}
            >
              {t("previous")}
            </Button>

            {currentStep < ApplicationStep.REVIEW ? (
              <Button type="button" onClick={nextStep}>
                {t("next")}
              </Button>
            ) : (
              <Button type="submit">{t("submit_application")}</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};