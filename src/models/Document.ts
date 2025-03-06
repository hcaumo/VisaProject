import { z } from "zod";

export enum DocumentType {
  PASSPORT_SCAN = "passport_scan",
  PHOTO_ID = "photo_id",
  PROOF_OF_ACCOMMODATION = "proof_of_accommodation",
  FINANCIAL_PROOF = "financial_proof",
  INVITATION_LETTER = "invitation_letter",
  ENROLLMENT_PROOF = "enrollment_proof",
  EMPLOYMENT_CONTRACT = "employment_contract",
  FAMILY_RELATIONSHIP_PROOF = "family_relationship_proof",
  OTHER = "other",
}

export enum DocumentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface DocumentHistory {
  id: string;
  action: "upload" | "update" | "delete" | "status_change";
  timestamp: Date;
  userId: string;
  userName: string;
  details: string;
}

export const documentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(DocumentType),
  status: z.nativeEnum(DocumentStatus).default(DocumentStatus.PENDING),
  uploadedAt: z.date(),
  updatedAt: z.date().optional(),
  fileUrl: z.string(),
  fileSize: z.number(),
  mimeType: z.string(),
  applicantId: z.string().optional(), // If document belongs to a specific applicant
  userId: z.string(), // The user who owns this document
  visaApplicationId: z.string().optional(), // If document is part of a visa application
  notes: z.string().optional(),
  history: z.array(z.custom<DocumentHistory>()).default([]),
});

export type Document = z.infer<typeof documentSchema>;

// Mock data for development
export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "passport-john-doe.pdf",
    type: DocumentType.PASSPORT_SCAN,
    status: DocumentStatus.APPROVED,
    uploadedAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 16),
    fileUrl: "/documents/passport-john-doe.pdf",
    fileSize: 1024 * 1024 * 2.5, // 2.5MB
    mimeType: "application/pdf",
    userId: "user-1",
    applicantId: "applicant-1",
    visaApplicationId: "visa-app-1",
    history: [
      {
        id: "hist-1",
        action: "upload",
        timestamp: new Date(2023, 5, 15),
        userId: "user-1",
        userName: "John Doe",
        details: "Document uploaded",
      },
      {
        id: "hist-2",
        action: "status_change",
        timestamp: new Date(2023, 5, 16),
        userId: "admin-1",
        userName: "Admin User",
        details: "Document approved",
      },
    ],
  },
  {
    id: "doc-2",
    name: "photo-id-john-doe.jpg",
    type: DocumentType.PHOTO_ID,
    status: DocumentStatus.PENDING,
    uploadedAt: new Date(2023, 5, 15),
    fileUrl: "/documents/photo-id-john-doe.jpg",
    fileSize: 1024 * 512, // 512KB
    mimeType: "image/jpeg",
    userId: "user-1",
    applicantId: "applicant-1",
    visaApplicationId: "visa-app-1",
    history: [
      {
        id: "hist-3",
        action: "upload",
        timestamp: new Date(2023, 5, 15),
        userId: "user-1",
        userName: "John Doe",
        details: "Document uploaded",
      },
    ],
  },
  {
    id: "doc-3",
    name: "hotel-reservation.pdf",
    type: DocumentType.PROOF_OF_ACCOMMODATION,
    status: DocumentStatus.REJECTED,
    uploadedAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 17),
    fileUrl: "/documents/hotel-reservation.pdf",
    fileSize: 1024 * 1024 * 1.2, // 1.2MB
    mimeType: "application/pdf",
    userId: "user-1",
    visaApplicationId: "visa-app-1",
    notes: "Document is expired. Please upload a current hotel reservation.",
    history: [
      {
        id: "hist-4",
        action: "upload",
        timestamp: new Date(2023, 5, 15),
        userId: "user-1",
        userName: "John Doe",
        details: "Document uploaded",
      },
      {
        id: "hist-5",
        action: "status_change",
        timestamp: new Date(2023, 5, 17),
        userId: "admin-1",
        userName: "Admin User",
        details: "Document rejected: expired reservation",
      },
    ],
  },
  {
    id: "doc-4",
    name: "bank-statement.pdf",
    type: DocumentType.FINANCIAL_PROOF,
    status: DocumentStatus.PENDING,
    uploadedAt: new Date(2023, 5, 18),
    fileUrl: "/documents/bank-statement.pdf",
    fileSize: 1024 * 1024 * 3.1, // 3.1MB
    mimeType: "application/pdf",
    userId: "user-1",
    visaApplicationId: "visa-app-1",
    history: [
      {
        id: "hist-6",
        action: "upload",
        timestamp: new Date(2023, 5, 18),
        userId: "user-1",
        userName: "John Doe",
        details: "Document uploaded",
      },
    ],
  },
];

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}

// Helper function to get document type display name
export function getDocumentTypeDisplayName(type: DocumentType): string {
  switch (type) {
    case DocumentType.PASSPORT_SCAN:
      return "Passport Scan";
    case DocumentType.PHOTO_ID:
      return "Photo ID";
    case DocumentType.PROOF_OF_ACCOMMODATION:
      return "Proof of Accommodation";
    case DocumentType.FINANCIAL_PROOF:
      return "Financial Proof";
    case DocumentType.INVITATION_LETTER:
      return "Invitation Letter";
    case DocumentType.ENROLLMENT_PROOF:
      return "Enrollment Proof";
    case DocumentType.EMPLOYMENT_CONTRACT:
      return "Employment Contract";
    case DocumentType.FAMILY_RELATIONSHIP_PROOF:
      return "Family Relationship Proof";
    case DocumentType.OTHER:
      return "Other Document";
    default:
      return "Unknown Document Type";
  }
}

// Helper function to get status badge color
export function getStatusColor(status: DocumentStatus): string {
  switch (status) {
    case DocumentStatus.APPROVED:
      return "bg-green-100 text-green-800";
    case DocumentStatus.REJECTED:
      return "bg-red-100 text-red-800";
    case DocumentStatus.PENDING:
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}