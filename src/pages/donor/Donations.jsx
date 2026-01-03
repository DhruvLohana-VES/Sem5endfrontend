import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorAPI } from '../../services/api';
import { Droplet, Calendar, Building2, MapPin, Award, TrendingUp, Heart, Star, X, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const Donations = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { data: donations, isLoading, error } = useQuery({
    queryKey: ['donations'],
    queryFn: donorAPI.getDonations,
    retry: 2,
  });

  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['donorStats'],
    queryFn: donorAPI.getStats,
    retry: 2,
  });

  if (isLoading || statsLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Donations</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your complete donation history
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn animate-delay-100">
          <div className="bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-red-200 dark:border-red-800 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Donations</p>
                <p className="text-4xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {stats?.totalDonations || 0}
                </p>
              </div>
              <div className="bg-red-500 p-4 rounded-full shadow-lg">
                <Droplet className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-green-200 dark:border-green-800 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lives Saved</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {(stats?.totalDonations || 0) * 3}
                </p>
              </div>
              <div className="bg-green-500 p-4 rounded-full shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-purple-200 dark:border-purple-800 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Units</p>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                  {stats?.totalDonations || 0}
                </p>
              </div>
              <div className="bg-purple-500 p-4 rounded-full shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-yellow-200 dark:border-yellow-800 p-6 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Badge Level</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {stats?.totalDonations >= 25 ? '🏆 Gold' : stats?.totalDonations >= 10 ? '🥈 Silver' : '🥉 Bronze'}
                </p>
              </div>
              <div className="bg-yellow-500 p-4 rounded-full shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Donation History
          </h2>

          {donations && donations.length > 0 ? (
            <div className="space-y-4">
              {donations.map((donation, index) => (
                <div
                  key={donation._id}
                  onClick={() => setSelectedDonation(donation)}
                  className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-green-500 p-3 rounded-full shadow-lg flex-shrink-0">
                        <Droplet className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                          {donation.hospitalName}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-sm">{donation.location}</span>
                          </div>

                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                            <span className="text-sm">
                              {format(new Date(donation.date), 'MMMM dd, yyyy')}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Droplet className="h-4 w-4 mr-2 text-red-500" />
                            <span className="text-sm">{donation.bloodGroup} - {donation.units} unit(s)</span>
                          </div>

                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Building2 className="h-4 w-4 mr-2 text-green-500" />
                            <span className="text-sm">ID: {donation.donationId}</span>
                          </div>
                        </div>

                        {donation.notes && (
                          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                              {donation.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-semibold ml-4 flex-shrink-0">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Droplet className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Donations Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start saving lives by accepting blood donation requests
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn animate-delay-300">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Achievement Progress
                </h3>
                <div className="space-y-4">
                  {/* Bronze Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🥉 Bronze Badge (1-9)</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.min(stats?.totalDonations || 0, 9)}/9
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((stats?.totalDonations || 0) / 9 * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Silver Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🥈 Silver Badge (10-24)</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.max(0, Math.min((stats?.totalDonations || 0) - 9, 15))}/15
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-gray-300 to-gray-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats?.totalDonations || 0) >= 10 ? Math.min(((stats?.totalDonations || 0) - 9) / 15 * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Gold Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🏆 Gold Badge (25+)</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {(stats?.totalDonations || 0) >= 25 ? '✅ Unlocked!' : `${Math.max(0, 25 - (stats?.totalDonations || 0))} more`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(stats?.totalDonations || 0) >= 25 ? 100 : ((stats?.totalDonations || 0) / 25 * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Impact Summary
                </h3>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-blue-900/30 rounded-lg">
                    <span>Potential Lives Saved</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{(stats?.totalDonations || 0) * 3}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-blue-900/30 rounded-lg">
                    <span>Blood Units Donated</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{stats?.totalDonations || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-blue-900/30 rounded-lg">
                    <span>Hospitals Helped</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{Math.min(stats?.totalDonations || 0, 5)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-blue-900/30 rounded-lg">
                    <span>Hero Score</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{(stats?.totalDonations || 0) * 100}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 animate-fadeIn animate-delay-400">
          <div className="flex items-start gap-4">
            <Heart className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Thank You, Hero! 🎖️
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Every donation you make saves up to 3 lives. You're making a real difference in your community!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-400">Next Milestone</p>
                  <p className="font-bold text-green-600 dark:text-green-400">
                    {stats?.totalDonations >= 25 ? '🏆 Maxed!' : stats?.totalDonations >= 10 ? 'Gold Badge' : stats?.totalDonations >= 1 ? 'Silver Badge' : 'Bronze Badge'}
                  </p>
                </div>
                <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-400">Community Rank</p>
                  <p className="font-bold text-green-600 dark:text-green-400">
                    {stats?.totalDonations >= 25 ? 'Elite' : stats?.totalDonations >= 10 ? 'Advanced' : 'Rising Star'}
                  </p>
                </div>
                <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                  <p className="text-gray-600 dark:text-gray-400">Total Impact</p>
                  <p className="font-bold text-green-600 dark:text-green-400">
                    {((stats?.totalDonations || 0) * 450)} ml
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Detail Modal */}
        {selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Donation Record</h2>
                      <p className="text-green-100">ID: {selectedDonation.donationId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDonation(null)}
                    className="p-2 hover:bg-green-700 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Hospital Info */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedDonation.hospitalName}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{selectedDonation.location}</span>
                  </div>
                </div>

                {/* Donation Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Blood Group</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">{selectedDonation.bloodGroup}</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Units Donated</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{selectedDonation.units}</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lives Saved</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{selectedDonation.units * 3}</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{format(new Date(selectedDonation.date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>

                {/* Notes Section */}
                {selectedDonation.notes && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-yellow-900 dark:text-yellow-300 mb-1">Donation Notes</p>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">{selectedDonation.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Impact Summary */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
                  <h3 className="font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Your Impact from this Donation
                  </h3>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                      <p className="text-gray-600 dark:text-gray-400">Blood Volume</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{selectedDonation.units * 450}ml</p>
                    </div>
                    <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                      <p className="text-gray-600 dark:text-gray-400">Recipients</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">Up to {selectedDonation.units * 3}</p>
                    </div>
                    <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                      <p className="text-gray-600 dark:text-gray-400">Impact</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">🏆 Hero</p>
                    </div>
                  </div>
                </div>

                {/* Thank You Message */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-5 text-center">
                  <Award className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You for Saving Lives! 🎖️</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Your generosity made a real difference. You're a true hero in our community.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donations;
