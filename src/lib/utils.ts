import { User, Course, CourseFilters } from '@/types';
import { mockCourses, mockUsers, mockOrders } from '@/data/mock';

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format relative time
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

/**
 * Truncate text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Calculate average rating
 */
export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true, message: 'Password is valid' };
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Filter and search courses
 */
export const filterAndSearchCourses = (courses: Course[], filters: CourseFilters): Course[] => {
  let result = [...courses];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filters.category) {
    result = result.filter(course => course.category === filters.category);
  }

  if (filters.level) {
    result = result.filter(course => course.level === filters.level);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter(course => course.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter(course => course.price <= filters.maxPrice!);
  }

  if (filters.minRating) {
    result = result.filter(course => course.rating >= filters.minRating!);
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        result.sort((a, b) => b.studentCount - a.studentCount);
        break;
    }
  }

  return result;
};

/**
 * Get user from localStorage
 */
export const getStoredUser = (): { user: User; token: string } | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('eduverse_user');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Store user in localStorage
 */
export const storeUser = (user: User, token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('eduverse_user', JSON.stringify({ user, token }));
};

/**
 * Remove user from localStorage
 */
export const removeStoredUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('eduverse_user');
};

/**
 * Check if user is enrolled in course
 */
export const isUserEnrolled = (userId: string, courseId: string): boolean => {
  const orders = mockOrders.filter(order => order.userId === userId && order.courseId === courseId);
  return orders.length > 0;
};

/**
 * Get total course duration in minutes
 */
export const getCourseDuration = (course: Course): number => {
  return course.modules.reduce((total, module) => {
    return total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0);
  }, 0);
};

/**
 * Format duration in human readable format
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};

/**
 * Get star rating display
 */
export const getStarRating = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
};

/**
 * Class name helper
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};