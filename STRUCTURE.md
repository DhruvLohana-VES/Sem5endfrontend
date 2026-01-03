# Project Structure Visualization

## 📁 Complete Folder Structure

```
CC Frontend/
│
├── 📦 node_modules/              (Created after npm install)
│
├── 📂 public/                    (Static assets - create if needed)
│   └── vite.svg
│
├── 📂 src/                       ⭐ Main application code
│   │
│   ├── 📂 components/            🧩 Reusable UI components
│   │   ├── Layout.jsx            (Main layout wrapper)
│   │   ├── ProtectedRoute.jsx    (Route authentication)
│   │   ├── NotificationDropdown.jsx (Notification bell)
│   │   ├── LoadingSpinner.jsx    (Loading indicator)
│   │   ├── Modal.jsx             (Modal dialog)
│   │   └── ConfirmDialog.jsx     (Confirmation dialogs)
│   │
│   ├── 📂 config/                ⚙️ Configuration
│   │   └── axios.js              (HTTP client setup)
│   │
│   ├── 📂 contexts/              🔄 Global state
│   │   └── AuthContext.jsx       (Authentication state)
│   │
│   ├── 📂 pages/                 📄 Page components
│   │   │
│   │   ├── 📂 auth/              🔐 Authentication pages
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── 📂 patient/           👤 Patient pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Medications.jsx
│   │   │   └── Doses.jsx
│   │   │
│   │   ├── 📂 caretaker/         👨‍⚕️ Caretaker pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── Medications.jsx
│   │   │   └── Reports.jsx
│   │   │
│   │   ├── 📂 shared/            🔔 Shared pages
│   │   │   └── Notifications.jsx
│   │   │
│   │   └── NotFound.jsx          404 page
│   │
│   ├── 📂 services/              🌐 API services
│   │   └── api.js                (All API endpoints)
│   │
│   ├── App.jsx                   🎯 Main app component
│   ├── main.jsx                  🚀 Entry point
│   └── index.css                 🎨 Global styles
│
├── 📂 .vscode/                   VS Code settings
│   ├── settings.json
│   └── extensions.json
│
├── 📚 Documentation Files
│   ├── README.md                 Main documentation
│   ├── QUICKSTART.md             Quick start guide
│   ├── SETUP.md                  Setup instructions
│   ├── DOCUMENTATION.md          Architecture docs
│   ├── COMPONENTS.md             Component reference
│   ├── PROJECT_SUMMARY.md        Project overview
│   ├── PROJECT_COMPLETE.md       Completion summary
│   ├── INDEX.md                  Documentation index
│   └── CHANGELOG.md              Version history
│
├── 🔧 Configuration Files
│   ├── package.json              Dependencies & scripts
│   ├── vite.config.js            Vite configuration
│   ├── tailwind.config.js        Tailwind config
│   ├── postcss.config.js         PostCSS config
│   ├── .env                      Environment variables
│   ├── .env.example              Example env file
│   └── .gitignore                Git ignore rules
│
├── 🚀 Helper Scripts
│   ├── install.bat               Windows installer
│   ├── install.ps1               PowerShell installer
│   └── start.bat                 Quick start
│
├── 📄 Other Files
│   ├── index.html                HTML template
│   ├── LICENSE                   MIT License
│   └── STRUCTURE.md              This file!
│
└── 📦 dist/                      (Created after build)
    └── (Production build output)
```

---

## 🎯 Component Hierarchy

### Application Flow

```
main.jsx
  └── App.jsx
      ├── BrowserRouter
      ├── QueryClientProvider
      ├── AuthProvider
      └── Routes
          ├── Public Routes
          │   ├── /login → Login.jsx
          │   └── /register → Register.jsx
          │
          ├── Patient Routes (Protected)
          │   ├── /patient/dashboard → PatientDashboard
          │   ├── /patient/medications → PatientMedications
          │   └── /patient/doses → PatientDoses
          │
          ├── Caretaker Routes (Protected)
          │   ├── /caretaker/dashboard → CaretakerDashboard
          │   ├── /caretaker/patients → CaretakerPatients
          │   ├── /caretaker/medications/:id → CaretakerMedications
          │   └── /caretaker/reports → CaretakerReports
          │
          ├── Shared Routes (Protected)
          │   └── /notifications → NotificationsPage
          │
          └── 404 Route
              └── * → NotFound
```

---

## 🧩 Component Usage Map

### Layout Component (Wraps all protected pages)

