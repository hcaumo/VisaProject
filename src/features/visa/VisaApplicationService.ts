import { v4 as uuidv4 } from 'uuid';
import { ApplicationStatus, VisaApplication, VisaType, emptyApplicant } from '@/models/VisaApplication';

// Create empty applicants array for mock data
const createEmptyApplicants = (count: number) => {
  return Array(count).fill(0).map(() => ({ ...emptyApplicant }));
};

// Mock data for visa applications
const mockApplications: VisaApplication[] = [
  {
    id: uuidv4(),
    status: ApplicationStatus.PENDING,
    createdAt: new Date(2025, 2, 1),
    updatedAt: new Date(2025, 2, 1),
    visaType: VisaType.TOURIST,
    applicantCount: 2,
    applicants: createEmptyApplicants(2),
    plannedArrivalDate: '2025-07-15',
    plannedDepartureDate: '2025-07-30',
    accommodationAddress: 'Hotel Example, 123 Main St, Example City',
  },
  {
    id: uuidv4(),
    status: ApplicationStatus.APPROVED,
    createdAt: new Date(2025, 1, 15),
    updatedAt: new Date(2025, 1, 28),
    visaType: VisaType.BUSINESS,
    applicantCount: 1,
    applicants: createEmptyApplicants(1),
    plannedArrivalDate: '2025-06-10',
    plannedDepartureDate: '2025-06-20',
    accommodationAddress: 'Business Hotel, 456 Commerce Ave, Business District',
  },
  {
    id: uuidv4(),
    status: ApplicationStatus.DENIED,
    createdAt: new Date(2025, 0, 5),
    updatedAt: new Date(2025, 0, 20),
    visaType: VisaType.STUDENT,
    applicantCount: 1,
    applicants: createEmptyApplicants(1),
    plannedArrivalDate: '2025-03-01',
    plannedDepartureDate: '2025-09-01',
    accommodationAddress: 'Student Housing, 789 University Blvd, College Town',
  },
  {
    id: uuidv4(),
    status: ApplicationStatus.DRAFT,
    createdAt: new Date(2025, 2, 10),
    updatedAt: new Date(2025, 2, 10),
    visaType: VisaType.FAMILY,
    applicantCount: 4,
    applicants: createEmptyApplicants(4),
    plannedArrivalDate: '2025-08-01',
    plannedDepartureDate: '2025-08-30',
    accommodationAddress: 'Family Residence, 101 Residential St, Suburb Area',
  },
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

  // Submit an application (change status from DRAFT to PENDING)
  static submitApplication(id: string): Promise<VisaApplication | undefined> {
    // Find the application first
    const index = mockApplications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return Promise.resolve(undefined);
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