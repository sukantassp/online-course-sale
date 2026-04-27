import { User, Course, Review, Payment, LiveSession, Order } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@eduverse.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'Platform administrator',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'instructor1@eduverse.com',
    name: 'Sarah Johnson',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Full-stack developer with 10+ years of experience. Passionate about teaching modern web technologies.',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'instructor2@eduverse.com',
    name: 'Michael Chen',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Data science expert and AI researcher. Previously at Google and Microsoft.',
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-4',
    email: 'student1@eduverse.com',
    name: 'John Doe',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'user-5',
    email: 'student2@eduverse.com',
    name: 'Emily Davis',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete Next.js 14 Masterclass',
    description: 'Master Next.js 14 from scratch. Learn App Router, Server Components, API routes, authentication, and deployment. Build real-world projects including a full-stack e-commerce platform.',
    shortDescription: 'Master Next.js 14 with real-world projects',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
    price: 89.99,
    category: 'Web Development',
    level: 'intermediate',
    rating: 4.8,
    reviewCount: 234,
    studentCount: 1520,
    instructorId: 'user-2',
    instructor: mockUsers[1],
    modules: [
      {
        id: 'mod-1',
        title: 'Getting Started with Next.js 14',
        description: 'Introduction to Next.js 14 and App Router',
        lessons: [
          { id: 'les-1', title: 'Course Introduction', description: 'Overview of what you will learn', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 5, isPreview: true },
          { id: 'les-2', title: 'Setting Up Your Environment', description: 'Install Node.js, VS Code, and create your first app', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 15, isPreview: true },
          { id: 'les-3', title: 'Understanding App Router', description: 'Deep dive into Next.js 14 App Router', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 25, isPreview: false },
        ],
      },
      {
        id: 'mod-2',
        title: 'Server Components & Data Fetching',
        description: 'Learn Server Components and data fetching patterns',
        lessons: [
          { id: 'les-4', title: 'Server vs Client Components', description: 'When to use each type', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 20, isPreview: false },
          { id: 'les-5', title: 'Data Fetching with fetch()', description: 'Modern data fetching in Next.js', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 30, isPreview: false },
        ],
      },
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Web Development'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'course-2',
    title: 'Python for Data Science & Machine Learning',
    description: 'Complete Python course for data science. Learn Python fundamentals, NumPy, Pandas, Matplotlib, and machine learning with scikit-learn. Build predictive models with real datasets.',
    shortDescription: 'From Python basics to ML models',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    price: 79.99,
    category: 'Data Science',
    level: 'beginner',
    rating: 4.9,
    reviewCount: 456,
    studentCount: 2340,
    instructorId: 'user-3',
    instructor: mockUsers[2],
    modules: [
      {
        id: 'mod-3',
        title: 'Python Fundamentals',
        description: 'Basic Python programming',
        lessons: [
          { id: 'les-6', title: 'Introduction to Python', description: 'Why Python for data science', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 10, isPreview: true },
          { id: 'les-7', title: 'Variables and Data Types', description: 'Python basics', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 20, isPreview: true },
        ],
      },
    ],
    tags: ['Python', 'Machine Learning', 'Data Science', 'AI'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'course-3',
    title: 'React Native Mobile App Development',
    description: 'Build cross-platform mobile apps with React Native. Learn to create iOS and Android apps from scratch. Includes Firebase integration, navigation, and app store deployment.',
    shortDescription: 'Build iOS & Android apps with React Native',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    price: 69.99,
    category: 'Mobile Development',
    level: 'intermediate',
    rating: 4.7,
    reviewCount: 189,
    studentCount: 980,
    instructorId: 'user-2',
    instructor: mockUsers[1],
    modules: [
      {
        id: 'mod-4',
        title: 'React Native Basics',
        description: 'Introduction to React Native',
        lessons: [
          { id: 'les-8', title: 'Setting Up React Native', description: 'Environment setup guide', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 15, isPreview: true },
        ],
      },
    ],
    tags: ['React Native', 'Mobile', 'iOS', 'Android'],
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn professional UI/UX design. Master Figma, design systems, prototyping, and user research. Create stunning interfaces for web and mobile applications.',
    shortDescription: 'Master UI/UX design with Figma',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    price: 59.99,
    category: 'Design',
    level: 'beginner',
    rating: 4.6,
    reviewCount: 312,
    studentCount: 1650,
    instructorId: 'user-2',
    instructor: mockUsers[1],
    modules: [
      {
        id: 'mod-5',
        title: 'Design Principles',
        description: 'Core design principles',
        lessons: [
          { id: 'les-9', title: 'Introduction to UI Design', description: 'What is UI design?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 10, isPreview: true },
        ],
      },
    ],
    tags: ['UI Design', 'UX Design', 'Figma', 'Design'],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'course-5',
    title: 'DevOps & Cloud Engineering',
    description: 'Master DevOps practices with AWS, Docker, Kubernetes, and CI/CD pipelines. Learn infrastructure as code, monitoring, and cloud architecture.',
    shortDescription: 'Complete DevOps with AWS & Kubernetes',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
    price: 99.99,
    category: 'DevOps',
    level: 'advanced',
    rating: 4.9,
    reviewCount: 178,
    studentCount: 890,
    instructorId: 'user-3',
    instructor: mockUsers[2],
    modules: [
      {
        id: 'mod-6',
        title: 'Cloud Fundamentals',
        description: 'Introduction to cloud computing',
        lessons: [
          { id: 'les-10', title: 'Cloud Computing Overview', description: 'What is cloud computing?', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 12, isPreview: true },
        ],
      },
    ],
    tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-03-18T00:00:00Z',
  },
  {
    id: 'course-6',
    title: 'JavaScript Advanced Concepts',
    description: 'Deep dive into advanced JavaScript. Master closures, prototypes, async/await, design patterns, and performance optimization.',
    shortDescription: 'Advanced JavaScript for experienced devs',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    price: 49.99,
    category: 'Web Development',
    level: 'advanced',
    rating: 4.5,
    reviewCount: 267,
    studentCount: 1230,
    instructorId: 'user-2',
    instructor: mockUsers[1],
    modules: [
      {
        id: 'mod-7',
        title: 'Advanced Functions',
        description: 'Master JavaScript functions',
        lessons: [
          { id: 'les-11', title: 'Closures Deep Dive', description: 'Understanding closures', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: 18, isPreview: true },
        ],
      },
    ],
    tags: ['JavaScript', 'ES6+', 'Web Development'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-28T00:00:00Z',
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    courseId: 'course-1',
    userId: 'user-4',
    user: mockUsers[3],
    rating: 5,
    comment: 'Excellent course! Sarah explains everything so clearly. The projects are practical and I landed a job after completing it.',
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'review-2',
    courseId: 'course-1',
    userId: 'user-5',
    user: mockUsers[4],
    rating: 4,
    comment: 'Great content overall. Would love more advanced topics in future updates.',
    createdAt: '2024-03-12T00:00:00Z',
  },
  {
    id: 'review-3',
    courseId: 'course-2',
    userId: 'user-4',
    user: mockUsers[3],
    rating: 5,
    comment: 'Michael is an amazing instructor. The ML section is particularly well-explained.',
    createdAt: '2024-03-15T00:00:00Z',
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'payment-1',
    userId: 'user-4',
    courseId: 'course-1',
    amount: 89.99,
    status: 'completed',
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'payment-2',
    userId: 'user-5',
    courseId: 'course-2',
    amount: 79.99,
    status: 'completed',
    createdAt: '2024-03-08T00:00:00Z',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-4',
    courseId: 'course-1',
    course: mockCourses[0],
    amount: 89.99,
    status: 'completed',
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'order-2',
    userId: 'user-5',
    courseId: 'course-2',
    course: mockCourses[1],
    amount: 79.99,
    status: 'completed',
    createdAt: '2024-03-08T00:00:00Z',
  },
];

// Mock Live Sessions
export const mockLiveSessions: LiveSession[] = [
  {
    id: 'session-1',
    courseId: 'course-1',
    instructorId: 'user-2',
    title: 'Next.js Q&A Session',
    description: 'Live Q&A session for Next.js course students. Ask your questions live!',
    scheduledAt: '2024-03-25T19:00:00Z',
    duration: 60,
    status: 'scheduled',
    participants: ['user-4', 'user-5'],
  },
  {
    id: 'session-2',
    courseId: 'course-2',
    instructorId: 'user-3',
    title: 'Python ML Workshop',
    description: 'Hands-on machine learning workshop with real datasets.',
    scheduledAt: '2024-03-28T18:00:00Z',
    duration: 90,
    status: 'scheduled',
    participants: ['user-4'],
  },
];

// Categories
export const categories = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'DevOps',
  'Design',
  'Business',
  'Marketing',
];

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getReviewsByCourseId = (courseId: string): Review[] => {
  return mockReviews.filter(review => review.courseId === courseId);
};

export const getInstructorCourses = (instructorId: string): Course[] => {
  return mockCourses.filter(course => course.instructorId === instructorId);
};

export const getStudentOrders = (userId: string): Order[] => {
  return mockOrders.filter(order => order.userId === userId);
};

export const searchCourses = (query: string): Course[] => {
  const lowerQuery = query.toLowerCase();
  return mockCourses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterCourses = (filters: {
  category?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}): Course[] => {
  return mockCourses.filter(course => {
    if (filters.category && course.category !== filters.category) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.minPrice && course.price < filters.minPrice) return false;
    if (filters.maxPrice && course.price > filters.maxPrice) return false;
    if (filters.minRating && course.rating < filters.minRating) return false;
    return true;
  });
};