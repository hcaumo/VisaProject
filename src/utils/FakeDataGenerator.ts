import { v4 as uuidv4 } from 'uuid';
import { 
  ApplicationStatus, 
  Applicant, 
  VisaApplication, 
  VisaType 
} from '@/models/VisaApplication';

// Fake data for applicants
const firstNames = [
  'John', 'Jane', 'Michael', 'Emma', 'William', 'Olivia', 'James', 'Sophia',
  'Alexander', 'Isabella', 'Benjamin', 'Mia', 'Daniel', 'Charlotte', 'Matthew',
  'Amelia', 'David', 'Harper', 'Joseph', 'Evelyn', 'Andrew', 'Abigail', 'Joshua',
  'Emily', 'Christopher', 'Elizabeth', 'Nicholas', 'Sofia', 'Ryan', 'Avery'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson',
  'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin',
  'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis',
  'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King'
];

const nationalities = [
  'American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Italian',
  'Spanish', 'Japanese', 'Chinese', 'Indian', 'Brazilian', 'Mexican', 'Russian',
  'South Korean', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Swiss',
  'Portuguese', 'Irish', 'Polish', 'Austrian', 'Belgian', 'Greek', 'Turkish',
  'Argentinian', 'Chilean'
];

const accommodations = [
  'Grand Hotel, 123 Main Street, Downtown',
  'Seaside Resort, 456 Beach Road, Coastal City',
  'Mountain Lodge, 789 Alpine Way, Highland Village',
  'City Apartments, 101 Urban Avenue, Metropolis',
  'Family Residence, 234 Suburban Lane, Residential District',
  'Business Suites, 567 Commerce Boulevard, Financial Center',
  'University Housing, 890 Campus Drive, College Town',
  'Historic Inn, 321 Heritage Street, Old Quarter',
  'Luxury Villas, 654 Exclusive Boulevard, Upscale Neighborhood',
  'Budget Hostel, 987 Backpacker Street, Tourist Area'
];

// Generate a random date between start and end dates
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0] || ''; // Format as YYYY-MM-DD with fallback
};

// Generate a random phone number
const randomPhone = (): string => {
  return `+${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

// Generate a random passport number
const randomPassportNumber = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  const numbers = Math.floor(Math.random() * 9000000) + 1000000;
  return `${letter1}${letter2}${numbers}`;
};

// Generate a random applicant
const generateApplicant = (): Applicant => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)] || 'John';
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)] || 'Doe';
  const nationality = nationalities[Math.floor(Math.random() * nationalities.length)] || 'American';
  
  // Generate dates
  const now = new Date();
  const birthDate = randomDate(new Date(now.getFullYear() - 60, 0, 1), new Date(now.getFullYear() - 18, 0, 1));
  const expiryDate = randomDate(new Date(now.getFullYear() + 1, 0, 1), new Date(now.getFullYear() + 10, 0, 1));
  
  return {
    firstName,
    lastName,
    dateOfBirth: birthDate,
    nationality,
    passportNumber: randomPassportNumber(),
    passportExpiryDate: expiryDate,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    phone: randomPhone(),
    passportScan: undefined, // Can't create File objects in this context
    photoId: undefined, // Can't create File objects in this context
  };
};

// Generate multiple applicants
const generateApplicants = (count: number): Applicant[] => {
  return Array(count).fill(0).map(() => generateApplicant());
};

// Generate a random visa application
export const generateVisaApplication = (status: ApplicationStatus = ApplicationStatus.DRAFT): VisaApplication => {
  // Random visa type
  const visaTypes = Object.values(VisaType);
  const visaType = visaTypes[Math.floor(Math.random() * visaTypes.length)] as VisaType;
  
  // Random applicant count (1-5)
  const applicantCount = Math.floor(Math.random() * 5) + 1;
  
  // Generate dates
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in the last 30 days
  const updatedAt = new Date(createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime()));
  
  // Travel dates (in the future)
  const arrivalDate = randomDate(new Date(now.getFullYear(), now.getMonth() + 1, 1), new Date(now.getFullYear(), now.getMonth() + 6, 1));
  const departureDate = randomDate(new Date(arrivalDate), new Date(new Date(arrivalDate).setMonth(new Date(arrivalDate).getMonth() + 3)));
  
  // Random accommodation
  const accommodation = accommodations[Math.floor(Math.random() * accommodations.length)] || 'Hotel Example, 123 Main St, Example City';
  
  return {
    id: uuidv4(),
    status,
    createdAt,
    updatedAt,
    visaType,
    applicantCount,
    applicants: generateApplicants(applicantCount),
    plannedArrivalDate: arrivalDate,
    plannedDepartureDate: departureDate,
    accommodationAddress: accommodation,
    proofOfAccommodation: undefined, // Can't create File objects in this context
    financialProof: undefined, // Can't create File objects in this context
  };
};

// Generate multiple visa applications
export const generateVisaApplications = (count: number, status: ApplicationStatus = ApplicationStatus.DRAFT): VisaApplication[] => {
  return Array(count).fill(0).map(() => generateVisaApplication(status));
};