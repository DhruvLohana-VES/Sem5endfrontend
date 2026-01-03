import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorAPI } from '../../services/api';
import { MapPin, Droplet, Phone, Building2, Calendar, Filter, AlertCircle, CheckCircle2, Info, X, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const Requests = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const queryClient = useQueryClient();

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['activeRequests'],
    queryFn: donorAPI.getActiveRequests,
    retry: 2,
  });

  const acceptRequestMutation = useMutation({
    mutationFn: donorAPI.acceptRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeRequests'] });
      toast.success('Request accepted! Hospital will contact you shortly.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    },
  });

  const handleAcceptRequest = (requestId) => {
    if (window.confirm('Are you sure you want to accept this blood donation request?')) {
      acceptRequestMutation.mutate(requestId);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  const bloodGroups = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels = ['all', 'High', 'Medium', 'Low'];

  const filteredRequests = requests?.filter((request) => {
    if (selectedBloodGroup !== 'all' && request.bloodGroup !== selectedBloodGroup) {
      return false;
    }
    if (selectedUrgency !== 'all' && request.urgencyLevel !== selectedUrgency) {
      return false;
    }
    return true;
  });

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'Low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Blood Requests</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredRequests?.length || 0} requests available
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blood Group
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all hover:border-primary-400"
              >
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group === 'all' ? 'All Blood Groups' : group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Urgency Level
              </label>
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all hover:border-primary-400"
              >
                {urgencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Urgencies' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 animate-fadeIn animate-delay-150">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Blood Compatibility Guide</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-blue-800 dark:text-blue-300">
                <div className="bg-white dark:bg-blue-900/30 rounded p-2">
                  <span className="font-bold">O-:</span> Universal Donor
                </div>
                <div className="bg-white dark:bg-blue-900/30 rounded p-2">
                  <span className="font-bold">AB+:</span> Universal Receiver
                </div>
                <div className="bg-white dark:bg-blue-900/30 rounded p-2">
                  <span className="font-bold">O+:</span> Most Common
                </div>
                <div className="bg-white dark:bg-blue-900/30 rounded p-2">
                  <span className="font-bold">AB-:</span> Rarest Type
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredRequests && filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn animate-delay-200">
            {filteredRequests.map((request, index) => (
              <div
                key={request._id}
                className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl border border-blue-200 dark:border-blue-800 p-6 transform hover:scale-[1.02] transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 p-3 rounded-full shadow-lg">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {request.hospitalName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.location}
                      </p>
                    </div>
                  </div>
                  <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {request.bloodGroup}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="text-sm">{request.distanceKm} km away</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgencyLevel)}`}>
                      {request.urgencyLevel} Priority
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Droplet className="h-5 w-5 mr-2 text-red-500" />
                    <span className="text-sm">{request.unitsNeeded} unit(s) needed</span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Phone className="h-5 w-5 mr-2 text-green-500" />
                    <span className="text-sm">{request.contactNumber}</span>
                  </div>

                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                    <span className="text-sm">Posted {format(new Date(request.datePosted), 'MMM dd, yyyy')}</span>
                  </div>
                </div>

                {request.notes && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      {request.notes}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedRequest(request)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  View Details & Accept
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-12 text-center animate-fadeIn animate-delay-200">
            <AlertCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Requests Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no active blood donation requests matching your filters.
            </p>
          </div>
        )}

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full">
                      <Building2 className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedRequest.hospitalName}</h2>
                      <p className="text-red-100">{selectedRequest.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 hover:bg-red-700 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Blood Type & Urgency */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Blood Group</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{selectedRequest.bloodGroup}</p>
                  </div>
                  <div className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Urgency</p>
                    <p className={`text-2xl font-bold ${selectedRequest.urgencyLevel === 'High' ? 'text-red-600' : selectedRequest.urgencyLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {selectedRequest.urgencyLevel}
                    </p>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Droplet className="h-5 w-5 mr-2 text-red-500" />
                      <span className="text-sm font-medium">Units Needed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedRequest.unitsNeeded}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Distance</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedRequest.distanceKm} km</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Phone className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-sm font-medium">Contact</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedRequest.contactNumber}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Clock className="h-5 w-5 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">Posted</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{format(new Date(selectedRequest.datePosted), 'MMM dd, yyyy')}</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedRequest.notes && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-yellow-900 dark:text-yellow-300 mb-1">Additional Information</p>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">{selectedRequest.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Important Information */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Before You Donate:</h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Ensure you've eaten a healthy meal</li>
                    <li>• Stay well-hydrated before donation</li>
                    <li>• Bring a valid ID and your donor card (if available)</li>
                    <li>• Allow 45-60 minutes for the donation process</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleAcceptRequest(selectedRequest._id);
                      setSelectedRequest(null);
                    }}
                    disabled={acceptRequestMutation.isPending}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    {acceptRequestMutation.isPending ? 'Accepting...' : 'Accept & Commit'}
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="px-6 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Requests;
