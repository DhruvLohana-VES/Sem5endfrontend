import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { medicationAPI } from '../../services/api';
import { Pill, Search, Filter, CheckCircle, Clock } from 'lucide-react';

const PatientMedications = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive

  // Fetch medications
  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', user?.id],
    queryFn: async () => {
      const response = await medicationAPI.getByPatient(user?.id);
      return response.data;
    },
  });

  // Filter medications
  const filteredMedications = medications?.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'active' && med.isActive) ||
      (filterStatus === 'inactive' && !med.isActive);
    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Medications</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View all your prescribed medications
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-4 animate-fadeIn animate-delay-100">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-primary-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="sm:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-primary-500" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Medications List */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl animate-fadeIn animate-delay-200">
          {filteredMedications.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {filteredMedications.map((medication) => (
                <div
                  key={medication._id}
                  className="p-6 hover:bg-blue-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className={`p-3 rounded-full shadow-lg ${medication.isActive ? 'bg-gradient-to-br from-success-500 to-success-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                        <Pill className="h-6 w-6 text-white" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {medication.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                              medication.isActive
                                ? 'bg-green-100 dark:bg-green-900 text-success dark:text-green-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {medication.isActive ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </div>

                        {/* Dosage */}
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          <span className="font-medium">Dosage:</span> {medication.dosage}
                        </p>

                        {/* Schedule */}
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          <span className="font-medium">Schedule:</span>{' '}
                          <span className="capitalize">{medication.scheduleType}</span>
                          {medication.scheduleDetails && (
                            <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                              ({medication.scheduleDetails})
                            </span>
                          )}
                        </p>

                        {/* Instructions */}
                        {medication.instructions && (
                          <div className="mt-2 p-3 bg-blue-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Instructions:</span>{' '}
                              {medication.instructions}
                            </p>
                          </div>
                        )}

                        {/* Added by */}
                        {medication.addedBy && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Added by: {medication.addedBy.fullName || medication.addedBy.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg mb-6">
                <Pill className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No medications found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filterStatus !== 'all'
                  ? 'Try adjusting your search or filter'
                  : 'Contact your caretaker to add medications'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientMedications;
