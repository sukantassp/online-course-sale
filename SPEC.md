# EduVerse - Online Education & Training Platform

## Project Overview

**Project Name:** EduVerse  
**Type:** Full-stack SaaS Web Application  
**Core Functionality:** An interactive online education platform where students can interact with instructors BEFORE purchasing courses, featuring real-time chat, live video sessions, and a modular feature toggle system.  
**Target Users:** Students seeking online courses, Instructors creating/selling courses, Administrators managing the platform

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Real-time | WebSocket (Socket.io) |
| Database | In-memory store (mock) / PostgreSQL-ready |
| Auth | JWT-based authentication |
| State | React Context + Hooks |

---

## UI/UX Specification

### Color Palette

| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Deep Indigo | `#4F46E5` |
| Primary Hover | Indigo 700 | `#4338CA` |
| Secondary | Slate | `#64748B` |
| Accent | Emerald | `#10B981` |
| Accent Secondary | Amber | `#F59E0B` |
| Background | White | `#FFFFFF` |
| Background Alt | Slate 50 | `#F8FAFC` |
| Surface | White | `#FFFFFF` |
| Border | Slate 200 | `#E2E8F0` |
| Text Primary | Slate 900 | `#0F172A` |
| Text Secondary | Slate 600 | `#475569` |
| Text Muted | Slate 400 | `#94A3B8` |
| Error | Red 500 | `#EF4444` |
| Success | Green 500 | `#22C55E` |
| Warning | Amber 500 | `#F59E0B` |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Inter | 36px | 700 |
| H2 | Inter | 30px | 700 |
| H3 | Inter | 24px | 600 |
| H4 | Inter | 20px | 600 |
| Body | Inter | 16px | 400 |
| Body Small | Inter | 14px | 400 |
| Caption | Inter | 12px | 500 |

### Spacing System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px
- Container max-width: 1280px
- Section padding: 64px vertical, 24px horizontal

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Extra large |

### Visual Effects

- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Shadows: 
  - sm: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
  - md: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
  - lg: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- Transitions: 150ms ease-in-out
- Hover effects: scale(1.02), background-color shift

---

## Feature Specification

### 1. Feature Toggle System (Config-Driven)

```typescript
// config/features.ts
export const features = {
  enableChat: true,
  enableVideo: true,
  enablePayment: true,
  enableReviews: true,
  enableSearch: true,
  enableLiveSession: true,
  enableDashboard: true,
};
```

All features must be modular and the system should work even if features are turned OFF.

### 2. Authentication System

| Feature | Description |
|---------|-------------|
| JWT Auth | Token-based authentication with expiry |
| Roles | Admin, Instructor, Student |
| Login | Email/password with remember me |
| Signup | Email, password, name, role selection |
| Protected Routes | Middleware for route protection |
| Session | HTTP-only cookies for security |

### 3. Course Platform

| Feature | Description |
|---------|-------------|
| Course Creation | Instructor creates courses with title, description, price, thumbnail |
| Course Modules | Organize courses into modules/chapters |
| Video Lessons | Support YouTube URLs, direct video links |
| Course Preview | Free preview lessons before purchase |
| Course Listing | Grid view with filters |
| Course Details | Full course page with curriculum |

### 4. Pre-Purchase Interaction (Unique Feature)

| Feature | Description |
|---------|-------------|
| Live Discussion Room | Students can join before purchase |
| Ask Questions | Submit questions to instructor |
| Instructor Response | Live or async responses |
| Limited Access | Preview access without purchase |

### 5. Real-time Chat System

| Feature | Description |
|---------|-------------|
| WebSocket | Socket.io based real-time messaging |
| Course Chat Rooms | Course-specific chat |
| Direct Messages | Student to instructor chat |
| Online Status | Show online/offline users |
| Message History | Store and display chat history |

### 6. Live Video/Meeting System

| Feature | Description |
|---------|-------------|
| Video Sessions | Create/join video sessions |
| Pre-purchase Access | Limited access for non-students |
| Screen Share | Basic screen sharing |
| Participant List | View participants in session |

### 7. Dashboard System

| Feature | Description |
|---------|-------------|
| Student Dashboard | Enrolled courses, progress, certificates |
| Instructor Dashboard | My courses, revenue, student count |
| Admin Dashboard | User management, platform analytics |

### 8. Payment System (Mock)

| Feature | Description |
|---------|-------------|
| Purchase Course | Mock payment flow |
| Order History | View past purchases |
| Revenue Tracking | Instructor earnings |

