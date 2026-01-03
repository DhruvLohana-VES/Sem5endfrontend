import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { patientAPI, reportAPI } from '../../services/api';
import { BarChart3, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CaretakerReports = () => {
  const [searchParams] = useSearchParams();
  const [selectedPatientId, setSelectedPatientId] = useState(searchParams.get('patient') || '');
  const [days, setDays] = useState(30);

  // Fetch patients
  const { data: patients, isLoading: patientsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientAPI.getAll,
  });

  // Fetch adherence report
  const { data: report, isLoading: reportLoading, refetch } = useQuery({
    queryKey: ['adherenceReport', selectedPatientId, days],
    queryFn: () => reportAPI.getAdherence(selectedPatientId, days),
    enabled: !!selectedPatientId,
  });

  useEffect(() => {
    if (patients && patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId]);

  useEffect(() => {
    if (selectedPatientId) {
      refetch();
    }
  }, [selectedPatientId, days, refetch]);

  const selectedPatient = patients?.find(p => p.id === selectedPatientId);

  if (patientsLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <Layout>
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No patients to report on
          </h3>
          <p className="text-gray-500">
            Add patients first to view their adherence reports
          </p>
        </div>
      </Layout>
    );
  }

  const adherenceRate = report?.adherenceRate || 0;
  const chartData = [
    {
      name: 'Taken',
      value: report?.dosesTaken || 0,
    },
    {
      name: 'Missed',
      value: report?.dosesMissed || 0,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Adherence Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View medication adherence statistics for your patients
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 p-6 animate-fadeIn animate-delay-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Patient Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Select Patient
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name || patient.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Days Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Reporting Period
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="block w-full px-4 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {reportLoading ? (
          <LoadingSpinner size="lg" className="py-12" />
        ) : report ? (
          <>
            {/* Patient Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 p-6 animate-fadeIn animate-delay-200">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full h-16 w-16 flex items-center justify-center font-semibold text-2xl shadow-lg">
                  {selectedPatient?.name?.charAt(0).toUpperCase() || selectedPatient?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedPatient?.name || 'Unknown Patient'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedPatient?.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Adherence Rate */}
              <div className="bg-gradient-to-br from-green-50 to-primary-50 dark:from-green-950 dark:to-primary-950 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn animate-delay-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adherence Rate</p>
                    <p className={`text-3xl font-bold mt-1 ${
                      adherenceRate >= 80
                        ? 'text-success-600 dark:text-success-400'
                        : adherenceRate >= 60
                        ? 'text-warning-600 dark:text-warning-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}>
                      {adherenceRate}%
                    </p>
                  </div>
                  <div className={`p-3 rounded-full shadow-lg ${
                    adherenceRate >= 80
                      ? 'bg-success-500'
                      : adherenceRate >= 60
                      ? 'bg-warning-500'
                      : 'bg-danger-500'
                  }`}>
                    {adherenceRate >= 60 ? (
                      <TrendingUp className="h-6 w-6 text-white" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Total Doses */}
              <div className="bg-gradient-to-br from-blue-50 to-primary-50 dark:from-blue-950 dark:to-primary-950 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn animate-delay-400">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Doses</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                      {report.totalDosesInPeriod}
                    </p>
                  </div>
                  <div className="bg-blue-500 p-3 rounded-full shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Doses Taken */}
              <div className="bg-gradient-to-br from-green-50 to-success-50 dark:from-green-950 dark:to-success-950 rounded-xl shadow-lg border border-green-200 dark:border-green-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Doses Taken</p>
                    <p className="text-3xl font-bold text-success-600 dark:text-success-400 mt-1">
                      {report.dosesTaken}
                    </p>
                  </div>
                  <div className="bg-success-500 p-3 rounded-full shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Doses Missed */}
              <div className="bg-gradient-to-br from-red-50 to-danger-50 dark:from-red-950 dark:to-danger-950 rounded-xl shadow-lg border border-red-200 dark:border-red-800 p-6 transform hover:scale-105 transition-all duration-200 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Doses Missed</p>
                    <p className="text-3xl font-bold text-danger-600 dark:text-danger-400 mt-1">
                      {report.dosesMissed}
                    </p>
                  </div>
                  <div className="bg-danger-500 p-3 rounded-full shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 p-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Adherence Overview ({days} days)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Count"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Interpretation */}
            <div className={`rounded-lg p-6 ${
              adherenceRate >= 80
                ? 'bg-green-50 border border-green-200'
                : adherenceRate >= 60
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                adherenceRate >= 80
                  ? 'text-success'
                  : adherenceRate >= 60
                  ? 'text-warning'
                  : 'text-danger'
              }`}>
                {adherenceRate >= 80
                  ? '✓ Excellent Adherence'
                  : adherenceRate >= 60
                  ? '⚠ Fair Adherence'
                  : '✗ Poor Adherence'}
              </h4>
              <p className="text-sm text-gray-700">
                {adherenceRate >= 80
                  ? 'This patient is doing great! They are consistently taking their medications as prescribed.'
                  : adherenceRate >= 60
                  ? 'This patient shows fair adherence but there is room for improvement. Consider discussing barriers to medication adherence.'
                  : 'This patient is missing many doses. Immediate intervention may be needed to improve medication adherence.'}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No report data available</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaretakerReports;
