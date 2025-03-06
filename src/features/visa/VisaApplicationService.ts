import { v4 as uuidv4 } from 'uuid';
import { ApplicationStatus, VisaApplication, VisaType, emptyApplicant } from '@/models/VisaApplication';
import { generateVisaApplications } from '@/utils/FakeDataGenerator';
import { AutentiqueClientService } from './AutentiqueClientService';

// Create empty applicants array for mock data
const createEmptyApplicants = (count: number) => {
  return Array(count).fill(0).map(() => ({ ...emptyApplicant }));
};

// Generate a mix of applications with different statuses
const mockApplications: VisaApplication[] = [
  // Generate 5 draft applications
  ...generateVisaApplications(5, ApplicationStatus.DRAFT),
  
  // Generate 3 waiting for payment applications
  ...generateVisaApplications(3, ApplicationStatus.WAITING_PAYMENT),
  
  // Generate 3 pending applications
  ...generateVisaApplications(3, ApplicationStatus.PENDING),
  
  // Generate 2 approved applications
  ...generateVisaApplications(2, ApplicationStatus.APPROVED),
  
  // Generate 1 denied application
  ...generateVisaApplications(1, ApplicationStatus.DENIED),
  
  // Generate 2 completed applications
  ...generateVisaApplications(2, ApplicationStatus.COMPLETED),
  
  // Generate 2 started applications
  ...generateVisaApplications(2, ApplicationStatus.STARTED),
];

// Service class for visa applications
export class VisaApplicationService {
  // Get all applications for the current user
  static getApplications(): Promise<VisaApplication[]> {
    // In a real application, this would fetch from an API
    return Promise.resolve(mockApplications);
  }

  // Get a specific application by ID
  static getApplicationById(id: string): Promise<VisaApplication | undefined> {
    // In a real application, this would fetch from an API
    const application = mockApplications.find(app => app.id === id);
    return Promise.resolve(application);
  }

  // Create a new application
  static createApplication(application: Partial<VisaApplication>): Promise<VisaApplication> {
    // Ensure required fields are present
    const newApplication: VisaApplication = {
      id: uuidv4(),
      status: ApplicationStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
      visaType: application.visaType || VisaType.TOURIST,
      applicantCount: application.applicantCount || 1,
      applicants: application.applicants || createEmptyApplicants(application.applicantCount || 1),
      plannedArrivalDate: application.plannedArrivalDate || '',
      plannedDepartureDate: application.plannedDepartureDate || '',
      accommodationAddress: application.accommodationAddress || '',
      ...application
    } as VisaApplication;
    
    // Add to mock data (in a real app, this would be handled by the backend)
    mockApplications.push(newApplication);
    
    return Promise.resolve(newApplication);
  }

  // Update an existing application
  static updateApplication(id: string, updates: Partial<VisaApplication>): Promise<VisaApplication | undefined> {
    // In a real application, this would send to an API
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedApplication = {
      ...mockApplications[index],
      ...updates,
      updatedAt: new Date(),
    } as VisaApplication;
    
    // Update in mock data (in a real app, this would be handled by the backend)
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }

  // Submit an application (change status from DRAFT to WAITING_PAYMENT)
  static submitApplication(id: string): Promise<VisaApplication | undefined> {
    // Find the application first
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    // Update the status directly
    const updatedApplication = { ...mockApplications[index] } as VisaApplication;
    updatedApplication.status = ApplicationStatus.WAITING_PAYMENT;
    updatedApplication.updatedAt = new Date();
    
    // Update in mock data
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }

  // Complete payment for an application (change status from WAITING_PAYMENT to WAITING_SIGNATURES)
  static async completePayment(id: string): Promise<VisaApplication | undefined> {
    // Find the application first
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    // Only update if the status is WAITING_PAYMENT
    if (mockApplications[index]?.status !== ApplicationStatus.WAITING_PAYMENT) {
      return Promise.resolve(mockApplications[index] as VisaApplication);
    }
    
    // Update the status to PENDING first (intermediate state)
    const application = { ...mockApplications[index] } as VisaApplication;
    application.status = ApplicationStatus.PENDING;
    application.updatedAt = new Date();
    
    // Update in mock data
    mockApplications[index] = application;
    
    // Automatically generate legal agreement
    if (!application.applicants || application.applicants.length === 0) {
      console.error('No applicants found for application');
      return Promise.resolve(application);
    }
    
    const mainApplicant = application.applicants[0];
    
    // Prepare agreement data with null checks
    const currentDate = new Date().toISOString().split('T')[0];
    const agreementData = {
      clientName: `${mainApplicant?.firstName || ''} ${mainApplicant?.lastName || ''}`,
      clientMaritalStatus: mainApplicant?.maritalStatus || 'single',
      clientNationality: mainApplicant?.nationality || '',
      clientDocumentType: mainApplicant?.documentType || 'passport',
      clientDocumentNumber: mainApplicant?.documentNumber || mainApplicant?.passportNumber || '',
      clientDocumentIssuer: mainApplicant?.documentIssuer || 'Unknown',
      clientDocumentExpiryDate: mainApplicant?.documentExpiryDate || mainApplicant?.passportExpiryDate || '',
      clientAddress: mainApplicant?.address || 'Unknown',
      clientTaxId: mainApplicant?.taxId || 'Unknown',
      clientPhone: mainApplicant?.phone || '',
      clientEmail: mainApplicant?.email || '',
      consultantName: application.legalAgreementConsultant || 'Advogados ZR',
      serviceDescription: `Visa application services for ${application.visaType} visa`,
      serviceValue: 500, // Example value
      signatureLocation: 'Lisbon, Portugal',
      signatureDate: currentDate,
    };
    
    // Generate HTML content for the agreement
    const agreementHtml = await AutentiqueClientService.generateAgreementHtml(agreementData);
    
    // Create document in Autentique
    const documentId = await AutentiqueClientService.createDocument(
      `Visa Application Agreement - ${mainApplicant?.firstName || 'Unknown'} ${mainApplicant?.lastName || 'User'}`,
      agreementHtml,
      `${mainApplicant?.firstName || 'Unknown'} ${mainApplicant?.lastName || 'User'}`,
      mainApplicant?.email || 'unknown@example.com'
    );
    
    if (!documentId) {
      console.error('Failed to create document in Autentique');
      return Promise.resolve(application);
    }
    
    // Update the application with legal agreement details and change status to WAITING_SIGNATURES
    const updatedApplication = { ...application };
    updatedApplication.status = ApplicationStatus.WAITING_SIGNATURES;
    updatedApplication.updatedAt = new Date();
    updatedApplication.legalAgreementDocumentId = documentId;
    updatedApplication.legalAgreementSignatureDate = agreementData.signatureDate;
    updatedApplication.legalAgreementSignatureLocation = agreementData.signatureLocation;
    updatedApplication.legalAgreementService = application.legalAgreementService;
    updatedApplication.legalAgreementServiceDescription = agreementData.serviceDescription;
    updatedApplication.legalAgreementValue = agreementData.serviceValue;
    
    // Get the signed document URL
    const signedUrl = await AutentiqueClientService.getSignedDocumentUrl(documentId);
    if (signedUrl) {
      updatedApplication.legalAgreementSignedUrl = signedUrl;
    }
    
    // Update in mock data
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }

