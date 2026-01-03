// Mock API for testing without backend
// Static data and mock responses

// Mock Users Database
const MOCK_USERS = {
  caretaker: {
    id: '1',
    email: 'caretaker@demo.com',
    password: 'Demo@123',
    role: 'caretaker',
    name: 'Dr. Rajesh Kumar',
    phone: '+91 98765 43210',
  },
  patient: {
    id: '2',
    email: 'patient@demo.com',
    password: 'Demo@123',
    role: 'patient',
    name: 'Amit Sharma',
    phone: '+91 87654 32109',
    age: 45,
    gender: 'male',
  },
  donor: {
    id: '4',
    email: 'donor@demo.com',
    password: 'Demo@123',
    role: 'donor',
    name: 'Vikram Singh',
    phone: '+91 98123 45678',
    bloodGroup: 'O+',
  },
};

// Mock Token
const MOCK_TOKEN = 'mock-jwt-token-12345';

// Mock Patients Data
const MOCK_PATIENTS = [
  {
    id: '2',
    name: 'Amit Sharma',
    email: 'patient@demo.com',
    phone: '+91 87654 32109',
    age: 45,
    gender: 'male',
    status: 'active',
    adherenceRate: 85,
    createdAt: '2025-09-15T10:00:00Z',
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya@demo.com',
    phone: '+91 76543 21098',
    age: 38,
    gender: 'female',
    status: 'active',
    adherenceRate: 92,
    createdAt: '2025-09-20T14:30:00Z',
  },
  {
    id: '4',
    name: 'Suresh Reddy',
    email: 'suresh@demo.com',
    phone: '+91 65432 10987',
    age: 52,
    gender: 'male',
    status: 'inactive',
    adherenceRate: 78,
    createdAt: '2025-08-10T09:15:00Z',
  },
];

// Mock Medications Data
const MOCK_MEDICATIONS = [
  // Amit Sharma's Medications (Patient ID: 2)
  {
    id: '1',
    patientId: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'twice daily',
    timing: ['08:00', '20:00'],
    instructions: 'Take with meals to manage blood sugar',
    startDate: '2025-09-15',
    endDate: '2026-03-15',
    isActive: true,
    createdAt: '2025-09-15T10:30:00Z',
  },
  {
    id: '2',
    patientId: '2',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'once daily',
    timing: ['09:00'],
    instructions: 'Take in the morning for blood pressure',
    startDate: '2025-09-15',
    endDate: null,
    isActive: true,
    createdAt: '2025-09-15T10:35:00Z',
  },
  {
    id: '3',
    patientId: '2',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'once daily',
    timing: ['21:00'],
    instructions: 'Take at bedtime for cholesterol',
    startDate: '2025-10-01',
    endDate: null,
    isActive: true,
    createdAt: '2025-10-01T11:00:00Z',
  },
  
  // Priya Patel's Medications (Patient ID: 3)
  {
    id: '4',
    patientId: '3',
    name: 'Aspirin',
    dosage: '75mg',
    frequency: 'once daily',
    timing: ['08:00'],
    instructions: 'Take after breakfast for heart health',
    startDate: '2025-09-20',
    endDate: null,
    isActive: true,
    createdAt: '2025-09-20T15:00:00Z',
  },
  {
    id: '5',
    patientId: '3',
    name: 'Levothyroxine',
    dosage: '50mcg',
    frequency: 'once daily',
    timing: ['07:00'],
    instructions: 'Take on empty stomach, 30 min before breakfast',
    startDate: '2025-09-20',
    endDate: null,
    isActive: true,
    createdAt: '2025-09-20T15:05:00Z',
  },
  {
    id: '6',
    patientId: '3',
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'once daily',
    timing: ['12:00'],
    instructions: 'Take with lunch',
    startDate: '2025-09-25',
    endDate: null,
    isActive: true,
    createdAt: '2025-09-25T10:00:00Z',
  },
  
  // Suresh Reddy's Medications (Patient ID: 4)
  {
    id: '7',
    patientId: '4',
    name: 'Amlodipine',
    dosage: '5mg',
    frequency: 'once daily',
    timing: ['10:00'],
    instructions: 'Take for high blood pressure',
    startDate: '2025-08-10',
    endDate: null,
    isActive: true,
    createdAt: '2025-08-10T09:30:00Z',
  },
  {
    id: '8',
    patientId: '4',
    name: 'Omeprazole',
    dosage: '20mg',
    frequency: 'once daily',
    timing: ['08:00'],
    instructions: 'Take before breakfast for acid reflux',
    startDate: '2025-08-15',
    endDate: null,
    isActive: false, // Inactive medication
    createdAt: '2025-08-15T11:00:00Z',
  },
];

