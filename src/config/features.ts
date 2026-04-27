import { FeatureFlags } from '@/types';

/**
 * Feature Toggle Configuration
 * 
 * This config-driven architecture allows you to enable/disable
 * features globally without affecting the application's core functionality.
 * 
 * Set any feature to false to disable it - the system will gracefully
 * handle the missing feature without breaking.
 */
export const features: FeatureFlags = {
  /** Enable real-time chat system */
  enableChat: true,
  
  /** Enable live video/meeting sessions */
  enableVideo: true,
  
  /** Enable payment and purchase system */
  enablePayment: true,
  
  /** Enable course review and rating system */
  enableReviews: true,
  
  /** Enable search and filter functionality */
  enableSearch: true,
  
  /** Enable live session scheduling */
  enableLiveSession: true,
  
  /** Enable role-based dashboards */
  enableDashboard: true,
};

/**
 * Helper function to check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  return features[feature] ?? false;
};

/**
 * Get all enabled features as an array
 */
export const getEnabledFeatures = (): string[] => {
  return Object.entries(features)
    .filter(([_, enabled]) => enabled)
    .map(([name]) => name);
};

/**
 * Get feature description for UI
 */
export const featureDescriptions: Record<keyof FeatureFlags, string> = {
  enableChat: 'Real-time chat with instructors and course discussions',
  enableVideo: 'Live video sessions and video course content',
  enablePayment: 'Course purchase and payment system',
  enableReviews: 'Course ratings and reviews',
  enableSearch: 'Search and filter courses',
  enableLiveSession: 'Schedule and join live sessions',
  enableDashboard: 'Role-based dashboards for students, instructors, and admins',
};

export default features;