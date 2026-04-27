# EduVerse - Online Education & Training Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

> **Interactive Online Learning Platform** - A production-ready SaaS application where students can interact with instructors BEFORE purchasing courses.

---

## 📋 Project Overview

EduVerse is a comprehensive online education platform built with modern technologies. Unlike traditional course platforms (Udemy, Coursera), EduVerse allows students to interact with instructors through real-time chat and live sessions **before** making a purchase decision.

### Problem → Solution → Outcome

| Challenge | Solution | Result |
|------------|----------|--------|
| Students buy courses without knowing teaching style | Pre-purchase chat & live sessions | Informed purchasing decisions |
| No direct communication with instructors | Real-time WebSocket chat | Better student-instructor connection |
| One-size-fits-all course structure | Modular feature toggle system | Customizable platform per client |
| Limited engagement before purchase | Live Q&A sessions & discussion rooms | Higher conversion rates |
| Static course content only | Video lessons + modules + chapters | Comprehensive learning experience |
| No search/filter capabilities | Category, rating, price filtering | Easy course discovery |

### 🎯 Target Users

- **Students**: Browse courses, interact with instructors, purchase and learn
- **Instructors**: Create courses, manage students, host live sessions
- **Admins**: Manage users, view analytics, configure platform

---

## ✨ Unique Features

### 1. Pre-Purchase Interaction System 🎯
- Students can join course-specific chat rooms before buying
- Ask questions directly to instructors
- View live session schedules without enrollment
- Experience teaching style before committing
- **This is the key differentiator** from Udemy/Coursera

### 2. Real-Time Chat System 💬
- WebSocket-powered instant messaging (Socket.io ready)
- Course-specific discussion rooms
- Direct messages between students and instructors
- Online status indicators
- Message history persistence

### 3. Live Video Sessions 📹
- Schedule and join live Q&A sessions
- Preview sessions available before purchase
- Interactive video interface (mock/WebRTC ready)
- Participant tracking and chat
- Session recording capability (mock)

### 4. Config-Driven Feature Toggle ⚙️
```typescript
// src/config/features.ts
export const features = {
  enableChat: true,           // Real-time chat
  enableVideo: true,         // Live video sessions
  enablePayment: true,       // Payment system
  enableReviews: true,      // Course reviews
  enableSearch: true,       // Search & filter
  enableLiveSession: true,  // Live sessions
  enableDashboard: true,    // Role-based dashboards
};
```
Disable any feature - system remains fully functional!

### 5. Role-Based Dashboards 📊
- **Student Dashboard**: Enrolled courses, progress tracking, order history
- **Instructor Dashboard**: Course management, revenue analytics, student list
- **Admin Dashboard**: User management, platform analytics, system settings

### 6. Course Platform 📚
- Course creation with modules and lessons
- Video lesson support (YouTube/private URLs)
- Course preview before purchase
- Category and level filtering
- Rating and review system

### 7. Search & Filter System 🔍
- Search by course name, description, tags
- Filter by category, level, price range
- Sort by rating, price, popularity

### 8. Mock Payment System 💳
- Course purchase flow
- Order history tracking
- Price display and formatting

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.4 |
| **Authentication** | JWT-based |
| **Real-time** | WebSocket (Socket.io ready) |
| **State** | React Context + Hooks |
| **Data** | In-memory mock store |
| **Package Manager** | npm |

### Key Dependencies
- `next`: ^14.2.3 - React framework
- `react`: ^18.3.1 - UI library
- `jsonwebtoken`: ^9.0.2 - JWT handling
- `bcryptjs`: ^2.4.3 - Password hashing
- `socket.io`: ^4.7.5 - WebSocket server
- `socket.io-client`: ^4.7.5 - WebSocket client
- `zustand`: ^4.5.2 - State management

---

## 📁 Folder Structure Explanation