  // Generate a legal agreement for an application (change status from PENDING to WAITING_SIGNATURES)
  static async generateLegalAgreement(id: string): Promise<VisaApplication | undefined> {
    // Find the application first
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    // Only update if the status is PENDING
    if (mockApplications[index]?.status !== ApplicationStatus.PENDING) {
      return Promise.resolve(mockApplications[index] as VisaApplication);
    }
    
    const application = mockApplications[index] as VisaApplication;
    
    // Check if applicants exist
    if (!application.applicants || application.applicants.length === 0) {
      console.error('No applicants found for application');
      return Promise.resolve(application);
    }
    
    const mainApplicant = application.applicants[0];
    
    // Prepare agreement data with null checks
    const currentDate = new Date().toISOString().split('T')[0];
    const agreementData = {
      clientName: `${mainApplicant?.firstName || ''} ${mainApplicant?.lastName || ''}`,
      clientMaritalStatus: mainApplicant?.maritalStatus || 'single',
      clientNationality: mainApplicant?.nationality || '',
      clientDocumentType: mainApplicant?.documentType || 'passport',
      clientDocumentNumber: mainApplicant?.documentNumber || mainApplicant?.passportNumber || '',
      clientDocumentIssuer: mainApplicant?.documentIssuer || 'Unknown',
      clientDocumentExpiryDate: mainApplicant?.documentExpiryDate || mainApplicant?.passportExpiryDate || '',
      clientAddress: mainApplicant?.address || 'Unknown',
      clientTaxId: mainApplicant?.taxId || 'Unknown',
      clientPhone: mainApplicant?.phone || '',
      clientEmail: mainApplicant?.email || '',
      consultantName: application.legalAgreementConsultant || 'Advogados ZR',
      serviceDescription: `Visa application services for ${application.visaType} visa`,
      serviceValue: 500, // Example value
      signatureLocation: 'Lisbon, Portugal',
      signatureDate: currentDate,
    };
    
    // Generate HTML content for the agreement
    const agreementHtml = await AutentiqueClientService.generateAgreementHtml(agreementData);
    
    // Create document in Autentique
    const documentId = await AutentiqueClientService.createDocument(
      `Visa Application Agreement - ${mainApplicant?.firstName || 'Unknown'} ${mainApplicant?.lastName || 'User'}`,
      agreementHtml,
      `${mainApplicant?.firstName || 'Unknown'} ${mainApplicant?.lastName || 'User'}`,
      mainApplicant?.email || 'unknown@example.com'
    );
    
    if (!documentId) {
      console.error('Failed to create document in Autentique');
      return Promise.resolve(application);
    }
    
    // Update the application with legal agreement details
    const updatedApplication = { ...application };
    updatedApplication.status = ApplicationStatus.WAITING_SIGNATURES;
    updatedApplication.updatedAt = new Date();
    updatedApplication.legalAgreementDocumentId = documentId;
    updatedApplication.legalAgreementSignatureDate = agreementData.signatureDate;
    updatedApplication.legalAgreementSignatureLocation = agreementData.signatureLocation;
    updatedApplication.legalAgreementService = application.legalAgreementService;
    updatedApplication.legalAgreementServiceDescription = agreementData.serviceDescription;
    updatedApplication.legalAgreementValue = agreementData.serviceValue;
    
    // Get the signed document URL
    const signedUrl = await AutentiqueClientService.getSignedDocumentUrl(documentId);
    if (signedUrl) {
      updatedApplication.legalAgreementSignedUrl = signedUrl;
    }
    
    // Update in mock data
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }
}