/**
 * Job Postings Types
 * Type definitions for opportunities/job postings
 */

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Temporary';
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  requiredSkills: string[];
  experience: string; // e.g., "2-3 years"
  educationRequired: string; // e.g., "Bachelor's Degree"
  postedDate: string; // ISO date
  closingDate: string; // ISO date
  status: 'Active' | 'Closed' | 'Draft';
  applicants: number;
  createdBy: string; // HR Manager ID
  createdAt: string;
  updatedAt: string;
}

export interface JobFilter {
  department?: string;
  employmentType?: string;
  status?: string;
  minSalary?: number;
  maxSalary?: number;
  searchText?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interview' | 'Rejected' | 'Accepted';
  rating?: number;
  notes?: string;
}

export interface OpportunitiesState {
  jobs: JobPosting[];
  filteredJobs: JobPosting[];
  applications: JobApplication[];
  selectedJob: JobPosting | null;
  filters: JobFilter;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}
