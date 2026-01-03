import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { patientAPI, linkAPI } from '../../services/api';
import { Users, UserPlus, Trash2, Mail, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const inviteSchema = yup.object({
  patientEmail: yup.string().email('Invalid email').required('Email is required'),
}).required();

const CaretakerPatients = () => {
  const queryClient = useQueryClient();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUnlinkDialog, setShowUnlinkDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch patients
  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientAPI.getAll,
  });

  // Invite patient mutation
  const inviteMutation = useMutation({
    mutationFn: (email) => linkAPI.invite(email),
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('Patient invited successfully!');
      setShowInviteModal(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to invite patient');
    },
  });

  // Unlink patient mutation
  const unlinkMutation = useMutation({
    mutationFn: (patientId) => linkAPI.unlink(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries(['patients']);
      toast.success('Patient removed successfully');
      setShowUnlinkDialog(false);
      setSelectedPatient(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove patient');
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inviteSchema),
  });

  const onInviteSubmit = (data) => {
    inviteMutation.mutate(data.patientEmail);
  };

  const handleUnlink = (patient) => {
    setSelectedPatient(patient);
    setShowUnlinkDialog(true);
  };

  const confirmUnlink = () => {
    if (selectedPatient) {
      unlinkMutation.mutate(selectedPatient._id);
    }
  };

  // Filter patients
  const filteredPatients = patients?.filter((patient) =>
    patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Patients</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your patient connections
            </p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:scale-105 transition-all duration-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Patient
          </button>
        </div>

        {/* Search */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 p-4 animate-fadeIn animate-delay-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary-500 dark:text-primary-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 animate-fadeIn animate-delay-200">
          {filteredPatients.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {filteredPatients.map((patient) => (
                <div
                  key={patient._id}
                  className="p-6 hover:bg-blue-100/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Avatar */}
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full h-14 w-14 flex items-center justify-center font-semibold text-xl shadow-lg">
                        {patient.fullName?.charAt(0).toUpperCase() || patient.email?.charAt(0).toUpperCase()}
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {patient.fullName || 'Unknown Patient'}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail className="h-4 w-4 text-primary-500 dark:text-primary-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{patient.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.medicationsCount || 0} medications
                          </span>
                          {patient.adherenceRate !== undefined && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
                              patient.adherenceRate >= 80
                                ? 'bg-success-100 text-success-700 dark:bg-success-950 dark:text-success-400'
                                : patient.adherenceRate >= 60
                                ? 'bg-warning-100 text-warning-700 dark:bg-warning-950 dark:text-warning-400'
                                : 'bg-danger-100 text-danger-700 dark:bg-danger-950 dark:text-danger-400'
                            }`}>
                              {patient.adherenceRate}% adherence
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/caretaker/medications/${patient._id}`}
                        className="inline-flex items-center px-3 py-2 border-2 border-primary-300 dark:border-primary-600 rounded-lg shadow-sm text-sm font-medium text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105"
                      >
                        Manage Medications
                      </Link>
                      <button
                        onClick={() => handleUnlink(patient)}
                        className="inline-flex items-center p-2 border-2 border-danger-300 dark:border-danger-600 rounded-lg text-danger-700 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500 transition-all duration-200 transform hover:scale-105"
                        title="Remove patient"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl p-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'No patients found' : 'No patients yet'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchTerm
                  ? 'Try adjusting your search'
                  : 'Start by inviting patients to manage their medications'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Your First Patient
                </button>
              )}
            </div>
          )}
        </div>

        {/* Invite Modal */}
        <Modal
          isOpen={showInviteModal}
          onClose={() => {
            setShowInviteModal(false);
            reset();
          }}
          title="Invite Patient"
        >
          <form onSubmit={handleSubmit(onInviteSubmit)} className="space-y-4">
            <div>
              <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Patient Email
              </label>
              <div className="mt-1">
                <input
                  id="patientEmail"
                  type="email"
                  {...register('patientEmail')}
                  className={`appearance-none block w-full px-4 py-3 border-2 ${
                    errors.patientEmail ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                  } rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
                  placeholder="patient@example.com"
                />
              </div>
              {errors.patientEmail && (
                <p className="mt-2 text-sm text-danger">{errors.patientEmail.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowInviteModal(false);
                  reset();
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={inviteMutation.isPending}
                className="px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {inviteMutation.isPending ? 'Inviting...' : 'Send Invite'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Unlink Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showUnlinkDialog}
          onClose={() => {
            setShowUnlinkDialog(false);
            setSelectedPatient(null);
          }}
          onConfirm={confirmUnlink}
          title="Remove Patient"
          message={`Are you sure you want to remove ${selectedPatient?.fullName || selectedPatient?.email}? This will unlink you from this patient.`}
          confirmText="Yes, Remove"
          cancelText="Cancel"
          isDanger={true}
        />
      </div>
    </Layout>
  );
};

export default CaretakerPatients;