```
eduverse/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (auth)/            # Auth routes group (prefixed)
│   │   │   ├── login/         # Login page
│   │   │   └── signup/         # Signup page
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   └── dashboard/
│   │   │       ├── student/   # Student dashboard
│   │   │       ├── instructor/# Instructor dashboard
│   │   │       └── admin/      # Admin dashboard
│   │   ├── courses/           # Course listing & details
│   │   │   ├── page.tsx       # Course listing
│   │   │   └── [id]/          # Dynamic course detail
│   │   ├── chat/              # Real-time chat page
│   │   ├── live/              # Live sessions
│   │   │   ├── page.tsx       # Sessions list
│   │   │   └── [sessionId]/   # Individual session
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Auth endpoints
│   │   │   └── courses/       # Course CRUD
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.tsx    # Button with variants
│   │   │   ├── Input.tsx     # Form input
│   │   │   ├── Card.tsx      # Content container
│   │   │   ├── Avatar.tsx   # User image
│   │   │   ├── Badge.tsx     # Status label
│   │   │   ├── Modal.tsx     # Dialog overlay
│   │   │   ├── Tabs.tsx      # Tab navigation
│   │   │   ├── Rating.tsx    # Star rating
│   │   │   └── SearchBar.tsx # Search input
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.tsx    # Navigation header
│   │   │   └── Footer.tsx    # Page footer
│   │   └── features/         # Feature components
│   │       └── CourseCard.tsx# Course display card
│   ├── config/
│   │   └── features.ts        # Feature toggle config
│   ├── contexts/
│   │   └── AuthContext.tsx   # Auth state management
│   ├── data/
│   │   └── mock.ts           # Mock data store
│   ├── lib/
│   │   ├── auth.ts           # Auth utilities (JWT)
│   │   └── utils.ts          # Helper functions
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── public/                    # Static assets
├── .env.example               # Environment template
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
├── postcss.config.js          # PostCSS config
├── package.json               # Dependencies
├── README.md                  # This file
└── SPEC.md                    # Project specification
```

### How Each Major Module Works

#### 1. Authentication System (`src/lib/auth.ts`, `src/contexts/AuthContext.tsx`)
- JWT token generation and verification
- Role-based access control (admin/instructor/student)
- Token storage in localStorage
- Demo login for testing

#### 2. Course Platform (`src/app/courses/`, `src/app/api/courses/`)
- Course listing with pagination
- Dynamic course details via `[id]` route
- Module and lesson structure
- Preview lessons available

#### 3. Chat System (`src/app/chat/`)
- Course-specific chat rooms
- Real-time message display
- User presence indicators
- WebSocket integration ready

#### 4. Live Sessions (`src/app/live/`)
- Session scheduling and listing
- Live session viewer with chat
- Status tracking (scheduled/live/completed)

#### 5. Dashboards (`src/app/(dashboard)/`)
- Role-based route protection
- Student: enrolled courses, orders
- Instructor: created courses, revenue
- Admin: platform analytics

#### 6. Feature Toggle (`src/config/features.ts`)
- Centralized feature flags
- Conditional UI rendering
- API route protection
- Graceful degradation

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eduverse.git
cd eduverse

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` file:

```env
# JWT Secret (change in production)
NEXT_PUBLIC_JWT_SECRET=your-secret-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

---

## 🔧 Feature Toggle Guide

All features are modular and can be enabled/disabled via `src/config/features.ts`:

| Feature | Config Key | Description |
|---------|------------|-------------|
| Chat System | `enableChat` | Real-time messaging |
| Video Sessions | `enableVideo` | Live video meetings |
| Payments | `enablePayment` | Course purchases |
| Reviews | `enableReviews` | Ratings & feedback |
| Search | `enableSearch` | Course search & filter |
| Live Sessions | `enableLiveSession` | Scheduled live events |
| Dashboards | `enableDashboard` | Role-based dashboards |

### Disabling a Feature

```typescript
// src/config/features.ts
export const features = {
  enableChat: false,  // Disable chat - system still works!
  enableVideo: true,
  // ...other features
};
```

When disabled:
- Related UI components are hidden
- API routes return appropriate messages
- Navigation items are removed
- System remains fully functional

---

## 📱 Pages & Routes

### Public Routes
| Path | Description |
|------|-------------|
| `/` | Landing page with hero, features, courses |
| `/courses` | Course listing with filters |
| `/courses/[id]` | Course details, curriculum, reviews |
| `/login` | User login |
| `/signup` | User registration |

### Protected Routes (Require Auth)
| Path | Description |
|------|-------------|
| `/dashboard` | Role-based redirect |
| `/dashboard/student` | Student dashboard |
| `/dashboard/instructor` | Instructor dashboard |
| `/dashboard/admin` | Admin dashboard |
| `/chat` | Community chat |
| `/live` | Live sessions list |
| `/live/[sessionId]` | Live session viewer |

---

## 🔐 Authentication

### Demo Login
Use any email containing the role keyword:
- `admin@...` → Admin role
- `instructor@...` → Instructor role  
- `student@...` → Student role

Or use the demo buttons on the login page.

### JWT Structure
```json
{
  "userId": "user-1",
  "email": "admin@eduverse.com",
  "role": "admin",
  "exp": "2024-12-31T23:59:59Z"
}
```

---

## 🎨 UI/UX Features

### Design System
- **Primary Color**: #4F46E5 (Indigo)
- **Accent Color**: #10B981 (Emerald)
- **Font**: Inter (system-ui fallback)
- **Border Radius**: 8px (cards), 6px (buttons)

### Components
- Reusable UI component library
- Consistent spacing and typography
- Responsive design (mobile-first)
- Hover states and transitions
- Loading states

