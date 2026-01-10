import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminAPI = {
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

  // Get system analytics
  getAnalytics: async () => {
    const { data } = await axios.get(`${BASE_URL}/admin/analytics`, {
      headers: getAuthHeader()
    });
    return data;
  },

  // Get all caretaker-patient links
  getLinks: async (params = {}) => {
    const { data } = await axios.get(`${BASE_URL}/admin/links`, {
      headers: getAuthHeader(),
      params // { page, limit }
    });
    return data;
  },

  // Get recent activity
  getActivity: async () => {
    const { data } = await axios.get(`${BASE_URL}/admin/activity`, {
      headers: getAuthHeader()
    });
    return data;
  }
};
