import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientMedications from './pages/patient/Medications';
import PatientDoses from './pages/patient/Doses';

// Caretaker Pages
import CaretakerDashboard from './pages/caretaker/Dashboard';
import CaretakerPatients from './pages/caretaker/Patients';
import CaretakerMedications from './pages/caretaker/Medications';
import CaretakerReports from './pages/caretaker/Reports';

// Donor Pages - Using lazy loading to catch errors
import { lazy, Suspense } from 'react';
const DonorDashboard = lazy(() => import('./pages/donor/Dashboard'));
const DonorRequests = lazy(() => import('./pages/donor/Requests'));
const DonorDonations = lazy(() => import('./pages/donor/Donations'));
const DonorProfile = lazy(() => import('./pages/donor/Profile'));

// Shared Pages
import NotificationsPage from './pages/shared/Notifications';
import NotFound from './pages/NotFound';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const { isAuthenticated, user } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return '/login';
    if (user.role === 'caretaker') return '/caretaker/dashboard';
    if (user.role === 'donor') return '/donor/dashboard';
    return '/patient/dashboard';
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <Register />} 
      />

      {/* Patient Routes */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/medications"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientMedications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/doses"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDoses />
          </ProtectedRoute>
        }
      />

      {/* Caretaker Routes */}
      <Route
        path="/caretaker/dashboard"
        element={
          <ProtectedRoute allowedRoles={['caretaker']}>
            <CaretakerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretaker/patients"
        element={
          <ProtectedRoute allowedRoles={['caretaker']}>
            <CaretakerPatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretaker/medications/:patientId"
        element={
          <ProtectedRoute allowedRoles={['caretaker']}>
            <CaretakerMedications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/caretaker/reports"
        element={
          <ProtectedRoute allowedRoles={['caretaker']}>
            <CaretakerReports />
          </ProtectedRoute>
        }
      />

      {/* Shared Routes */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Donor Routes */}
      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <Suspense fallback={<LoadingFallback />}>
              <DonorDashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/requests"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <Suspense fallback={<LoadingFallback />}>
              <DonorRequests />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/donations"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <Suspense fallback={<LoadingFallback />}>
              <DonorDonations />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/profile"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <Suspense fallback={<LoadingFallback />}>
              <DonorProfile />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to={getDashboardRoute()} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
