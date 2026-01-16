import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { adminAPI } from '../../services/adminApi';
import { toast } from 'react-toastify';
import {
  Plus,
  Send,
  MapPin,
  Calendar,
  AlertCircle,
  HeartHandshake,
  X
} from 'lucide-react';

const DonationsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('requests');
  
  const [newRequest, setNewRequest] = useState({
    hospital_name: '',
    location: '',
    blood_group: 'O+',
    units_needed: 1,
    urgency_level: 'Medium',
    contact_number: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'requests') {
        const response = await adminAPI.getDonationRequests({ page: 1, limit: 50 });
        setRequests(response.data || []);
      } else {
        const response = await adminAPI.getDonations({ page: 1, limit: 50 });
        setDonations(response.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (activeTab === 'requests') {
        setRequests([]);
      } else {
        setDonations([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async () => {
    if (!newRequest.hospital_name || !newRequest.location || !newRequest.contact_number) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await adminAPI.createDonationRequest(newRequest);
      toast.success('Blood donation request created successfully!');
      setShowCreateModal(false);
      setNewRequest({
        hospital_name: '',
        location: '',
        blood_group: 'O+',
        units_needed: 1,
        urgency_level: 'Medium',
        contact_number: '',
        notes: ''
      });
      loadData();
    } catch (error) {
      console.error('Create error:', error);
      toast.error(error.response?.data?.message || 'Failed to create request');
    }
  };

  const handleNotifyDonors = async (requestId) => {
    try {
      const response = await adminAPI.notifyDonorsAboutRequest(requestId);
      const successMessage = response.data?.message || response.message || 'All matching donors have been notified!';
      toast.success(successMessage);
    } catch (error) {
      console.error('Notify error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to notify donors';
      toast.error(errorMessage);
    }
  };

  const getUrgencyBadge = (level) => {
    const colors = {
      Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[level] || colors.Medium}`}>
        {level}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blood Donation Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create and manage blood donation requests
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Request</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Donation Requests
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'donations'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Completed Donations
            </button>
          </nav>
        </div>

        {/* Requests Table */}
        {activeTab === 'requests' && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Hospital & Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Urgency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                          <AlertCircle className="w-12 h-12 mb-3" />
                          <p className="text-lg font-medium">No donation requests found</p>
                          <p className="text-sm">Create a new request to get started</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    requests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <HeartHandshake className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {request.hospital_name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {request.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                            {request.blood_group}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {request.units_needed} {request.units_needed === 1 ? 'unit' : 'units'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getUrgencyBadge(request.urgency_level)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {request.contact_number}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleNotifyDonors(request.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                            title="Notify all matching donors"
                          >
                            <Send className="w-4 h-4" />
                            <span>Notify Donors</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Donations Table */}
        {activeTab === 'donations' && (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Donor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Hospital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                          <AlertCircle className="w-12 h-12 mb-3" />
                          <p className="text-lg font-medium">No donations found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    donations.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {donation.donor?.name || 'Unknown'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {donation.donor?.email || ''}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {donation.hospital_name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {donation.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                            {donation.blood_group}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {donation.units}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(donation.date).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Request Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-gray-900/50 transition-opacity"
                onClick={() => setShowCreateModal(false)}
              ></div>

              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Create Blood Donation Request
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hospital Name *
                      </label>
                      <input
                        type="text"
                        value={newRequest.hospital_name}
                        onChange={(e) => setNewRequest({ ...newRequest, hospital_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hospital name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={newRequest.location}
                        onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Blood Group *
                      </label>
                      <select
                        value={newRequest.blood_group}
                        onChange={(e) => setNewRequest({ ...newRequest, blood_group: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
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
                        Units Needed *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newRequest.units_needed}
                        onChange={(e) => setNewRequest({ ...newRequest, units_needed: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Urgency Level *
                      </label>
                      <select
                        value={newRequest.urgency_level}
                        onChange={(e) => setNewRequest({ ...newRequest, urgency_level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        value={newRequest.contact_number}
                        onChange={(e) => setNewRequest({ ...newRequest, contact_number: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter contact number"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={newRequest.notes}
                        onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter additional notes..."
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateRequest}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                    >
                      Create Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DonationsManagement;
