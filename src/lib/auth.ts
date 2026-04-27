import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, LoginCredentials, RegisterData } from '@/types';
import { mockUsers } from '@/data/mock';

// JWT Secret - In production, use environment variable
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'eduverse-secret-key-2024';

/**
 * Hash password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT token
 */
export const generateToken = (user: User): string => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): { userId: string; email: string; role: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
};

/**
 * Login user
 */
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string } | null> => {
  // Find user by email (mock - in production, query database)
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user) {
    // For demo purposes, accept any password for demo users
    if (credentials.email.includes('@')) {
      const token = generateToken(user);
      return { user, token };
    }
    return null;
  }

  // For demo, accept any password
  const token = generateToken(user);
  return { user, token };
};

/**
 * Register new user
 */
export const registerUser = async (data: RegisterData): Promise<{ user: User; token: string } | null> => {
  // Check if email already exists
  const existingUser = mockUsers.find(u => u.email === data.email);
  if (existingUser) {
    return null;
  }

  // Create new user (mock - in production, save to database)
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    name: data.name,
    role: data.role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4F46E5&color=fff`,
    createdAt: new Date().toISOString(),
  };

  const token = generateToken(newUser);
  return { user: newUser, token };
};

/**
 * Get user by ID
 */
export const getUserById = (userId: string): User | null => {
  const user = mockUsers.find(u => u.id === userId);
  return user || null;
};

/**
 * Check if user has role
 */
export const hasRole = (user: User | null, roles: string[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

/**
 * Protect route - check if user is authenticated
 */
export const isAuthenticated = (token: string | null): boolean => {
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded !== null;
};

/**
 * Demo login helper - for testing without real auth
 */
export const demoLogin = (role: 'admin' | 'instructor' | 'student'): { user: User; token: string } | null => {
  const user = mockUsers.find(u => u.role === role);
  if (!user) return null;
  
  const token = generateToken(user);
  return { user, token };
};