import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminAPI } from '../../services/adminApi';
import { toast } from 'react-toastify';
import { 
  Search, 
  Eye, 
  Edit, 
  UserPlus, 
  Users, 
  Pill, 
  Activity,
  TrendingUp,
  Calendar,
  X
} from 'lucide-react';

const PatientsManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const [adherenceData, setAdherenceData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    blood_group: '',
    city: ''
  });

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getPatients({
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm })
      });
      setPatients(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      toast.error('Failed to load patients');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const viewPatientDetails = async (patientId) => {
    try {
      setLoadingDetails(true);
      const [patientRes, medsRes, adherenceRes] = await Promise.all([
        adminAPI.getPatientById(patientId),
        adminAPI.getPatientMedications(patientId),
        adminAPI.getPatientAdherence(patientId, 30)
      ]);
      
      setSelectedPatient(patientRes.data);
      setMedications(medsRes.data);
      setAdherenceData(adherenceRes.data);
      setShowDetails(true);
    } catch (error) {
      toast.error('Failed to load patient details');
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const openEditModal = (patient) => {
    setEditForm({
      name: patient.name || '',
      phone: patient.phone || '',
      age: patient.age || '',
      gender: patient.gender || '',
      blood_group: patient.blood_group || '',
      city: patient.city || ''
    });
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return;

    try {
      await adminAPI.updatePatient(selectedPatient.id, editForm);
      toast.success('Patient updated successfully!');
      setShowEditModal(false);
      fetchPatients(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update patient');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading && patients.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading patients...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Patient Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage patients, view health records, and monitor adherence
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Patient
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Caretakers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {patients.map((patient) => (
                  <tr 
                    key={patient.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {patient.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {patient.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {patient.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {patient.email}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {patient.phone || 'No phone'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {patient.age} yrs, {patient.gender}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {patient.blood_group} • {patient.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        <Users className="w-4 h-4 mr-1" />
                        {patient.caretakerCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => viewPatientDetails(patient.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => openEditModal(patient)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" 
                        title="Edit Patient"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Patient Details Modal */}
        {showDetails && selectedPatient && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <div
                className="fixed inset-0 bg-gray-900/50 transition-opacity"
                onClick={() => setShowDetails(false)}
              ></div>

              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-900 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 z-10">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Patient Details
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {loadingDetails ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.phone || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.age || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {selectedPatient.gender || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Blood Group</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.blood_group || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedPatient.city || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <Pill className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {medications.length}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Medications</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <Activity className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {selectedPatient.stats?.totalDoses || 0}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Total Doses</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {selectedPatient.stats?.caretakerCount || 0}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Caretakers</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {adherenceData?.adherenceRate ? `${adherenceData.adherenceRate.toFixed(1)}%` : 'N/A'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Adherence (30d)</p>
                      </div>
                    </div>

                    {/* Adherence Details */}
                    {adherenceData && (
                      <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Adherence Overview (Last 30 Days)
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Scheduled Doses</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {adherenceData.scheduledDoses || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Taken Doses</p>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                              {adherenceData.takenDoses || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Missed Doses</p>
                            <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                              {adherenceData.missedDoses || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Medications List */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Current Medications
                      </h4>
                      {medications.length > 0 ? (
                        <div className="space-y-2">
                          {medications.map((med) => (
                            <div
                              key={med.id}
                              className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900"
                            >
                              <div className="flex items-center flex-1">
                                <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {med.medication_name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {med.dosage} • {med.frequency}
                                  </p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                med.status === 'active'
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                              }`}>
                                {med.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                          No medications found
                        </p>
                      )}
                    </div>

                    {/* Assigned Caretakers */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                        Assigned Caretakers
                      </h4>
                      {selectedPatient.caretakers && selectedPatient.caretakers.length > 0 ? (
                        <div className="space-y-2">
                          {selectedPatient.caretakers.map((link) => (
                            <div
                              key={link.id}
                              className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {link.caretaker.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {link.caretaker.email}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  link.status === 'active'
                                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                {link.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                          No caretakers assigned
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Edit Patient Modal */}
        {showEditModal && selectedPatient && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-gray-900/50 transition-opacity"
                onClick={() => setShowEditModal(false)}
              ></div>

              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Patient
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={editForm.age}
                        onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        value={editForm.gender}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={editForm.blood_group}
                        onChange={(e) => setEditForm({ ...editForm, blood_group: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PatientsManagement;