```
Layout.jsx
├── Header
│   ├── Logo
│   ├── Navigation Menu
│   │   ├── Dashboard Link
│   │   ├── Medications/Patients Link
│   │   ├── Doses/Reports Link
│   │   └── (Role-based items)
│   │
│   ├── NotificationDropdown
│   │   ├── Bell Icon + Badge
│   │   ├── Dropdown Menu
│   │   │   ├── Notification Items
│   │   │   ├── Mark as Read Button
│   │   │   └── Delete Button
│   │   └── Auto-refresh (30s)
│   │
│   └── User Menu
│       ├── User Info
│       └── Logout Button
│
├── Mobile Menu (Hamburger)
│   └── Same as Navigation Menu
│
└── Main Content Area
    └── {children} - Page content
```

---

## 📊 Data Flow Diagram

### Authentication Flow

```
User
  │
  ├─► Login Page (Login.jsx)
  │     │
  │     ├─► Fill Email & Password
  │     │
  │     ├─► Submit Form
  │     │     │
  │     │     └─► useAuth().login()
  │     │           │
  │     │           ├─► POST /api/auth/login (Axios)
  │     │           │     │
  │     │           │     └─► Backend Validates
  │     │           │           │
  │     │           │           ├─► Success
  │     │           │           │     │
  │     │           │           │     ├─► Return {token, user}
  │     │           │           │     │
  │     │           │           │     ├─► Store in localStorage
  │     │           │           │     │
  │     │           │           │     ├─► Update AuthContext
  │     │           │           │     │
  │     │           │           │     └─► Navigate to Dashboard
  │     │           │           │
  │     │           │           └─► Error
  │     │           │                 │
  │     │           │                 └─► Show toast error
  │     │           │
  │     │           └─► All future requests include token
  │     │                 (via Axios interceptor)
  │
  └─► Protected Page Access
        │
        ├─► ProtectedRoute checks:
        │     │
        │     ├─► Is user authenticated?
        │     │     │
        │     │     ├─► NO → Redirect to /login
        │     │     │
        │     │     └─► YES → Check role
        │     │           │
        │     │           ├─► Role matches? → Show page
        │     │           │
        │     │           └─► Role mismatch → Redirect to appropriate dashboard
        │
        └─► Page loads with Layout
```

---

## 🔄 State Management Flow

### React Query + Context API

```
Component
  │
  ├─► Auth State (AuthContext)
  │     │
  │     ├─► user (object)
  │     ├─► token (string)
  │     ├─► loading (boolean)
  │     ├─► isAuthenticated (boolean)
  │     ├─► isPatient (boolean)
  │     ├─► isCaretaker (boolean)
  │     │
  │     └─► Methods:
  │           ├─► login(email, password)
  │           ├─► register(formData)
  │           └─► logout()
  │
  └─► Server State (React Query)
        │
        ├─► Queries (GET data)
        │     │
        │     ├─► useQuery(['medications', patientId])
        │     ├─► useQuery(['patients'])
        │     ├─► useQuery(['notifications'])
        │     └─► useQuery(['adherenceReport', patientId, days])
        │
        ├─► Mutations (POST/PUT/DELETE)
        │     │
        │     ├─► useMutation(medicationAPI.create)
        │     ├─► useMutation(doseAPI.markAsTaken)
        │     ├─► useMutation(linkAPI.invite)
        │     └─► useMutation(notificationAPI.markAsRead)
        │
        └─► Cache Management
              │
              ├─► Auto-cache (5 min stale time)
              ├─► Background refetch
              ├─► Invalidate on mutation
              └─► Optimistic updates
```

---

## 🎨 Styling Architecture

### Tailwind CSS Utility Pattern

```
Component
  │
  ├─► Base Styles (index.css)
  │     │
  │     ├─► @tailwind base
  │     ├─► @tailwind components
  │     └─► @tailwind utilities
  │
  ├─► Tailwind Config (tailwind.config.js)
  │     │
  │     ├─► Theme Extension
  │     │     │
  │     │     └─► Colors:
  │     │           ├─► primary: #3B82F6
  │     │           ├─► success: #10B981
  │     │           ├─► warning: #F59E0B
  │     │           └─► danger: #EF4444
  │     │
  │     └─► Content Paths
  │
  └─► Component Classes
        │
        ├─► Utility Classes
        │     │
        │     ├─► Layout: flex, grid, container
        │     ├─► Spacing: p-*, m-*, gap-*
        │     ├─► Colors: bg-*, text-*, border-*
        │     ├─► Typography: font-*, text-*
        │     └─► Effects: shadow-*, rounded-*
        │
        └─► Responsive Classes
              │
              ├─► sm: (640px)
              ├─► md: (768px)
              ├─► lg: (1024px)
              └─► xl: (1280px)
```

---

## 🔌 API Integration Flow