// Mock Doses Data
const MOCK_DOSES = [
  // TODAY'S DOSES (Oct 12, 2025) - Amit Sharma (Patient ID: 2)
  {
    id: '1',
    medicationId: '1',
    patientId: '2',
    scheduledTime: '2025-10-12T08:00:00Z',
    status: 'taken',
    takenAt: '2025-10-12T08:15:00Z',
    medication: {
      name: 'Metformin',
      dosage: '500mg',
    },
  },
  {
    id: '2',
    medicationId: '1',
    patientId: '2',
    scheduledTime: '2025-10-12T20:00:00Z',
    status: 'pending',
    takenAt: null,
    medication: {
      name: 'Metformin',
      dosage: '500mg',
    },
  },
  {
    id: '3',
    medicationId: '2',
    patientId: '2',
    scheduledTime: '2025-10-12T09:00:00Z',
    status: 'taken',
    takenAt: '2025-10-12T09:05:00Z',
    medication: {
      name: 'Lisinopril',
      dosage: '10mg',
    },
  },
  {
    id: '4',
    medicationId: '3',
    patientId: '2',
    scheduledTime: '2025-10-12T21:00:00Z',
    status: 'pending',
    takenAt: null,
    medication: {
      name: 'Atorvastatin',
      dosage: '20mg',
    },
  },
  
  // YESTERDAY'S DOSES (Oct 11, 2025) - Amit Sharma
  {
    id: '5',
    medicationId: '1',
    patientId: '2',
    scheduledTime: '2025-10-11T08:00:00Z',
    status: 'taken',
    takenAt: '2025-10-11T08:10:00Z',
    medication: {
      name: 'Metformin',
      dosage: '500mg',
    },
  },
  {
    id: '6',
    medicationId: '1',
    patientId: '2',
    scheduledTime: '2025-10-11T20:00:00Z',
    status: 'missed',
    takenAt: null,
    medication: {
      name: 'Metformin',
      dosage: '500mg',
    },
  },
  {
    id: '7',
    medicationId: '2',
    patientId: '2',
    scheduledTime: '2025-10-11T09:00:00Z',
    status: 'taken',
    takenAt: '2025-10-11T09:20:00Z',
    medication: {
      name: 'Lisinopril',
      dosage: '10mg',
    },
  },
  
  // TODAY'S DOSES - Priya Patel (Patient ID: 3)
  {
    id: '8',
    medicationId: '4',
    patientId: '3',
    scheduledTime: '2025-10-12T08:00:00Z',
    status: 'taken',
    takenAt: '2025-10-12T08:05:00Z',
    medication: {
      name: 'Aspirin',
      dosage: '75mg',
    },
  },
  {
    id: '9',
    medicationId: '5',
    patientId: '3',
    scheduledTime: '2025-10-12T07:00:00Z',
    status: 'taken',
    takenAt: '2025-10-12T07:02:00Z',
    medication: {
      name: 'Levothyroxine',
      dosage: '50mcg',
    },
  },
  {
    id: '10',
    medicationId: '6',
    patientId: '3',
    scheduledTime: '2025-10-12T12:00:00Z',
    status: 'pending',
    takenAt: null,
    medication: {
      name: 'Vitamin D3',
      dosage: '1000 IU',
    },
  },
  
  // YESTERDAY'S DOSES - Priya Patel
  {
    id: '11',
    medicationId: '4',
    patientId: '3',
    scheduledTime: '2025-10-11T08:00:00Z',
    status: 'taken',
    takenAt: '2025-10-11T08:10:00Z',
    medication: {
      name: 'Aspirin',
      dosage: '75mg',
    },
  },
  {
    id: '12',
    medicationId: '5',
    patientId: '3',
    scheduledTime: '2025-10-11T07:00:00Z',
    status: 'taken',
    takenAt: '2025-10-11T07:05:00Z',
    medication: {
      name: 'Levothyroxine',
      dosage: '50mcg',
    },
  },
  
  // TODAY'S DOSES - Suresh Reddy (Patient ID: 4)
  {
    id: '13',
    medicationId: '7',
    patientId: '4',
    scheduledTime: '2025-10-12T10:00:00Z',
    status: 'pending',
    takenAt: null,
    medication: {
      name: 'Amlodipine',
      dosage: '5mg',
    },
  },
];

