import axiosInstance from '../config/axios';
import { mockAPI } from './mockApi';

// Toggle between real API and mock API
// Set USE_MOCK_API=true in .env to use mock data (no backend needed)
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === 'true';

// Debug log
console.log('🔧 Mock API Mode:', USE_MOCK);
console.log('🔧 VITE_USE_MOCK_API env:', import.meta.env.VITE_USE_MOCK_API);

// Helper to wrap API calls
const apiWrapper = (realFn, mockFn) => {
  return async (...args) => {
    if (USE_MOCK) {
      console.log('✅ Using MOCK API');
      return await mockFn(...args);
    }
    console.log('🌐 Using REAL API');
    const response = await realFn(...args);
    return response.data;
  };
};

// Auth API
export const authAPI = {
  login: apiWrapper(
    (credentials) => axiosInstance.post('/auth/login', credentials),
    mockAPI.auth.login
  ),
  register: apiWrapper(
    (userData) => axiosInstance.post('/auth/register', userData),
    mockAPI.auth.register
  ),
  getCurrentUser: apiWrapper(
    () => axiosInstance.get('/auth/me'),
    mockAPI.auth.getCurrentUser
  ),
};

// Patient API
export const patientAPI = {
  getAll: apiWrapper(
    () => axiosInstance.get('/patients'),
    mockAPI.patients.getAll
  ),
  getById: apiWrapper(
    (id) => axiosInstance.get(`/patients/${id}`),
    mockAPI.patients.getById
  ),
};

// Link API
export const linkAPI = {
  invite: apiWrapper(
    (patientEmail) => axiosInstance.post('/links/invite', { patientEmail }),
    mockAPI.links.invite
  ),
  unlink: apiWrapper(
    (patientId) => axiosInstance.delete(`/links/${patientId}`),
    (patientId) => Promise.resolve({ message: 'Unlinked successfully' })
  ),
  getPending: apiWrapper(
    () => axiosInstance.get('/links/pending'),
    mockAPI.links.getPending
  ),
  accept: apiWrapper(
    (id) => axiosInstance.post(`/links/${id}/accept`),
    mockAPI.links.accept
  ),
};

// Medication API
export const medicationAPI = {
  create: apiWrapper(
    (medicationData) => axiosInstance.post('/medications', medicationData),
    mockAPI.medications.create
  ),
  getByPatient: apiWrapper(
    (patientId) => axiosInstance.get(`/medications/patient/${patientId}`),
    mockAPI.medications.getByPatient
  ),
  getAll: apiWrapper(
    () => axiosInstance.get('/medications'),
    mockAPI.medications.getAll
  ),
  update: apiWrapper(
    (medicationId, medicationData) => axiosInstance.patch(`/medications/${medicationId}`, medicationData),
    (medicationId, medicationData) => mockAPI.medications.update(medicationId, medicationData)
  ),
  delete: apiWrapper(
    (medicationId) => axiosInstance.delete(`/medications/${medicationId}`),
    mockAPI.medications.delete
  ),
};

// Dose API
export const doseAPI = {
  getToday: apiWrapper(
    () => axiosInstance.get('/doses/today'),
    mockAPI.doses.getToday
  ),
  getHistory: apiWrapper(
    () => axiosInstance.get('/doses/history'),
    mockAPI.doses.getHistory
  ),
  markAsTaken: apiWrapper(
    (doseId) => axiosInstance.patch(`/doses/${doseId}/take`),
    mockAPI.doses.markAsTaken
  ),
  markAsMissed: apiWrapper(
    (doseId) => axiosInstance.patch(`/doses/${doseId}/miss`),
    mockAPI.doses.markAsMissed
  ),
};

// Notification API
export const notificationAPI = {
  getAll: apiWrapper(
    () => axiosInstance.get('/notifications'),
    mockAPI.notifications.getAll
  ),
  getUnreadCount: apiWrapper(
    () => axiosInstance.get('/notifications/unread/count'),
    async () => {
      const notifications = await mockAPI.notifications.getAll();
      return { count: notifications.filter(n => !n.isRead).length };
    }
  ),
  markAsRead: apiWrapper(
    (notificationId) => axiosInstance.patch(`/notifications/${notificationId}/read`),
    mockAPI.notifications.markAsRead
  ),
  markAllAsRead: apiWrapper(
    () => axiosInstance.patch('/notifications/read-all'),
    mockAPI.notifications.markAllAsRead
  ),
  delete: apiWrapper(
    (notificationId) => axiosInstance.delete(`/notifications/${notificationId}`),
    mockAPI.notifications.delete
  ),
};

// Report API
export const reportAPI = {
  getAdherence: apiWrapper(
    (patientId, days = 30) => axiosInstance.get(`/reports/adherence/${patientId}`, { params: { days } }),
    mockAPI.reports.getAdherence
  ),
};

// Donor API
export const donorAPI = {
  getProfile: apiWrapper(
    () => axiosInstance.get('/donor/profile'),
    mockAPI.donor.getProfile
  ),
  updateProfile: apiWrapper(
    (profileData) => axiosInstance.patch('/donor/profile', profileData),
    mockAPI.donor.updateProfile
  ),
  toggleAvailability: apiWrapper(
    () => axiosInstance.patch('/donor/availability/toggle'),
    mockAPI.donor.toggleAvailability
  ),
  getStats: apiWrapper(
    () => axiosInstance.get('/donor/stats'),
    mockAPI.donor.getStats
  ),
  getActiveRequests: apiWrapper(
    () => axiosInstance.get('/donor/requests/active'),
    mockAPI.donor.getActiveRequests
  ),
  acceptRequest: apiWrapper(
    (requestId) => axiosInstance.post(`/donor/requests/${requestId}/accept`),
    mockAPI.donor.acceptRequest
  ),
  getDonations: apiWrapper(
    () => axiosInstance.get('/donor/donations'),
    mockAPI.donor.getDonations
  ),
  getRecentDonations: apiWrapper(
    () => axiosInstance.get('/donor/donations/recent'),
    mockAPI.donor.getRecentDonations
  ),
};
