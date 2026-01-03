# Project Documentation

## Architecture Overview

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser                              │
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                     │  │
│  │                                                    │  │
│  │  ┌──────────────┐      ┌──────────────┐          │  │
│  │  │   Routes     │◄─────┤  App.jsx     │          │  │
│  │  │ (Router v6)  │      └──────────────┘          │  │
│  │  └──────────────┘                                 │  │
│  │         │                                          │  │
│  │         ▼                                          │  │
│  │  ┌──────────────────────────────────────┐         │  │
│  │  │      Protected Routes                │         │  │
│  │  │  ┌─────────────┬──────────────────┐  │         │  │
│  │  │  │   Patient   │   Caretaker      │  │         │  │
│  │  │  │   Pages     │   Pages          │  │         │  │
│  │  │  └─────────────┴──────────────────┘  │         │  │
│  │  └──────────────────────────────────────┘         │  │
│  │                                                    │  │
│  │  ┌──────────────┐      ┌──────────────┐          │  │
│  │  │ AuthContext  │◄────►│ React Query  │          │  │
│  │  │  (Context)   │      │ (TanStack)   │          │  │
│  │  └──────────────┘      └──────────────┘          │  │
│  │         │                      │                  │  │
│  │         └──────────┬───────────┘                  │  │
│  │                    ▼                              │  │
│  │            ┌──────────────┐                       │  │
│  │            │    Axios     │                       │  │
│  │            │ (HTTP Client)│                       │  │
│  │            └──────────────┘                       │  │
│  └────────────────────┼────────────────────────────┘  │
└────────────────────────┼────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │   Backend API    │
              │  (Express.js)    │
              │  Port: 5001      │
              └──────────────────┘
```

### State Management Strategy

1. **Authentication State** (Context API)
   - User information
   - JWT token
   - Login/logout functions
   - Role-based access

2. **Server State** (React Query)
   - Medications
   - Patients
   - Doses
   - Notifications
   - Reports
   - Automatic caching
   - Background refetching
   - Optimistic updates

3. **Local Component State** (useState)
   - Modal open/close
   - Form inputs
   - UI toggles

### Data Flow

#### Patient Marking Dose as Taken
```
Patient Dashboard
    │
    ├─ View Today's Doses
    │     │
    │     └─ Click "Mark as Taken"
    │           │
    │           ├─ Show Confirmation Dialog
    │           │     │
    │           │     └─ User Confirms
    │           │           │
    │           │           ├─ useMutation (React Query)
    │           │           │     │
    │           │           │     ├─ PATCH /doses/:id/take
    │           │           │     │     │
    │           │           │     │     └─ Backend Updates Database
    │           │           │     │
    │           │           │     └─ Invalidate Queries
    │           │           │           │
    │           │           │           └─ Refetch Medications
    │           │           │                 │
    │           │           │                 └─ UI Updates Automatically
    │           │           │
    │           │           └─ Toast Success Notification
    │           │
    │           └─ Notification sent to Caretaker
```

#### Caretaker Adding Medication
```
Caretaker Dashboard
    │
    ├─ Select Patient
    │     │
    │     └─ Click "Manage Medications"
    │           │
    │           ├─ Click "Add Medication"
    │           │     │
    │           │     ├─ Open Modal with Form
    │           │     │     │
    │           │     │     └─ Fill Details (React Hook Form)
    │           │     │           │
    │           │     │           ├─ Validation (Yup Schema)
    │           │     │           │     │
    │           │     │           │     └─ Submit
    │           │     │                 │
    │           │     │                 ├─ useMutation
    │           │     │                 │     │
    │           │     │                 │     ├─ POST /medications
    │           │     │                 │     │     │
    │           │     │                 │     │     └─ Backend Creates Medication
    │           │     │                 │     │
    │           │     │                 │     └─ Invalidate Queries
    │           │     │                 │           │
    │           │     │                 │           └─ Refetch Patient Medications
    │           │     │                 │
    │           │     │                 └─ Toast Success
    │           │     │
    │           │     └─ Notification sent to Patient
```

## Component Architecture

### Layout Component Structure
```
<Layout>
  ├── Header
  │   ├── Logo
  │   ├── Navigation (Desktop)
  │   │   └── Nav Items (based on role)
  │   ├── NotificationDropdown
  │   ├── User Menu
  │   └── Mobile Menu Button
  │
  ├── Mobile Menu (conditional)
  │   ├── Nav Items
  │   └── User Profile
  │
  └── Main Content
      └── {children}
```

### Form Component Pattern
```jsx
<Modal>
  <Form onSubmit={handleSubmit(onSubmit)}>
    <Input {...register('field')} />
    {errors.field && <Error />}
    
    <Actions>
      <CancelButton />
      <SubmitButton />
    </Actions>
  </Form>