### 9. Search & Filter

| Feature | Description |
|---------|-------------|
| Category Filter | Filter by category |
| Price Range | Filter by price |
| Rating Filter | Filter by rating |
| Search | Full-text search |

### 10. Review System

| Feature | Description |
|---------|-------------|
| Star Ratings | 1-5 star ratings |
| Written Reviews | Text reviews with validation |
| Average Rating | Display course rating |
| Instructor Feedback | Respond to reviews |

---

## Page Structure

### Public Pages
- `/` - Landing page
- `/courses` - Course listing
- `/courses/[id]` - Course details
- `/instructors/[id]` - Instructor profile

### Auth Pages
- `/login` - Login page
- `/signup` - Signup page

### Dashboard Pages (Protected)
- `/dashboard` - Role-based dashboard
- `/dashboard/student` - Student dashboard
- `/dashboard/instructor` - Instructor dashboard
- `/dashboard/admin` - Admin dashboard

### Course Management (Instructor)
- `/instructor/courses` - My courses
- `/instructor/courses/create` - Create course
- `/instructor/courses/[id]/edit` - Edit course

### Interactive Features
- `/chat` - Chat rooms
- `/live/[sessionId]` - Live video sessions

---

## API Structure

### Auth APIs
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Course APIs
- `GET /api/courses` - List courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/courses` - Create course (Instructor)
- `PUT /api/courses/[id]` - Update course (Instructor)
- `DELETE /api/courses/[id]` - Delete course (Instructor)

### Chat APIs
- `GET /api/chat/[courseId]` - Get chat messages
- `POST /api/chat` - Send message

### Payment APIs
- `POST /api/payments/purchase` - Purchase course
- `GET /api/payments/history` - Order history

### Review APIs
- `GET /api/reviews/[courseId]` - Get course reviews
- `POST /api/reviews` - Add review

---

## Component Library

### Layout Components
- `Navbar` - Main navigation
- `Sidebar` - Dashboard sidebar
- `Footer` - Site footer
- `Container` - Max-width wrapper

### UI Components
- `Button` - Primary, secondary, outline variants
- `Input` - Text, email, password inputs
- `Card` - Content card component
- `Badge` - Status badges
- `Avatar` - User avatar
- `Modal` - Dialog modal
- `Dropdown` - Dropdown menu
- `Tabs` - Tab navigation
- `Toast` - Notification toasts

### Feature Components
- `CourseCard` - Course preview card
- `VideoPlayer` - Video embed component
- `ChatWindow` - Chat interface
- `ReviewCard` - Review display
- `Rating` - Star rating input
- `SearchBar` - Search input
- `FilterPanel` - Filter sidebar

---

## Acceptance Criteria

### Must Have
- [ ] Feature toggle system works for all features
- [ ] Authentication with 3 roles works
- [ ] Course CRUD operations functional
- [ ] Pre-purchase interaction available
- [ ] Real-time chat functional
- [ ] Dashboard shows role-specific data
- [ ] Search and filter works
- [ ] Reviews can be added/viewed
- [ ] Responsive on all breakpoints

### Should Have
- [ ] Live video session mock
- [ ] Payment mock flow
- [ ] Order history

### Nice to Have
- [ ] Certificate generation
- [ ] Progress tracking
- [ ] Analytics dashboard

---

## Folder Structure

```
/online-education-platform
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes group
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/       # Dashboard routes
│   │   │   ├── student/
│   │   │   ├── instructor/
│   │   │   └── admin/
│   │   ├── courses/           # Course pages
│   │   ├── chat/              # Chat pages
│   │   ├── live/              # Live session pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature components
│   ├── config/                # Configuration
│   │   └── features.ts        # Feature toggle config
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ChatContext.tsx
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities
│   │   ├── auth.ts            # Auth utilities
│   │   ├── api.ts             # API client
│   │   └── utils.ts           # Helper functions
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   └── data/                  # Mock data
│       └── mock.ts
├── public/                    # Static assets
├── .env.example               # Environment template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Implementation Priority

1. **Phase 1:** Project setup, config system, auth
2. **Phase 2:** Course platform, UI components
3. **Phase 3:** Chat system, pre-purchase interaction
4. **Phase 4:** Dashboard, search, reviews
5. **Phase 5:** Payment mock, live sessions
6. **Phase 6:** Polish, README, documentation