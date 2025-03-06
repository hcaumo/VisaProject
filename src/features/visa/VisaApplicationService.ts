import { v4 as uuidv4 } from 'uuid';
import { ApplicationStatus, VisaApplication, VisaType, emptyApplicant } from '@/models/VisaApplication';
import { generateVisaApplication, generateVisaApplications } from '@/utils/FakeDataGenerator';

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
    };
    
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
    
    const updatedApplication: VisaApplication = {
      ...mockApplications[index],
      ...updates,
      updatedAt: new Date(),
    };
    
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
    const updatedApplication = { ...mockApplications[index] };
    updatedApplication.status = ApplicationStatus.WAITING_PAYMENT;
    updatedApplication.updatedAt = new Date();
    
    // Update in mock data
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }

  // Complete payment for an application (change status from WAITING_PAYMENT to PENDING)
  static completePayment(id: string): Promise<VisaApplication | undefined> {
    // Find the application first
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    // Only update if the status is WAITING_PAYMENT
    if (mockApplications[index].status !== ApplicationStatus.WAITING_PAYMENT) {
      return Promise.resolve(mockApplications[index]);
    }
    
    // Update the status directly
    const updatedApplication = { ...mockApplications[index] };
    updatedApplication.status = ApplicationStatus.PENDING;
    updatedApplication.updatedAt = new Date();
    
    // Update in mock data
    mockApplications[index] = updatedApplication;
    
    return Promise.resolve(updatedApplication);
  }
}