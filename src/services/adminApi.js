import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
console.log('Admin API Base URL:', BASE_URL);

// Create axios instance with auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminAPI = {
  // ============================================
  // USER MANAGEMENT
  // ============================================
  
  // Get all users with pagination and role filter
  getUsers: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/users`, {
      headers: getAuthHeader(),
      params // { page, limit, role }
    });
    return data;
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    const { data } = await axios.patch(
      `${BASE_URL}/admin/users/${userId}/status`,
      { status },
      { headers: getAuthHeader() }
    );
    return data;
  },

  // ============================================
  // ANALYTICS & ACTIVITY
  // ============================================

  // Get system analytics
  getAnalytics: async () => {
    console.log('Fetching analytics from:', `${BASE_URL}/admin/analytics`);
    const { data } = await axios.get(`${BASE_URL}/admin/analytics`, {
      headers: getAuthHeader()
    });
    console.log('Analytics response:', data);
    return data;
  },

  // Get recent activity
  getActivity: async () => {
    const { data } = await axios.get(`${BASE_URL}/admin/activity`, {
      headers: getAuthHeader()
    });
    return data;
  },

  // ============================================
  // PATIENT MANAGEMENT
  // ============================================

  // Get all patients with pagination and search
  getPatients: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/patients`, {
      headers: getAuthHeader(),
      params // { page, limit, search }
    });
    return data;
  },

  // Get patient by ID with full profile
  getPatientById: async (patientId) => {
    const { data } = await axios.get(`${BASE_URL}/admin/patients/${patientId}`, {
      headers: getAuthHeader()
    });
    return data;
  },

  // Update patient basic details
  updatePatient: async (patientId, updateData) => {
    const { data } = await axios.patch(
      `${BASE_URL}/admin/patients/${patientId}`,
      updateData, // { name, phone, age, gender, blood_group, city }
      { headers: getAuthHeader() }
    );
    return data;
  },

  // Get patient medications
  getPatientMedications: async (patientId) => {
    const { data } = await axios.get(
      `${BASE_URL}/admin/patients/${patientId}/medications`,
      { headers: getAuthHeader() }
    );
    return data;
  },

  // Get patient adherence statistics
  getPatientAdherence: async (patientId, days = 30) => {
    const { data } = await axios.get(
      `${BASE_URL}/admin/patients/${patientId}/adherence`,
      {
        headers: getAuthHeader(),
        params: { days }
      }
    );
    return data;
  },

  // ============================================
  // CARETAKER MANAGEMENT
  // ============================================

  // Get all caretakers with patient counts
  getCaretakers: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/caretakers`, {
      headers: getAuthHeader(),
      params // { page, limit, search }
    });
    return data;
  },

  // Get caretaker by ID with assigned patients
  getCaretakerById: async (caretakerId) => {
    const { data } = await axios.get(`${BASE_URL}/admin/caretakers/${caretakerId}`, {
      headers: getAuthHeader()
    });
    return data;
  },

  // ============================================
  // LINK MANAGEMENT (Patient-Caretaker)
  // ============================================

  // Get all caretaker-patient links
  getLinks: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/links`, {
      headers: getAuthHeader(),
      params // { page, limit }
    });
    return data;
  },

  // Assign patient to caretaker (create link)
  assignPatientToCaretaker: async (caretakerId, patientId) => {
    const { data } = await axios.post(
      `${BASE_URL}/admin/links`,
      {
        caretaker_id: caretakerId,
        patient_id: patientId
      },
      { headers: getAuthHeader() }
    );
    return data;
  },

  // Remove patient-caretaker link
  removeLink: async (linkId) => {
    const { data } = await axios.delete(
      `${BASE_URL}/admin/links/${linkId}`,
      { headers: getAuthHeader() }
    );
    return data;
  },

  // ============================================
  // DONATION REQUEST MANAGEMENT
  // ============================================

  // Get all donation requests with filtering
  getDonationRequests: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/donation-requests`, {
      headers: getAuthHeader(),
      params // { page, limit, status, urgent }
    });
    return data;
  },

  // Approve a donation request
  approveDonationRequest: async (requestId, notes) => {
    const { data } = await axios.patch(
      `${BASE_URL}/admin/donation-requests/${requestId}/approve`,
      { notes },
      { headers: getAuthHeader() }
    );
    return data;
  },

  // Reject a donation request
  rejectDonationRequest: async (requestId, reason) => {
    const { data } = await axios.patch(
      `${BASE_URL}/admin/donation-requests/${requestId}/reject`,
      { reason },
      { headers: getAuthHeader() }
    );
    return data;
  },

  // Find suitable donors for urgent requests
  findSuitableDonors: async (requestId, limit = 10) => {
    const { data } = await axios.get(
      `${BASE_URL}/admin/donation-requests/${requestId}/find-donors`,
      {
        headers: getAuthHeader(),
        params: { limit }
      }
    );
    return data;
  },

  // Get all donations with details
  getDonations: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/donations`, {
      headers: getAuthHeader(),
      params // { page, limit, status }
    });
    return data;
  },

  // ============================================
  // ENHANCED ANALYTICS
  // ============================================

  // Get comprehensive dashboard analytics
  getDashboardAnalytics: async () => {
    const { data } = await axios.get(`${BASE_URL}/admin/analytics/dashboard`, {
      headers: getAuthHeader()
    });
    return data;
  }
};