// Mock Notifications Data
const MOCK_NOTIFICATIONS = [
  // Patient (Amit Sharma) Notifications
  {
    id: '1',
    userId: '2',
    type: 'dose_reminder',
    message: 'Time to take Metformin 500mg at 8:00 PM',
    isRead: false,
    createdAt: '2025-10-12T19:55:00Z',
  },
  {
    id: '2',
    userId: '2',
    type: 'medication_added',
    message: 'New medication Atorvastatin has been added to your schedule',
    isRead: false,
    createdAt: '2025-10-01T11:05:00Z',
  },
  {
    id: '3',
    userId: '2',
    type: 'dose_reminder',
    message: 'Time to take Atorvastatin 20mg at 9:00 PM',
    isRead: true,
    createdAt: '2025-10-12T20:55:00Z',
  },
  {
    id: '4',
    userId: '2',
    type: 'medication_added',
    message: 'Dr. Rajesh Kumar added Lisinopril to your medications',
    isRead: true,
    createdAt: '2025-09-15T10:40:00Z',
  },
  
  // Caretaker (Dr. Rajesh Kumar) Notifications
  {
    id: '5',
    userId: '1',
    type: 'adherence_alert',
    message: 'Amit Sharma missed Metformin dose (8:00 PM yesterday)',
    isRead: false,
    createdAt: '2025-10-11T20:30:00Z',
  },
  {
    id: '6',
    userId: '1',
    type: 'patient_linked',
    message: 'Priya Patel has accepted your invitation',
    isRead: false,
    createdAt: '2025-09-20T14:35:00Z',
  },
  {
    id: '7',
    userId: '1',
    type: 'adherence_success',
    message: 'Priya Patel is maintaining 92% adherence rate - Excellent!',
    isRead: true,
    createdAt: '2025-10-10T09:00:00Z',
  },
  {
    id: '8',
    userId: '1',
    type: 'patient_linked',
    message: 'Amit Sharma has accepted your invitation',
    isRead: true,
    createdAt: '2025-09-15T10:05:00Z',
  },
  {
    id: '9',
    userId: '1',
    type: 'adherence_alert',
    message: 'Suresh Reddy adherence dropped to 78% - Consider follow-up',
    isRead: true,
    createdAt: '2025-10-08T15:00:00Z',
  },
];

// Mock Adherence Report Data
const MOCK_ADHERENCE_REPORT = {
  patientId: '2',
  patientName: 'Amit Sharma',
  period: 30,
  overallAdherence: 85,
  totalDoses: 60,
  takenDoses: 51,
  missedDoses: 9,
  dailyData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adherence: Math.floor(Math.random() * 30) + 70, // Random 70-100%
    taken: Math.floor(Math.random() * 2) + 1,
    missed: Math.random() > 0.8 ? 1 : 0,
  })),
  medicationWise: [
    {
      medicationName: 'Metformin',
      adherence: 83,
      total: 60,
      taken: 50,
      missed: 10,
    },
    {
      medicationName: 'Lisinopril',
      adherence: 90,
      total: 30,
      taken: 27,
      missed: 3,
    },
  ],
};

// Helper function to simulate API delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API Functions
export const mockAuthAPI = {
  // Login
  login: async ({ email, password }) => {
    await delay();
    
    const user = Object.values(MOCK_USERS).find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      token: MOCK_TOKEN,
      user: userWithoutPassword,
    };
  },

  // Register
  register: async (data) => {
    await delay();
    
    const newUser = {
      id: String(Object.keys(MOCK_USERS).length + 1),
      ...data,
      createdAt: new Date().toISOString(),
    };

    const { password: _, ...userWithoutPassword } = newUser;
    return {
      token: MOCK_TOKEN,
      user: userWithoutPassword,
    };
  },

  // Get current user
  getCurrentUser: async () => {
    await delay();
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const userRole = localStorage.getItem('userRole') || 'patient';
    const user = MOCK_USERS[userRole];
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};