### Request/Response Cycle

```
Component
  │
  ├─► User Action (e.g., "Mark as Taken")
  │
  ├─► Call API Function
  │     │
  │     └─► doseAPI.markAsTaken(doseId)
  │           │
  │           └─► axiosInstance.patch(`/doses/${doseId}/take`)
  │
  ├─► Axios Interceptor (Request)
  │     │
  │     ├─► Add Authorization header
  │     ├─► Add Content-Type header
  │     └─► Forward request
  │
  ├─► Backend API
  │     │
  │     ├─► Validate token
  │     ├─► Process request
  │     └─► Return response
  │
  ├─► Axios Interceptor (Response)
  │     │
  │     ├─► 200 OK → Return data
  │     │
  │     ├─► 401 Unauthorized
  │     │     │
  │     │     ├─► Clear localStorage
  │     │     └─► Redirect to /login
  │     │
  │     └─► Other errors → Pass to catch
  │
  ├─► React Query Handler
  │     │
  │     ├─► onSuccess:
  │     │     │
  │     │     ├─► Invalidate related queries
  │     │     ├─► Update cache
  │     │     └─► Show success toast
  │     │
  │     └─► onError:
  │           │
  │           └─► Show error toast
  │
  └─► Component Re-renders
        │
        └─► UI updates automatically
```

---

## 📱 Responsive Design Breakpoints

```
Mobile First Approach
  │
  ├─► Base (Mobile)
  │     │
  │     ├─► Width: < 640px
  │     ├─► Layout: Single column
  │     ├─► Navigation: Hamburger menu
  │     └─► Components: Stack vertically
  │
  ├─► Tablet (sm:)
  │     │
  │     ├─► Width: 640px - 1024px
  │     ├─► Layout: 2 columns (some sections)
  │     ├─► Navigation: Still compact
  │     └─► Components: Side-by-side (some)
  │
  ├─► Desktop (md:)
  │     │
  │     ├─► Width: 1024px - 1280px
  │     ├─► Layout: Full layout
  │     ├─► Navigation: Full menu
  │     └─► Components: Grid layouts
  │
  └─► Large Desktop (lg:, xl:)
        │
        ├─► Width: > 1280px
        ├─► Layout: Max width container
        ├─► Navigation: Expanded
        └─► Components: Optimized spacing
```

---

## 🚀 Build Process

### Development to Production

```
Development
  │
  ├─► npm run dev
  │     │
  │     ├─► Vite Dev Server starts
  │     ├─► Hot Module Replacement (HMR)
  │     ├─► Source maps enabled
  │     ├─► Fast refresh
  │     └─► Proxy to backend (/api → localhost:5001)
  │
Production Build
  │
  ├─► npm run build
  │     │
  │     ├─► Vite builds for production
  │     ├─► Minify JavaScript
  │     ├─► Minify CSS
  │     ├─► Optimize assets
  │     ├─► Generate source maps
  │     └─► Output to dist/
  │
  ├─► npm run preview
  │     │
  │     ├─► Serve production build locally
  │     └─► Test before deployment
  │
  └─► Deploy
        │
        ├─► Upload dist/ folder
        ├─► Configure environment variables
        └─► Set up redirects for SPA
```

---

## 🗂️ File Relationships

### Import/Export Flow

```
main.jsx
  │
  ├─► import App from './App.jsx'
  ├─► import AuthProvider from './contexts/AuthContext.jsx'
  ├─► import QueryClientProvider from '@tanstack/react-query'
  └─► import './index.css'

App.jsx
  │
  ├─► import { Routes, Route } from 'react-router-dom'
  ├─► import ProtectedRoute from './components/ProtectedRoute.jsx'
  ├─► import Login from './pages/auth/Login.jsx'
  └─► import All other pages...

Pages
  │
  ├─► import Layout from '../components/Layout.jsx'
  ├─► import LoadingSpinner from '../components/LoadingSpinner.jsx'
  ├─► import { useAuth } from '../contexts/AuthContext.jsx'
  ├─► import { useQuery, useMutation } from '@tanstack/react-query'
  └─► import { api } from '../services/api.js'

Components
  │
  ├─► import { icons } from 'lucide-react'
  ├─► import { toast } from 'react-toastify'
  └─► import { format } from 'date-fns'
```

---

## 📋 This Structure Provides

✅ **Clear Organization** - Easy to find files
✅ **Scalability** - Room to grow
✅ **Maintainability** - Logical grouping
✅ **Reusability** - Shared components
✅ **Separation of Concerns** - Each file has one job
✅ **Best Practices** - Industry standards

---

**Use this guide to navigate the project!** 🗺️
