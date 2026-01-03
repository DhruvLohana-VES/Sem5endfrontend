import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { notificationAPI } from '../../services/api';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  // Fetch all notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await notificationAPI.getAll();
      return response.data;
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId) => notificationAPI.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationCount']);
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationAPI.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationCount']);
      toast.success('All notifications marked as read');
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId) => notificationAPI.delete(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationCount']);
      toast.success('Notification deleted');
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="min-h-screen" />
      </Layout>
    );
  }

  const unreadNotifications = notifications?.filter(n => !n.isRead) || [];
  const readNotifications = notifications?.filter(n => n.isRead) || [];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {unreadNotifications.length} unread notification{unreadNotifications.length !== 1 ? 's' : ''}
            </p>
          </div>
          {notifications && notifications.length > 0 && unreadNotifications.length > 0 && (
            <button
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All as Read
            </button>
          )}
        </div>

        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700 animate-fadeIn animate-delay-100">
            <div className="px-6 py-4 border-b border-blue-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Unread</h2>
            </div>
            <div className="divide-y divide-blue-100 dark:divide-gray-700">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className="px-6 py-4 bg-blue-100/50 dark:bg-primary-950/30 hover:bg-blue-200/50 dark:hover:bg-primary-900/30 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-full shadow-lg">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => markAsReadMutation.mutate(notification._id)}
                        disabled={markAsReadMutation.isPending}
                        className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-950 rounded-lg transition-all duration-200"
                        title="Mark as read"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteNotificationMutation.mutate(notification._id)}
                        disabled={deleteNotificationMutation.isPending}
                        className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-950 rounded-lg transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fadeIn animate-delay-200">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Read</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {readNotifications.map((notification) => (
                <div
                  key={notification._id}
                  className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteNotificationMutation.mutate(notification._id)}
                      disabled={deleteNotificationMutation.isPending}
                      className="p-2 text-danger-600 dark:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-950 rounded-lg transition-all duration-200 ml-4"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!notifications || notifications.length === 0) && (
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-xl border border-blue-200 dark:border-gray-700">
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotificationsPage;
