// User roles in the system
export type UserRole = 'vendor' | 'customer' | 'admin';

// User object
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
  verified: boolean;
}

// Auth state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Register payload
export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
  phone?: string;
}

// API response
export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}
