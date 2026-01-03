# Component Reference Guide

## 📁 File Structure & Component Purposes

### Core Application Files

#### `src/main.jsx`
**Purpose:** Application entry point
- Sets up React root
- Configures React Query
- Wraps app with providers (Router, Auth, Query)
- Configures toast notifications

#### `src/App.jsx`
**Purpose:** Main routing configuration
- Defines all application routes
- Sets up protected routes
- Handles role-based redirects
- Manages 404 fallback

#### `src/index.css`
**Purpose:** Global styles and Tailwind configuration
- Tailwind directives
- Custom animations
- Global CSS resets
- Scrollbar styling

---

### 🔧 Configuration Files

#### `src/config/axios.js`
**Purpose:** Axios HTTP client configuration
- Base URL setup
- Request interceptor (adds auth token)
- Response interceptor (handles 401 errors)
- Automatic logout on unauthorized

**Key Functions:**
```javascript
axiosInstance.interceptors.request.use()   // Add token to requests
axiosInstance.interceptors.response.use()  // Handle auth errors
```

---

### 🔐 Context & State Management

#### `src/contexts/AuthContext.jsx`
**Purpose:** Global authentication state
- User information storage
- Token management
- Login/logout functions
- Authentication status

**Exports:**
```javascript
AuthProvider         // Wrap around app
useAuth()           // Access auth state in components
```

**State:**
- `user` - Current user object
- `token` - JWT token
- `loading` - Loading state
- `isAuthenticated` - Boolean
- `isPatient` / `isCaretaker` - Role checks

**Methods:**
- `login(email, password)` - Authenticate user
- `register(formData)` - Create new account
- `logout()` - Clear session and redirect

---

### 🌐 API Services

#### `src/services/api.js`
**Purpose:** Centralized API calls
- All backend API endpoints
- Organized by resource type
- Returns Axios promises

**API Modules:**
```javascript
authAPI           // Login, register
patientAPI        // Get patients
linkAPI           // Invite, unlink patients
medicationAPI     // CRUD medications
doseAPI           // Mark doses as taken
notificationAPI   // Notification management
reportAPI         // Adherence reports
```

---

### 🧩 Reusable Components

#### `src/components/Layout.jsx`
**Purpose:** Main application layout wrapper
- Header with navigation
- Logo and branding
- Notification bell
- User menu
- Mobile responsive menu
- Logout functionality

**Props:**
- `children` - Page content to render

**Usage:**
```jsx
<Layout>
  <YourPageContent />
</Layout>
```

#### `src/components/ProtectedRoute.jsx`
**Purpose:** Route authentication guard
- Checks if user is logged in
- Validates user role
- Redirects unauthorized users
- Shows loading during auth check

**Props:**
- `children` - Protected component
- `allowedRoles` - Array of allowed roles (optional)

**Usage:**
```jsx
<ProtectedRoute allowedRoles={['patient']}>
  <PatientDashboard />
</ProtectedRoute>
```

#### `src/components/NotificationDropdown.jsx`
**Purpose:** Notification bell and dropdown
- Shows unread count badge
- Displays recent notifications
- Mark as read functionality
- Delete notifications
- Auto-refresh every 30s

**Features:**
- Click outside to close
- Real-time updates
- Formatted timestamps
- Grouped by read/unread

#### `src/components/LoadingSpinner.jsx`
**Purpose:** Reusable loading indicator
- Animated spinner
- Multiple sizes
- Customizable

**Props:**
- `size` - 'sm' | 'md' | 'lg' | 'xl'
- `className` - Additional CSS classes

**Usage:**
```jsx
<LoadingSpinner size="lg" className="min-h-screen" />
```

#### `src/components/Modal.jsx`
**Purpose:** Reusable modal dialog
- Overlay background
- Click outside to close
- Flexible content area
- Responsive sizing

**Props:**
- `isOpen` - Boolean to control visibility
- `onClose` - Close handler function
- `title` - Modal title (optional)
- `children` - Modal content
- `maxWidth` - Max width class (default: 'max-w-md')

**Usage:**
```jsx
<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Item">
  <YourFormContent />
</Modal>
```

#### `src/components/ConfirmDialog.jsx`
**Purpose:** Confirmation dialog for destructive actions
- Warning icon
- Custom message
- Confirm/Cancel buttons
- Danger mode (red styling)

**Props:**
- `isOpen` - Show/hide dialog
- `onClose` - Cancel handler
- `onConfirm` - Confirm handler
- `title` - Dialog title
- `message` - Confirmation message
- `confirmText` - Confirm button text
- `cancelText` - Cancel button text
- `isDanger` - Red styling for destructive actions

**Usage:**
```jsx
<ConfirmDialog
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure? This cannot be undone."
  isDanger={true}
/>
```

---

### 🔓 Authentication Pages

#### `src/pages/auth/Login.jsx`
**Purpose:** User login page
- Email/password form
- Form validation
- Error display
- Loading state
- Link to register

**Features:**
- React Hook Form integration
- Yup validation
- Auto-redirect after login
- Remember credentials (optional)

#### `src/pages/auth/Register.jsx`
**Purpose:** New user registration
- Full name, email, password fields
- Password confirmation
- Role selection (patient/caretaker)
- Form validation

**Features:**
- Complete validation
- Role radio buttons
- Password matching check
- Redirect to login after success

---

### 👤 Patient Pages

#### `src/pages/patient/Dashboard.jsx`
**Purpose:** Patient home page
- Welcome message
- Today's stats (doses, adherence)
- Upcoming doses list
- Active medications overview

**Data Displayed:**
- Total medications
- Today's scheduled doses
- Doses taken today
- Adherence rate percentage
- Next 3 upcoming doses
- All active medications