export const mockPatientAPI = {
  // Get all patients (for caretaker)
  getAll: async () => {
    await delay();
    return MOCK_PATIENTS;
  },

  // Get patient by ID
  getById: async (id) => {
    await delay();
    const patient = MOCK_PATIENTS.find((p) => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return patient;
  },
};

export const mockLinkAPI = {
  // Send invitation
  invite: async (data) => {
    await delay();
    return {
      message: 'Invitation sent successfully',
      invitationId: String(Date.now()),
    };
  },

  // Get pending invitations
  getPending: async () => {
    await delay();
    return [
      {
        id: '1',
        caretakerName: 'Dr. Rajesh Kumar',
        caretakerEmail: 'caretaker@demo.com',
        status: 'pending',
        createdAt: '2025-10-10T10:00:00Z',
      },
    ];
  },

  // Accept invitation
  accept: async (id) => {
    await delay();
    return { message: 'Invitation accepted successfully' };
  },
};

export const mockMedicationAPI = {
  // Get medications for a patient
  getByPatient: async (patientId) => {
    await delay();
    return MOCK_MEDICATIONS.filter((m) => m.patientId === patientId);
  },

  // Get all medications (for current patient)
  getAll: async () => {
    await delay();
    return MOCK_MEDICATIONS.filter((m) => m.patientId === '2');
  },

  // Create medication
  create: async (data) => {
    await delay();
    const newMed = {
      id: String(MOCK_MEDICATIONS.length + 1),
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    MOCK_MEDICATIONS.push(newMed);
    return newMed;
  },

  // Update medication
  update: async (id, data) => {
    await delay();
    const index = MOCK_MEDICATIONS.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Medication not found');
    
    MOCK_MEDICATIONS[index] = {
      ...MOCK_MEDICATIONS[index],
      ...data,
    };
    return MOCK_MEDICATIONS[index];
  },

  // Delete medication
  delete: async (id) => {
    await delay();
    const index = MOCK_MEDICATIONS.findIndex((m) => m.id === id);
    if (index === -1) throw new Error('Medication not found');
    
    MOCK_MEDICATIONS.splice(index, 1);
    return { message: 'Medication deleted successfully' };
  },
};

export const mockDoseAPI = {
  // Get today's doses
  getToday: async () => {
    await delay();
    const today = new Date().toISOString().split('T')[0];
    return MOCK_DOSES.filter((d) => d.scheduledTime.startsWith(today));
  },

  // Get dose history
  getHistory: async () => {
    await delay();
    return MOCK_DOSES;
  },

  // Mark dose as taken
  markAsTaken: async (id) => {
    await delay();
    const dose = MOCK_DOSES.find((d) => d.id === id);
    if (!dose) throw new Error('Dose not found');
    
    dose.status = 'taken';
    dose.takenAt = new Date().toISOString();
    return dose;
  },

  // Mark dose as missed
  markAsMissed: async (id) => {
    await delay();
    const dose = MOCK_DOSES.find((d) => d.id === id);
    if (!dose) throw new Error('Dose not found');
    
    dose.status = 'missed';
    return dose;
  },
};

export const mockNotificationAPI = {
  // Get all notifications
  getAll: async () => {
    await delay();
    const userRole = localStorage.getItem('userRole') || 'patient';
    const userId = userRole === 'caretaker' ? '1' : '2';
    return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId);
  },

  // Mark as read
  markAsRead: async (id) => {
    await delay();
    const notification = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (!notification) throw new Error('Notification not found');
    
    notification.isRead = true;
    return notification;
  },

  // Mark all as read
  markAllAsRead: async () => {
    await delay();
    MOCK_NOTIFICATIONS.forEach((n) => (n.isRead = true));
    return { message: 'All notifications marked as read' };
  },

  // Delete notification
  delete: async (id) => {
    await delay();
    const index = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
    if (index === -1) throw new Error('Notification not found');
    
    MOCK_NOTIFICATIONS.splice(index, 1);
    return { message: 'Notification deleted successfully' };
  },
};

export const mockReportAPI = {
  // Get adherence report
  getAdherence: async (patientId, days = 30) => {
    await delay();
    return MOCK_ADHERENCE_REPORT;
  },
};

// Mock Donor Data
const MOCK_DONOR_PROFILE = {
  id: '4',
  fullName: 'Vikram Singh',
  email: 'donor@demo.com',
  phone: '+91 98123 45678',
  bloodGroup: 'O+',
  dateOfBirth: '1995-03-15',
  city: 'Mumbai',
  address: '123 Main Street, Andheri West, Mumbai 400053',
  isAvailable: true,
  totalDonations: 8,
  memberSince: '2022-05-10T00:00:00Z',
};

const MOCK_ACTIVE_REQUESTS = [
  {
    _id: 'req1',
    hospitalName: 'Lilavati Hospital',
    location: 'Bandra West, Mumbai',
    bloodGroup: 'O+',
    unitsNeeded: 2,
    urgencyLevel: 'High',
    contactNumber: '+91 22 2640 5000',
    distanceKm: 4.5,
    datePosted: '2024-12-09T08:00:00Z',
    notes: 'Urgent! Patient scheduled for emergency surgery.',
  },
  {
    _id: 'req2',
    hospitalName: 'Breach Candy Hospital',
    location: 'Bhulabhai Desai Road, Mumbai',
    bloodGroup: 'O+',
    unitsNeeded: 1,
    urgencyLevel: 'Medium',
    contactNumber: '+91 22 2367 3888',
    distanceKm: 6.2,
    datePosted: '2024-12-09T10:30:00Z',
    notes: 'Required for post-operative care.',
  },
  {
    _id: 'req3',
    hospitalName: 'Nanavati Hospital',
    location: 'Vile Parle West, Mumbai',
    bloodGroup: 'O+',
    unitsNeeded: 3,
    urgencyLevel: 'High',
    contactNumber: '+91 22 2626 7777',
    distanceKm: 8.1,
    datePosted: '2024-12-08T14:00:00Z',
    notes: 'Critical patient. Please respond urgently.',
  },
];

const MOCK_DONATIONS = [
  {
    _id: 'don1',
    hospitalName: 'Lilavati Hospital',
    location: 'Bandra West, Mumbai',
    bloodGroup: 'O+',
    units: 1,
    date: '2024-12-05T09:00:00Z',
    donationId: 'DON-2024-105',
    notes: 'Emergency donation for accident victim.',
  },
  {
    _id: 'don2',
    hospitalName: 'KEM Hospital',
    location: 'Parel, Mumbai',
    bloodGroup: 'O+',
    units: 1,
    date: '2024-10-20T11:00:00Z',
    donationId: 'DON-2024-087',
    notes: 'Regular donation drive.',
  },
  {
    _id: 'don3',
    hospitalName: 'Hinduja Hospital',
    location: 'Mahim, Mumbai',
    bloodGroup: 'O+',
    units: 1,
    date: '2024-07-12T10:30:00Z',
    donationId: 'DON-2024-045',
    notes: 'Blood donation camp.',
  },
  {
    _id: 'don4',
    hospitalName: 'Breach Candy Hospital',
    location: 'Bhulabhai Desai Road, Mumbai',
    bloodGroup: 'O+',
    units: 1,
    date: '2024-04-08T09:00:00Z',
    donationId: 'DON-2024-012',
  },
  {
    _id: 'don5',
    hospitalName: 'Nanavati Hospital',
    location: 'Vile Parle West, Mumbai',
    bloodGroup: 'O+',
    units: 1,
    date: '2024-01-25T14:00:00Z',
    donationId: 'DON-2024-003',
  },
];

export const mockDonorAPI = {
  getProfile: async () => {
    await delay();
    return MOCK_DONOR_PROFILE;
  },
  
  updateProfile: async (profileData) => {
    await delay();
    Object.assign(MOCK_DONOR_PROFILE, profileData);
    return MOCK_DONOR_PROFILE;
  },
  
  toggleAvailability: async () => {
    await delay();
    MOCK_DONOR_PROFILE.isAvailable = !MOCK_DONOR_PROFILE.isAvailable;
    return MOCK_DONOR_PROFILE;
  },
  
  getStats: async () => {
    await delay();
    return {
      totalDonations: MOCK_DONOR_PROFILE.totalDonations,
      livesSaved: MOCK_DONOR_PROFILE.totalDonations * 3,
    };
  },
  
  getActiveRequests: async () => {
    await delay();
    return MOCK_ACTIVE_REQUESTS;
  },
  
  acceptRequest: async (requestId) => {
    await delay();
    return { 
      message: 'Request accepted successfully!',
      requestId,
    };
  },
  
  getDonations: async () => {
    await delay();
    return MOCK_DONATIONS;
  },
  
  getRecentDonations: async () => {
    await delay();
    return MOCK_DONATIONS.slice(0, 3);
  },
};

// Export all mock APIs
export const mockAPI = {
  auth: mockAuthAPI,
  patients: mockPatientAPI,
  links: mockLinkAPI,
  medications: mockMedicationAPI,
  doses: mockDoseAPI,
  notifications: mockNotificationAPI,
  reports: mockReportAPI,
  donor: mockDonorAPI,
};
