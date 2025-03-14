import { z } from "zod";

// Visa types
export enum VisaType {
  TOURIST = "tourist",
  BUSINESS = "business",
  STUDENT = "student",
  WORK = "work",
  FAMILY = "family",
}

// Application status
export enum ApplicationStatus {
  DRAFT = "draft",
  STARTED = "started",
  WAITING_PAYMENT = "waiting_payment",
  PENDING = "pending",
  WAITING_SIGNATURES = "waiting_signatures",
  COMPLETED = "completed",
  APPROVED = "approved",
  DENIED = "denied",
}

// Marital status enum
export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
  SEPARATED = "separated",
}

// Document type enum
export enum DocumentType {
  PASSPORT = "passport",
  ID_CARD = "id_card",
  DRIVERS_LICENSE = "drivers_license",
  OTHER = "other",
}

// Applicant schema for personal information
export const applicantSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format"),
  nationality: z.string().min(2, "Please select a valid nationality"),
  passportNumber: z.string().min(5, "Passport number must be at least 5 characters"),
  passportExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  
  // Additional fields for legal agreement
  maritalStatus: z.nativeEnum(MaritalStatus, { required_error: "Please select a marital status" }).optional(),
  documentType: z.nativeEnum(DocumentType, { required_error: "Please select a document type" }).optional(),
  documentNumber: z.string().min(5, "Document number must be at least 5 characters").optional(),
  documentIssuer: z.string().min(2, "Document issuer must be at least 2 characters").optional(),
  documentExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format").optional(),
  address: z.string().min(10, "Please provide a detailed address").optional(),
  taxId: z.string().min(5, "Tax ID must be at least 5 characters").optional(),
  
  // Documents
  passportScan: z.instanceof(File, { message: "Passport scan is required" }).optional(),
  photoId: z.instanceof(File, { message: "Photo ID is required" }).optional(),
});

export type Applicant = z.infer<typeof applicantSchema>;

// Legal service types
export enum LegalServiceType {
  VISA_APPLICATION = "visa_application",
  RESIDENCE_PERMIT = "residence_permit",
  CITIZENSHIP = "citizenship",
  LEGAL_CONSULTATION = "legal_consultation",
  OTHER = "other",
}

// Visa application schema
export const visaApplicationSchema = z.object({
  // Metadata
  id: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.DRAFT),
  createdAt: z.date().optional().default(() => new Date()),
  updatedAt: z.date().optional().default(() => new Date()),
  
  // Step 1: Basic Information
  visaType: z.nativeEnum(VisaType, {
    required_error: "Please select a visa type",
  }),
  applicantCount: z.number({
    required_error: "Please specify the number of applicants",
  }).min(1, "At least one applicant is required").max(10, "Maximum 10 applicants allowed"),
  
  // Step 2: Applicants Information (array of applicants)
  applicants: z.array(applicantSchema).min(1, "At least one applicant is required"),
  
  // Step 3: Travel Information
  plannedArrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format"),
  plannedDepartureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format"),
  accommodationAddress: z.string().min(10, "Please provide a detailed accommodation address"),
  
  // Step 4: Common Documents
  proofOfAccommodation: z.instanceof(File, { message: "Proof of accommodation is required" }).optional(),
  financialProof: z.instanceof(File, { message: "Proof of financial means is required" }).optional(),
  
  // Additional fields based on visa type
  // These will be conditionally required based on the visa type
  invitationLetter: z.instanceof(File).optional(),
  enrollmentProof: z.instanceof(File).optional(),
  employmentContract: z.instanceof(File).optional(),
  familyRelationshipProof: z.instanceof(File).optional(),
  
  // Step 5: Legal Agreement
  legalAgreementConsent: z.boolean().optional(),
  legalAgreementSignatureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date in YYYY-MM-DD format").optional(),
  legalAgreementSignatureLocation: z.string().min(2, "Please provide a signature location").optional(),
  legalAgreementService: z.nativeEnum(LegalServiceType).optional(),
  legalAgreementServiceDescription: z.string().optional(),
  legalAgreementValue: z.number().min(0, "Value must be a positive number").optional(),
  legalAgreementConsultant: z.string().optional(),
  legalAgreementDocumentId: z.string().optional(), // ID from Autentique API
  legalAgreementSignedUrl: z.string().optional(), // URL to signed document
});

export type VisaApplication = z.infer<typeof visaApplicationSchema>;

// Default empty applicant
export const emptyApplicant: Applicant = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
  passportExpiryDate: "",
  email: "",
  phone: "",
  maritalStatus: undefined,
  documentType: undefined,
  documentNumber: "",
  documentIssuer: "",
  documentExpiryDate: "",
  address: "",
  taxId: "",
  passportScan: undefined,
  photoId: undefined,
};

// Default values for the form
export const defaultVisaApplication: Partial<VisaApplication> = {
  visaType: VisaType.TOURIST,
  applicantCount: 1,
  applicants: [{ ...emptyApplicant }],
  status: ApplicationStatus.DRAFT,
  createdAt: new Date(),
  updatedAt: new Date(),
  legalAgreementConsent: false,
  legalAgreementService: LegalServiceType.VISA_APPLICATION,
  legalAgreementConsultant: "Advogados ZR",
};