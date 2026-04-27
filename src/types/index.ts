// User Roles
export type UserRole = 'admin' | 'instructor' | 'student';

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

// Course Interfaces
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  isPreview: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewCount: number;
  studentCount: number;
  instructorId: string;
  instructor?: User;
  modules: Module[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Review Interface
export interface Review {
  id: string;
  courseId: string;
  userId: string;
  user?: User;
  rating: number;
  comment: string;
  createdAt: string;
}

// Chat Interfaces
export interface Message {
  id: string;
  courseId?: string;
  senderId: string;
  sender?: User;
  receiverId?: string;
  content: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  courseId: string;
  participants: string[];
  messages: Message[];
}

// Payment Interfaces
export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  courseId: string;
  course?: Course;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Live Session Interfaces
export interface LiveSession {
  id: string;
  courseId: string;
  instructorId: string;
  title: string;
  description: string;
  scheduledAt: string;
  duration: number;
  status: 'scheduled' | 'live' | 'ended';
  participants: string[];
}

// Dashboard Stats
export interface StudentStats {
  enrolledCourses: number;
  completedCourses: number;
  totalProgress: number;
}

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  pendingPayments: number;
}

export interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

// Feature Toggle Types
export interface FeatureFlags {
  enableChat: boolean;
  enableVideo: boolean;
  enablePayment: boolean;
  enableReviews: boolean;
  enableSearch: boolean;
  enableLiveSession: boolean;
  enableDashboard: boolean;
}

// Filter Types
export interface CourseFilters {
  category?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
}