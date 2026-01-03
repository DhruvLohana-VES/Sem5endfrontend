import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { patientAPI } from '../../services/api';
import { Users, Pill, TrendingUp, UserPlus, ChevronRight } from 'lucide-react';

const CaretakerDashboard = () => {
  // Fetch all patients
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientAPI.getAll,
  });

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  const totalPatients = patients?.length || 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Caretaker Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your patients and their medications
            </p>
          </div>
          <Link
            to="/caretaker/patients"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:scale-105 transition-all duration-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Patient
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-primary-50 dark:from-blue-950 dark:to-primary-950 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalPatients}</p>
              </div>
              <div className="bg-blue-500 dark:bg-blue-600 p-3 rounded-full shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-primary-50 dark:from-purple-950 dark:to-primary-950 rounded-xl shadow-lg border border-purple-200 dark:border-purple-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn animate-delay-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Medications</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {patients?.reduce((acc, p) => acc + (p.medicationsCount || 0), 0) || 0}
                </p>
              </div>
              <div className="bg-purple-500 dark:bg-purple-600 p-3 rounded-full shadow-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-primary-50 dark:from-green-950 dark:to-primary-950 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn animate-delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Avg Adherence</p>
                <p className="text-3xl font-bold text-success-600 dark:text-success-400 mt-1">
                  {patients && patients.length > 0
                    ? Math.round(
                        patients.reduce((acc, p) => acc + (p.adherenceRate || 0), 0) /
                          patients.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="bg-success-500 dark:bg-success-600 p-3 rounded-full shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-100 dark:border-gray-700 animate-fadeIn animate-delay-300">
          <div className="px-6 py-4 border-b border-blue-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Patients</h2>
          </div>

          {patients && patients.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {patients.map((patient) => (
                <div
                  key={patient._id}
                  className="p-6 hover:bg-blue-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Avatar */}
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full h-12 w-12 flex items-center justify-center font-semibold text-lg shadow-lg">
                        {patient.fullName?.charAt(0).toUpperCase() || patient.email?.charAt(0).toUpperCase()}
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {patient.fullName || 'Unknown Patient'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.medicationsCount || 0} medications
                          </span>
                          {patient.adherenceRate !== undefined && (
                            <span className={`text-xs font-semibold ${
                              patient.adherenceRate >= 80
                                ? 'text-success-600 dark:text-success-400'
                                : patient.adherenceRate >= 60
                                ? 'text-warning-600 dark:text-warning-400'
                                : 'text-danger-600 dark:text-danger-400'
                            }`}>
                              {patient.adherenceRate}% adherence
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/caretaker/medications/${patient._id}`}
                        className="inline-flex items-center px-3 py-2 border-2 border-primary-300 dark:border-primary-600 rounded-lg shadow-sm text-sm font-medium text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                      >
                        <Pill className="h-4 w-4 mr-2" />
                        Medications
                      </Link>
                      <Link
                        to={`/caretaker/reports?patient=${patient._id}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                      >
                        View Report
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No patients yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start by adding patients to manage their medications
              </p>
              <Link
                to="/caretaker/patients"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:scale-105 transition-all duration-200"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Your First Patient
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CaretakerDashboard;
