import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { donorAPI } from '../../services/api';
import { User, Mail, Phone, MapPin, Droplet, Calendar, Save, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['donorProfile'],
    queryFn: donorAPI.getProfile,
    retry: 2,
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: donorAPI.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donorProfile'] });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: donorAPI.toggleAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donorProfile'] });
      toast.success('Availability status updated!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update availability');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handleToggleAvailability = () => {
    toggleAvailabilityMutation.mutate();
  };

  if (isLoading) {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Donor Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your profile and donation preferences
            </p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 sm:mt-0 px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Donation Availability
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {profile?.isAvailable 
                  ? '✅ You are currently available for blood donations' 
                  : '⏸️ You are currently unavailable for blood donations'}
              </p>
              {profile?.isAvailable && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Hospitals in your area can see your profile
                </p>
              )}
            </div>
            <button
              onClick={handleToggleAvailability}
              disabled={toggleAvailabilityMutation.isPending}
              className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                profile?.isAvailable 
                  ? 'bg-green-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform shadow-lg ${
                  profile?.isAvailable ? 'translate-x-11' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-200">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="inline h-4 w-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Droplet className="inline h-4 w-4 mr-1" />
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              >
                <option value="">Select Blood Group</option>
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
                <Calendar className="inline h-4 w-4 mr-1" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Full Address
            </label>
            <textarea
              name="address"
              value={formData.address || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className="w-full px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 transition-all"
              required
            />
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(profile);
                }}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <div className="bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Donation Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Donations</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {profile?.totalDonations || 0}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lives Saved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {(profile?.totalDonations || 0) * 3}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Member Since</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {profile?.memberSince ? new Date(profile.memberSince).getFullYear() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn animate-delay-400">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Donation Eligibility Criteria
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>Age: 18-65 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>Weight: Minimum 50 kg</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>Hemoglobin: Men ≥13 g/dL, Women ≥12 g/dL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>Interval: 3 months between whole blood donations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                    <span>Good general health condition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <User className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Before Donation Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                    <p className="font-medium text-green-700 dark:text-green-300">💧 Hydrate Well</p>
                    <p className="text-xs mt-1">Drink extra water 24 hours before donation</p>
                  </div>
                  <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                    <p className="font-medium text-green-700 dark:text-green-300">🍽️ Eat Iron-Rich Foods</p>
                    <p className="text-xs mt-1">Have a healthy meal before donating</p>
                  </div>
                  <div className="bg-white dark:bg-green-900/30 rounded-lg p-3">
                    <p className="font-medium text-green-700 dark:text-green-300">😴 Get Good Sleep</p>
                    <p className="text-xs mt-1">Be well-rested on donation day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
