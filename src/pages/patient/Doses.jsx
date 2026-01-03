import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useAuth } from '../../contexts/AuthContext';
import { medicationAPI, doseAPI } from '../../services/api';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Pill } from 'lucide-react';
import { format, parseISO, isToday, isPast } from 'date-fns';
import { toast } from 'react-toastify';

const PatientDoses = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDose, setSelectedDose] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Fetch medications with doses
  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', user?.id],
    queryFn: async () => {
      const response = await medicationAPI.getByPatient(user?.id);
      return response.data;
    },
  });

  // Mark dose as taken mutation
  const markDoseMutation = useMutation({
    mutationFn: (doseId) => doseAPI.markAsTaken(doseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['medications']);
      toast.success('Dose marked as taken!');
      setShowConfirm(false);
      setSelectedDose(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to mark dose');
      setShowConfirm(false);
    },
  });

  // Get all doses from all medications
  const allDoses = medications?.flatMap(med => 
    (med.doses || []).map(dose => ({
      ...dose,
      medicationName: med.name,
      medicationDosage: med.dosage,
      medicationId: med._id,
    }))
  ) || [];

  // Filter doses for today
  const todayDoses = allDoses.filter(dose => {
    try {
      return isToday(parseISO(dose.scheduledTime));
    } catch {
      return false;
    }
  }).sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

  const handleMarkAsTaken = (dose) => {
    setSelectedDose(dose);
    setShowConfirm(true);
  };

  const confirmMarkAsTaken = () => {
    if (selectedDose) {
      markDoseMutation.mutate(selectedDose._id);
    }
  };

  const getDoseStatusBadge = (dose) => {
    const { status } = dose;
    const scheduledTime = parseISO(dose.scheduledTime);
    const isOverdue = isPast(scheduledTime) && status === 'scheduled';

    if (status === 'taken') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-success dark:text-green-300 shadow-sm">
          <CheckCircle className="h-3 w-3 mr-1" />
          Taken
        </span>
      );
    }

    if (status === 'missed') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-danger dark:text-red-300 shadow-sm">
          <XCircle className="h-3 w-3 mr-1" />
          Missed
        </span>
      );
    }

    if (isOverdue) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900 text-warning dark:text-orange-300 shadow-sm">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 shadow-sm">
        <Clock className="h-3 w-3 mr-1" />
        Scheduled
      </span>
    );
  };

  const getDoseCardClass = (dose) => {
    const { status } = dose;
    const scheduledTime = parseISO(dose.scheduledTime);
    const isOverdue = isPast(scheduledTime) && status === 'scheduled';

    if (status === 'taken') {
      return 'border-success bg-green-50 dark:bg-gray-800';
    }
    if (status === 'missed') {
      return 'border-danger bg-red-50 dark:bg-gray-800';
    }
    if (isOverdue) {
      return 'border-warning bg-orange-50 dark:bg-gray-800';
    }
    return 'border-primary bg-blue-50 dark:bg-gray-800';
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  // Calculate summary stats
  const totalDoses = todayDoses.length;
  const takenDoses = todayDoses.filter(d => d.status === 'taken').length;
  const missedDoses = todayDoses.filter(d => d.status === 'missed').length;
  const scheduledDoses = todayDoses.filter(d => d.status === 'scheduled').length;

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Today's Doses</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn animate-delay-100">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-4 border-l-4 border-gray-400 hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalDoses}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-4 border-l-4 border-success hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taken</p>
            <p className="text-2xl font-bold text-success dark:text-green-400 mt-1">{takenDoses}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-4 border-l-4 border-primary hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled</p>
            <p className="text-2xl font-bold text-primary dark:text-primary-400 mt-1">{scheduledDoses}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-4 border-l-4 border-danger hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Missed</p>
            <p className="text-2xl font-bold text-danger dark:text-red-400 mt-1">{missedDoses}</p>
          </div>
        </div>

        {/* Doses List */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl animate-fadeIn animate-delay-200">
          {todayDoses.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {todayDoses.map((dose) => (
                <div
                  key={dose._id}
                  className={`p-6 border-l-4 ${getDoseCardClass(dose)} transition-all duration-200 hover:shadow-lg transform hover:scale-[1.01]`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-full shadow-lg">
                        <Pill className="h-6 w-6 text-white" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {dose.medicationName}
                          </h3>
                          {getDoseStatusBadge(dose)}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">Dosage:</span> {dose.medicationDosage}
                        </p>

                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Scheduled Time:</span>{' '}
                          {format(parseISO(dose.scheduledTime), 'h:mm a')}
                        </p>

                        {dose.takenAt && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Taken at: {format(parseISO(dose.takenAt), 'h:mm a')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {dose.status === 'scheduled' && (
                      <button
                        onClick={() => handleMarkAsTaken(dose)}
                        disabled={markDoseMutation.isPending}
                        className="ml-4 inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-success to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Taken
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg mb-6">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No doses scheduled for today
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Check back tomorrow or contact your caretaker
              </p>
            </div>
          )}
        </div>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmMarkAsTaken}
          title="Mark Dose as Taken"
          message={`Are you sure you want to mark ${selectedDose?.medicationName} (${selectedDose?.medicationDosage}) as taken?`}
          confirmText="Yes, Mark as Taken"
          cancelText="Cancel"
        />
      </div>
    </Layout>
  );
};

export default PatientDoses;
