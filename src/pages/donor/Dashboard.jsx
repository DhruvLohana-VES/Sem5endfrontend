import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorAPI } from '../../services/api';
import { Droplet, Calendar, TrendingUp, MapPin, AlertCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const DonorDashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['donorStats'],
    queryFn: donorAPI.getStats,
    retry: 2,
  });

  const { data: activeRequests, isLoading: requestsLoading, error: requestsError } = useQuery({
    queryKey: ['activeRequests'],
    queryFn: donorAPI.getActiveRequests,
    retry: 2,
  });

  const { data: recentDonations, isLoading: donationsLoading, error: donationsError } = useQuery({
    queryKey: ['recentDonations'],
    queryFn: donorAPI.getRecentDonations,
    retry: 2,
  });

  if (statsLoading || requestsLoading || donationsLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donor Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Ready to save lives today?
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg">
              <Droplet className="h-5 w-5 mr-2" />
              <span className="font-semibold">Available to Donate</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn animate-delay-100">
          <div className="bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-red-200 dark:border-red-800 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Donations</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {stats?.totalDonations || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Units donated</p>
              </div>
              <div className="bg-red-500 p-3 rounded-full shadow-lg">
                <Droplet className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-blue-800 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Requests</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {activeRequests?.length || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">In your area</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-green-200 dark:border-green-800 p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lives Saved</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {(stats?.totalDonations || 0) * 3}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Est. impact</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nearby Emergency Requests</h2>
            <Link
              to="/donor/requests"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center transform hover:scale-105 transition-all"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {activeRequests && activeRequests.length > 0 ? (
            <div className="space-y-3">
              {activeRequests.slice(0, 3).map((request) => (
                <div
                  key={request._id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {request.hospitalName}
                        </h3>
                        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {request.bloodGroup}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(request.urgencyLevel)}`}>
                          {request.urgencyLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {request.distanceKm} km away
                        </div>
                        <div className="flex items-center">
                          <Droplet className="h-4 w-4 mr-1" />
                          {request.unitsNeeded} unit(s)
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/donor/requests"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium transform hover:scale-105"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No active requests in your area</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Donations</h2>
            <Link
              to="/donor/donations"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center transform hover:scale-105 transition-all"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {recentDonations && recentDonations.length > 0 ? (
            <div className="space-y-3">
              {recentDonations.slice(0, 3).map((donation) => (
                <div
                  key={donation._id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <Droplet className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {donation.hospitalName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(new Date(donation.date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No donation history yet</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn animate-delay-400">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-yellow-800 dark:text-yellow-300">
                <p className="font-medium mb-1">Important Reminder</p>
                <p>Maintain at least 3 months gap between whole blood donations. Ensure you're well-rested and hydrated before donating.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">Quick Tip</p>
                <p>Regular donors can give blood every 3 months. Mark your calendar and help save lives consistently!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonorDashboard;
