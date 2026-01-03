import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import { medicationAPI, patientAPI } from '../../services/api';
import { Pill, Plus, Edit2, Trash2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const medicationSchema = yup.object({
  name: yup.string().required('Medication name is required'),
  dosage: yup.string().required('Dosage is required'),
  scheduleType: yup.string().oneOf(['daily', 'weekly', 'custom'], 'Please select a schedule type').required('Schedule type is required'),
  scheduleDetails: yup.string().required('Schedule details are required'),
  instructions: yup.string(),
}).required();

const CaretakerMedications = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // Fetch patient info
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: patientAPI.getAll,
  });

  const patient = patients?.find(p => p.id === patientId);

  // Fetch medications
  const { data: medications, isLoading } = useQuery({
    queryKey: ['medications', patientId],
    queryFn: () => medicationAPI.getByPatient(patientId),
    enabled: !!patientId,
  });

  // Add medication mutation
  const addMutation = useMutation({
    mutationFn: (data) => medicationAPI.create({ ...data, patientId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['medications']);
      toast.success('Medication added successfully!');
      setShowAddModal(false);
      resetAdd();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add medication');
    },
  });

  // Update medication mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => medicationAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['medications']);
      toast.success('Medication updated successfully!');
      setShowEditModal(false);
      setSelectedMedication(null);
      resetEdit();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update medication');
    },
  });

  // Delete medication mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => medicationAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['medications']);
      toast.success('Medication deleted successfully');
      setShowDeleteDialog(false);
      setSelectedMedication(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete medication');
    },
  });

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
    formState: { errors: errorsAdd },
  } = useForm({
    resolver: yupResolver(medicationSchema),
    defaultValues: {
      scheduleType: 'daily',
    },
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue,
    formState: { errors: errorsEdit },
  } = useForm({
    resolver: yupResolver(medicationSchema),
  });

  const onAddSubmit = (data) => {
    addMutation.mutate(data);
  };

  const onEditSubmit = (data) => {
    if (selectedMedication) {
      updateMutation.mutate({ id: selectedMedication._id, data });
    }
  };

  const handleEdit = (medication) => {
    setSelectedMedication(medication);
    setValue('name', medication.name);
    setValue('dosage', medication.dosage);
    setValue('scheduleType', medication.scheduleType);
    setValue('scheduleDetails', medication.scheduleDetails);
    setValue('instructions', medication.instructions || '');
    setShowEditModal(true);
  };

  const handleDelete = (medication) => {
    setSelectedMedication(medication);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedMedication) {
      deleteMutation.mutate(selectedMedication._id);
    }
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
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center space-x-4 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-xl">
          <button
            onClick={() => navigate('/caretaker/dashboard')}
            className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-all transform hover:scale-105"
          >
            <ArrowLeft className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Medications for {patient?.fullName || 'Patient'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{patient?.email}</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </button>
        </div>

        {/* Medications List */}
        <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl animate-fadeIn animate-delay-100">
          {medications && medications.length > 0 ? (
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {medications.map((medication) => (
                <div
                  key={medication._id}
                  className="p-6 hover:bg-blue-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-full shadow-lg ${medication.isActive ? 'bg-gradient-to-br from-success-500 to-success-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                        <Pill className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
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
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">Dosage:</span> {medication.dosage}
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-medium">Schedule:</span>{' '}
                          <span className="capitalize">{medication.scheduleType}</span>
                          {medication.scheduleDetails && (
                            <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
                              ({medication.scheduleDetails})
                            </span>
                          )}
                        </p>

                        {medication.instructions && (
                          <div className="mt-2 p-3 bg-blue-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Instructions:</span>{' '}
                              {medication.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(medication)}
                        className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-all transform hover:scale-105 shadow-sm"
                        title="Edit medication"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(medication)}
                        className="p-2 text-danger dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all transform hover:scale-105 shadow-sm"
                        title="Delete medication"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
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
                No medications yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Add medications to help this patient track their doses
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Medication
              </button>
            </div>
          )}
        </div>

        {/* Add Medication Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetAdd();
          }}
          title="Add Medication"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmitAdd(onAddSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medication Name
              </label>
              <input
                type="text"
                {...registerAdd('name')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsAdd.name ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
                placeholder="e.g., Aspirin"
              />
              {errorsAdd.name && (
                <p className="mt-2 text-sm text-danger">{errorsAdd.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dosage
              </label>
              <input
                type="text"
                {...registerAdd('dosage')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsAdd.dosage ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
                placeholder="e.g., 500mg"
              />
              {errorsAdd.dosage && (
                <p className="mt-2 text-sm text-danger">{errorsAdd.dosage.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule Type
              </label>
              <select
                {...registerAdd('scheduleType')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsAdd.scheduleType ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
              {errorsAdd.scheduleType && (
                <p className="mt-2 text-sm text-danger">{errorsAdd.scheduleType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule Details
              </label>
              <input
                type="text"
                {...registerAdd('scheduleDetails')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsAdd.scheduleDetails ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
                placeholder="e.g., 8:00 AM, 2:00 PM, 8:00 PM"
              />
              {errorsAdd.scheduleDetails && (
                <p className="mt-2 text-sm text-danger">{errorsAdd.scheduleDetails.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructions (Optional)
              </label>
              <textarea
                {...registerAdd('instructions')}
                rows={3}
                className="mt-1 block w-full px-4 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="e.g., Take with food"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetAdd();
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addMutation.isPending}
                className="px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {addMutation.isPending ? 'Adding...' : 'Add Medication'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit Medication Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMedication(null);
            resetEdit();
          }}
          title="Edit Medication"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmitEdit(onEditSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medication Name
              </label>
              <input
                type="text"
                {...registerEdit('name')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsEdit.name ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
              />
              {errorsEdit.name && (
                <p className="mt-2 text-sm text-danger">{errorsEdit.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dosage
              </label>
              <input
                type="text"
                {...registerEdit('dosage')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsEdit.dosage ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
              />
              {errorsEdit.dosage && (
                <p className="mt-2 text-sm text-danger">{errorsEdit.dosage.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule Type
              </label>
              <select
                {...registerEdit('scheduleType')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsEdit.scheduleType ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
              {errorsEdit.scheduleType && (
                <p className="mt-2 text-sm text-danger">{errorsEdit.scheduleType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schedule Details
              </label>
              <input
                type="text"
                {...registerEdit('scheduleDetails')}
                className={`mt-1 block w-full px-4 py-3 border-2 ${
                  errorsEdit.scheduleDetails ? 'border-danger' : 'border-blue-300 dark:border-primary-600'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200`}
              />
              {errorsEdit.scheduleDetails && (
                <p className="mt-2 text-sm text-danger">{errorsEdit.scheduleDetails.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructions (Optional)
              </label>
              <textarea
                {...registerEdit('instructions')}
                rows={3}
                className="mt-1 block w-full px-4 py-3 border-2 border-blue-300 dark:border-primary-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMedication(null);
                  resetEdit();
                }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="px-6 py-3 border-2 border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {updateMutation.isPending ? 'Updating...' : 'Update Medication'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedMedication(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Medication"
          message={`Are you sure you want to delete ${selectedMedication?.name}? This action cannot be undone.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          isDanger={true}
        />
      </div>
    </Layout>
  );
};

export default CaretakerMedications;
