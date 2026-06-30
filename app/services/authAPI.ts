import type { LoginPayload, RegisterPayload, AuthResponse, User } from '~/types/auth';

/**
 * Mock Auth API Service
 * Replace with real API calls when backend is ready
 */

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'vendor@test.com': {
    password: 'vendor123',
    user: {
      id: '1',
      email: 'vendor@test.com',
      name: 'John Vendor',
      role: 'vendor',
      company: 'ABC Logistics',
      phone: '+1234567890',
      verified: true,
    },
  },
  'customer@test.com': {
    password: 'customer123',
    user: {
      id: '2',
      email: 'customer@test.com',
      name: 'Jane Customer',
      role: 'customer',
      phone: '+1987654321',
      verified: true,
    },
  },
  'admin@test.com': {
    password: 'admin123',
    user: {
      id: '3',
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'admin',
      verified: true,
    },
  },
};

// Store registered users
let registeredUsers = { ...MOCK_USERS };

/**
 * Login API
 * @param payload - Email and password
 * @returns Auth response with user and token
 */
export async function loginAPI(payload: LoginPayload): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { email, password } = payload;

  // Validate input
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Find user
  const userRecord = registeredUsers[email.toLowerCase()];
  if (!userRecord) {
    throw new Error('User not found');
  }

  // Verify password
  if (userRecord.password !== password) {
    throw new Error('Invalid password');
  }

  // Generate mock token (in real app, get from backend)
  const token = `token_${Date.now()}_${Math.random()}`;

  return {
    user: userRecord.user,
    token,
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours
  };
}

/**
 * Register API
 * @param payload - User registration data
 * @returns Auth response with user and token
 */
export async function registerAPI(payload: RegisterPayload): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { email, password, name, role, company, phone } = payload;

  // Validate input
  if (!email || !password || !name || !role) {
    throw new Error('Email, password, name, and role are required');
  }

  // Check if user already exists
  if (registeredUsers[email.toLowerCase()]) {
    throw new Error('User with this email already exists');
  }

  // Validate password strength
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    email: email.toLowerCase(),
    name,
    role,
    company,
    phone,
    verified: false, // In real app, send verification email
  };

  // Save user
  registeredUsers[email.toLowerCase()] = {
    password,
    user: newUser,
  };

  // Generate mock token
  const token = `token_${Date.now()}_${Math.random()}`;

  return {
    user: newUser,
    token,
    expiresIn: 24 * 60 * 60 * 1000,
  };
}

/**
 * Validate Token API
 * @param token - JWT token to validate
 * @returns User if token is valid
 */
export async function validateTokenAPI(token: string): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!token) {
    throw new Error('No token provided');
  }

  // In mock mode, any token is valid
  // In real app, validate with backend

  // Find user by token (mock implementation)
  // Real app would decode JWT and validate signature
  const user = Object.values(registeredUsers).find(
    (record) => record.user.id === token.substring(0, 10)
  );

  if (!user) {
    throw new Error('Invalid token');
  }

  return user.user;
}

/**
 * Logout API
 * @param token - Token to invalidate
 */
export async function logoutAPI(token: string): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // In mock mode, just return success
  // In real app, invalidate token on backend
  console.log('Logout successful for token:', token);
}

/**
 * Get current user (validate existing session)
 */
export async function getCurrentUserAPI(token: string): Promise<User> {
  return validateTokenAPI(token);
}
