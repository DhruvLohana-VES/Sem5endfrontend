import { useQuery } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { medicationAPI, doseAPI } from '../../services/api';
import { Pill, Calendar, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format, isToday, parseISO } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuth();

  // Fetch medications
  const { data: medications, isLoading: medicationsLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: medicationAPI.getAll,
  });

  // Fetch today's doses
  const { data: todayDosesData, isLoading: dosesLoading } = useQuery({
    queryKey: ['doses', 'today'],
    queryFn: doseAPI.getToday,
  });

  // Calculate stats
  const activeMedications = medications?.filter(med => med.isActive) || [];
  const totalMedications = activeMedications.length;

  const todayDoses = todayDosesData || [];
  const dosesTakenToday = todayDoses.filter(dose => dose.status === 'taken').length;
  const dosesScheduledToday = todayDoses.length;
  const adherenceRate = dosesScheduledToday > 0 
    ? Math.round((dosesTakenToday / dosesScheduledToday) * 100) 
    : 0;

  // Get upcoming/pending doses
  const upcomingDoses = todayDoses
    .filter(dose => dose.status === 'pending')
    .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime))
    .slice(0, 3);

  if (medicationsLoading || dosesLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn animate-delay-100">
          {/* Total Medications */}
          <div className="bg-gradient-to-br from-blue-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Medications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalMedications}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Today's Doses */}
          <div className="bg-gradient-to-br from-purple-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Doses</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{dosesScheduledToday}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Doses Taken */}
          <div className="bg-gradient-to-br from-green-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Doses Taken</p>
                <p className="text-3xl font-bold text-success dark:text-green-400 mt-1">{dosesTakenToday}</p>
              </div>
              <div className="bg-success-500 p-3 rounded-full shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Adherence Rate */}
          <div className="bg-gradient-to-br from-yellow-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Adherence Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{adherenceRate}%</p>
              </div>
              <div className="bg-warning p-3 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Doses */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-200">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Today's Doses
          </h2>
          {todayDoses.length > 0 ? (
            <div className="space-y-3">
              {todayDoses.map((dose) => (
                <div
                  key={dose.id}
                  className="flex items-center justify-between p-4 bg-blue-100/50 dark:bg-gray-800/50 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full shadow-lg ${
                      dose.status === 'taken' ? 'bg-success-500' : 
                      dose.status === 'missed' ? 'bg-danger' : 'bg-warning'
                    }`}>
                      {dose.status === 'taken' ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : dose.status === 'missed' ? (
                        <XCircle className="h-5 w-5 text-white" />
                      ) : (
                        <Clock className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {dose.medication?.name || 'Unknown Medication'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {dose.medication?.dosage}
                        {' • '}
                        {format(parseISO(dose.scheduledTime), 'h:mm a')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                      dose.status === 'taken' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                        : dose.status === 'missed'
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {dose.status === 'taken' ? '✓ Taken' : 
                       dose.status === 'missed' ? '✗ Missed' : '⏰ Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No doses scheduled for today</p>
          )}
        </div>

        {/* Active Medications */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6 animate-fadeIn animate-delay-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Active Medications
          </h2>
          {activeMedications.length > 0 ? (
            <div className="space-y-3">
              {activeMedications.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center justify-between p-4 bg-blue-100/50 dark:bg-gray-800/50 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-primary-500 shadow-lg">
                      <Pill className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{med.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Array.isArray(med.timing) ? med.timing.join(', ') : med.timing}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No active medications</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