#### `src/pages/patient/Medications.jsx`
**Purpose:** View all patient medications
- Complete medication list
- Search functionality
- Filter by status (active/inactive)
- Medication details

**Features:**
- Search by name
- Status filter dropdown
- Detailed medication cards
- Instructions display
- Empty state message

#### `src/pages/patient/Doses.jsx`
**Purpose:** Today's dose management
- Today's dose schedule
- Mark doses as taken
- Status indicators
- Summary statistics

**Dose States:**
- 🔵 Scheduled - Not yet time
- 🟢 Taken - Marked complete
- 🔴 Missed - Past due
- 🟠 Overdue - Scheduled but past time

**Features:**
- Mark as taken button
- Confirmation dialog
- Real-time updates
- Color-coded status
- Summary cards

---

### 👨‍⚕️ Caretaker Pages

#### `src/pages/caretaker/Dashboard.jsx`
**Purpose:** Caretaker overview
- Patient list with cards
- Quick stats summary
- Quick actions per patient
- Average adherence

**Data Displayed:**
- Total patients count
- Total active medications
- Average adherence rate
- Patient cards with details

**Actions:**
- View patient medications
- View patient reports
- Add new patient

#### `src/pages/caretaker/Patients.jsx`
**Purpose:** Patient management
- All linked patients
- Invite new patients by email
- Unlink patients
- Search patients

**Features:**
- Invite modal
- Email validation
- Patient search
- Unlink confirmation
- Patient details display
- Quick access to medications

#### `src/pages/caretaker/Medications.jsx`
**Purpose:** Manage patient medications
- View patient's medications
- Add new medication
- Edit existing medication
- Delete medication

**Forms Include:**
- Medication name
- Dosage
- Schedule type (daily/weekly/custom)
- Schedule details (times)
- Instructions

**Features:**
- Add medication modal
- Edit medication modal
- Delete confirmation
- Form validation
- Real-time updates

#### `src/pages/caretaker/Reports.jsx`
**Purpose:** Adherence reporting and analytics
- Patient selector
- Date range selector
- Adherence statistics
- Visual charts
- Interpretation

**Metrics:**
- Adherence rate (%)
- Total doses in period
- Doses taken
- Doses missed
- Visual chart (Recharts)

**Features:**
- Patient dropdown
- Period selector (7/30/90 days)
- Color-coded adherence levels
- Interpretation message
- Responsive chart

---

### 🔔 Shared Pages

#### `src/pages/shared/Notifications.jsx`
**Purpose:** Full notifications page
- All notifications view
- Separate unread/read sections
- Bulk actions
- Individual actions

**Features:**
- Unread count in header
- Mark all as read button
- Individual mark as read
- Delete notifications
- Formatted timestamps
- Empty state

#### `src/pages/NotFound.jsx`
**Purpose:** 404 error page
- Large 404 display
- Helpful message
- Navigation buttons

**Actions:**
- Go to home
- Go back to previous page

---

## 🎨 Styling Patterns

### Common Component Classes

**Card:**
```css
bg-white rounded-lg shadow-sm p-6
```

**Primary Button:**
```css
bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700
```

**Secondary Button:**
```css
border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50
```

**Danger Button:**
```css
bg-danger text-white px-4 py-2 rounded-md hover:bg-red-700
```

**Input Field:**
```css
border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary
```

**Badge:**
```css
inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
```

---

## 🔄 Data Flow Examples

### Patient Marks Dose
```
Patient Doses Page
  ↓
Click "Mark as Taken"
  ↓
Show Confirmation Dialog
  ↓
User Confirms
  ↓
useMutation (doseAPI.markAsTaken)
  ↓
PATCH /doses/:id/take
  ↓
Backend updates database
  ↓
Query invalidation
  ↓
Automatic refetch
  ↓
UI updates
  ↓
Toast notification
```

### Caretaker Adds Medication
```
Caretaker Medications Page
  ↓
Click "Add Medication"
  ↓
Open Modal with Form
  ↓
Fill form fields
  ↓
Validation (Yup)
  ↓
Submit
  ↓
useMutation (medicationAPI.create)
  ↓
POST /medications
  ↓
Backend creates record
  ↓
Query invalidation
  ↓
Refetch medications
  ↓
UI updates
  ↓
Close modal
  ↓
Toast success
```

---

## 🎯 Component Usage Tips

### When to Use Each Component

**Layout:** Wrap all authenticated pages
**ProtectedRoute:** All pages requiring login
**Modal:** Forms, confirmations, info displays
**ConfirmDialog:** Destructive actions (delete, unlink)
**LoadingSpinner:** Async operations, page loads
**NotificationDropdown:** Already in Layout, automatic

### Form Handling Pattern
```jsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});

const onSubmit = (data) => {
  mutation.mutate(data);
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('fieldName')} />
  {errors.fieldName && <Error />}
  <button type="submit">Submit</button>
</form>
```

### Query Pattern
```jsx
const { data, isLoading, error } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => api.getResource(id),
});

if (isLoading) return <LoadingSpinner />;
if (error) return <Error />;
return <DisplayData data={data} />;
```

### Mutation Pattern
```jsx
const mutation = useMutation({
  mutationFn: (data) => api.createResource(data),
  onSuccess: () => {
    queryClient.invalidateQueries(['resources']);
    toast.success('Success!');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

<button onClick={() => mutation.mutate(formData)}>
  {mutation.isPending ? 'Loading...' : 'Submit'}
</button>
```

---

## 📝 Notes

- All components use functional components with hooks
- PropTypes can be added for better type checking
- Consider adding TypeScript for type safety
- Components are designed to be reusable
- Follow existing patterns when adding new components
- Keep components focused on single responsibility
- Extract complex logic to custom hooks

---

**Last Updated:** [Current Date]