### Responsive Breakpoints
| Breakpoint | Width |
|------------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

---

## 📸 Screenshots Placeholders

```
├── public/
│   └── screenshots/
│       ├── home-page.png        # Landing page
│       ├── courses-page.png     # Course listing
│       ├── course-detail.png    # Course details
│       ├── chat-page.png        # Chat interface
│       ├── live-session.png     # Live session
│       ├── student-dashboard.png
│       ├── instructor-dashboard.png
│       └── admin-dashboard.png
```

Add your screenshots to the `public/screenshots/` folder and reference them:

```markdown
![Home Page](./public/screenshots/home-page.png)
```

---

## 🛤️ Future Improvements / Roadmap

### Phase 2: Enhanced Features
- [ ] **Database Integration**: Connect to PostgreSQL/MySQL
- [ ] **Real WebSocket**: Full Socket.io implementation
- [ ] **Video Hosting**: Integrate with Mux or Vimeo
- [ ] **Payment Gateway**: Stripe/PayPal integration
- [ ] **Email Notifications**: SendGrid integration

### Phase 3: Advanced Features
- [ ] **AI Chatbot**: Course recommendation engine
- [ ] **Progress Tracking**: Detailed learning analytics
- [ ] **Certificates**: Auto-generated completion certs
- [ ] **Discussion Forums**: Threaded discussions
- [ ] **Mobile App**: React Native companion app

### Phase 4: Scale & Optimize
- [ ] **Caching**: Redis integration
- [ ] **CDN**: CloudFront/Cloudflare
- [ ] **Microservices**: Split into services
- [ ] **Multi-tenancy**: SaaS for organizations
- [ ] **Internationalization**: i18n support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Unsplash](https://unsplash.com/) - Images
- [Lucide Icons](https://lucide.dev/) - Icons

---

## 📞 Support

For support and questions, please open an issue on GitHub.

---

<p align="center">Built with ❤️ using Next.js + TypeScript + Tailwind CSS</p>

### Disabling a Feature

```typescript
// src/config/features.ts
export const features = {
  enableChat: false,  // Disable chat - system still works!
  enableVideo: true,
  // ...other features
};
```

When disabled:
- Related UI components are hidden
- API routes return appropriate messages
- Navigation items are removed
- System remains fully functional

---

## 📱 Pages & Routes

### Public Routes
| Path | Description |
|------|-------------|
| `/` | Landing page with hero, features, courses |
| `/courses` | Course listing with filters |
| `/courses/[id]` | Course details, curriculum, reviews |
| `/login` | User login |
| `/signup` | User registration |

### Protected Routes (Require Auth)
| Path | Description |
|------|-------------|
| `/dashboard` | Role-based redirect |
| `/dashboard/student` | Student dashboard |
| `/dashboard/instructor` | Instructor dashboard |
| `/dashboard/admin` | Admin dashboard |
| `/chat` | Community chat |
| `/live` | Live sessions list |
| `/live/[sessionId]` | Live session viewer |

---

## 🔐 Authentication

### Demo Login
Use any email containing the role keyword:
- `admin@...` → Admin role
- `instructor@...` → Instructor role  
- `student@...` → Student role

Or use the demo buttons on the login page.

### JWT Structure
```json
{
  "userId": "user-1",
  "email": "admin@eduverse.com",
  "role": "admin",
  "exp": "2024-12-31T23:59:59Z"
}
```

---

## 🎨 UI/UX Features

### Design System
- **Colors**: Indigo primary, Slate secondary, Emerald accent
- **Typography**: Inter font family
- **Spacing**: 4px base unit scale
- **Components**: Fully accessible, keyboard navigable

### Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

---

## 📸 Screenshots Placeholder

```
┌─────────────────────────────────────────┐
│           EDUVERSE LANDING              │
│  ┌─────────────────────────────────┐    │
│  │ 🎓 Learn Without Buying First    │    │
│  │                                 │    │
│  │ [Explore Courses] [Become Inst] │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Pre-    │ │ Real-   │ │ Live    │   │
│  │ Purchase│ │ time    │ │ Video   │   │
│  │ Chat    │ │ Chat    │ │ Sessions│   │
│  └─────────┘ └─────────┘ └─────────┘   │
└─────────────────────────────────────────┘
```

---

## 🔜 Future Improvements

- [ ] PostgreSQL database integration
- [ ] Real WebSocket implementation with Socket.io
- [ ] Video streaming with HLS.js
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Progress tracking & certificates
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered course recommendations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Unsplash](https://unsplash.com/) - Images
- [UI Avatars](https://ui-avatars.com/) - Avatar generation

---

<p align="center">Built with ❤️ using Next.js 14 & TypeScript</p>