</Modal>
```

## API Integration

### Axios Configuration

**Interceptors:**
1. **Request Interceptor**
   - Adds JWT token to Authorization header
   - Formats request data

2. **Response Interceptor**
   - Handles 401 errors (auto-logout)
   - Formats response data
   - Error handling

### React Query Configuration

**Default Options:**
```javascript
{
  queries: {
    refetchOnWindowFocus: true,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
}
```

**Query Keys Strategy:**
```javascript
['medications', patientId]  // Medications for specific patient
['patients']                 // All patients for caretaker
['notifications']            // User notifications
['notificationCount']        // Unread count
['adherenceReport', patientId, days]  // Report with params
```

## Styling System

### Tailwind CSS Utilities

**Common Patterns:**
```css
/* Card */
.bg-white .rounded-lg .shadow-sm .p-6

/* Button Primary */
.bg-primary .text-white .px-4 .py-2 .rounded-md .hover:bg-blue-700

/* Input */
.border .border-gray-300 .rounded-md .px-3 .py-2 .focus:ring-primary

/* Badge */
.inline-flex .items-center .px-2.5 .py-0.5 .rounded-full .text-xs
```

### Responsive Breakpoints
```css
sm:  640px   /* Tablet */
md:  768px   /* Desktop */
lg:  1024px  /* Large Desktop */
xl:  1280px  /* Extra Large */
```

## Security Implementation

### Authentication Flow
1. User submits login credentials
2. Backend validates and returns JWT + user object
3. Frontend stores token in localStorage
4. Token attached to all requests via Axios interceptor
5. On 401 response, clear token and redirect to login

### Protected Routes
```jsx
<ProtectedRoute allowedRoles={['patient']}>
  <PatientDashboard />
</ProtectedRoute>
```

**Logic:**
1. Check if user is authenticated
2. Check if user role is in allowedRoles
3. Redirect if unauthorized

### Input Validation
- Client-side: Yup schemas with React Hook Form
- Server-side: Backend validation (not shown)
- XSS Protection: React's built-in escaping

## Performance Optimizations

### 1. React Query Caching
- Reduces unnecessary API calls
- Background refetching
- Stale-while-revalidate pattern

### 2. Code Splitting (Future)
```jsx
const PatientDashboard = lazy(() => import('./pages/patient/Dashboard'));
```

### 3. Memoization (Where Needed)
```jsx
const filteredData = useMemo(
  () => data.filter(item => item.active),
  [data]
);
```

### 4. Debouncing (Search Inputs)
```jsx
const debouncedSearch = useDebounce(searchTerm, 300);
```

## Error Handling Strategy

### Levels of Error Handling

1. **Component Level**
   ```jsx
   try {
     // Operation
   } catch (error) {
     toast.error('Operation failed');
   }
   ```

2. **Query Level**
   ```jsx
   const { data, error, isError } = useQuery({
     onError: (error) => {
       toast.error(error.message);
     }
   });
   ```

3. **Global Level**
   - Axios interceptor catches all API errors
   - Auto-logout on 401
   - Toast notifications

## Testing Strategy (Future Implementation)

### Unit Tests
- Component rendering
- User interactions
- Form validation
- Utility functions

### Integration Tests
- API integration
- User flows
- Route navigation

### E2E Tests
- Complete user journeys
- Cross-browser testing

## Deployment Checklist

- [ ] Update `.env` with production API URL
- [ ] Run `npm run build`
- [ ] Test production build locally (`npm run preview`)
- [ ] Check for console errors
- [ ] Verify all API endpoints work
- [ ] Test authentication flow
- [ ] Test all user roles
- [ ] Verify responsive design
- [ ] Check performance metrics
- [ ] Configure CORS on backend
- [ ] Set up HTTPS
- [ ] Configure CDN (optional)
- [ ] Set up monitoring/analytics

## Maintenance Guidelines

### Regular Tasks
1. Update dependencies monthly
2. Review and fix security vulnerabilities
3. Monitor error logs
4. Check performance metrics
5. Review user feedback

### Adding New Features
1. Plan component structure
2. Create API service functions
3. Implement UI components
4. Add form validation
5. Implement state management
6. Add error handling
7. Test thoroughly
8. Update documentation

### Code Style
- Use functional components
- Prefer hooks over class components
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Extract reusable logic to custom hooks

## Troubleshooting Guide

### Common Issues

**Issue: API calls failing**
- Check backend is running
- Verify API URL in `.env`
- Check network tab in DevTools
- Verify token is being sent

**Issue: Infinite re-renders**
- Check useEffect dependencies
- Verify query keys are stable
- Check for state updates in render

**Issue: Stale data**
- Force refetch: `queryClient.invalidateQueries()`
- Check staleTime configuration
- Verify query keys match

**Issue: Form not submitting**
- Check validation errors
- Verify form onSubmit handler
- Check network for API response

## Resources

### Documentation
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Tools
- React DevTools
- Redux DevTools (if using Redux)
- React Query DevTools
- Chrome DevTools

---

**Last Updated:** [Current Date]
**Version:** 1.0.0
