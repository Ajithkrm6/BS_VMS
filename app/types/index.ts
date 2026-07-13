// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Talent & Vendor types
export interface TalentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: number;
  location: string;
  status: 'available' | 'bench' | 'assigned' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  capacity: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: string;
}

// Job Posting types
export interface JobPosting {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  talentId?: string;
  vendorId?: string;
  status: 'open' | 'filled' | 'closed';
  createdAt: string;
  updatedAt: string;
}
