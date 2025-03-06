import { z } from "zod";

// Visa types
export enum VisaType {
  TOURIST = "tourist",
  BUSINESS = "business",
  STUDENT = "student",
  WORK = "work",
  FAMILY = "family",
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
  
  // Documents
  passportScan: z.instanceof(File, { message: "Passport scan is required" }).optional(),
  photoId: z.instanceof(File, { message: "Photo ID is required" }).optional(),
});

export type Applicant = z.infer<typeof applicantSchema>;

// Visa application schema
export const visaApplicationSchema = z.object({
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
  passportScan: undefined,
  photoId: undefined,
};

// Default values for the form
export const defaultVisaApplication: Partial<VisaApplication> = {
  visaType: VisaType.TOURIST,
  applicantCount: 1,
  applicants: [{ ...emptyApplicant }],
};