import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Pill, Mail, Lock, Loader, Heart, Activity, Stethoscope } from 'lucide-react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await login(data.email, data.password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated Medical Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 h-12 w-12 text-primary-200 dark:text-primary-900 opacity-20 animate-pulse" />
        <Pill className="absolute top-40 right-20 h-16 w-16 text-primary-300 dark:text-primary-800 opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <Activity className="absolute bottom-20 left-20 h-14 w-14 text-primary-200 dark:text-primary-900 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <Stethoscope className="absolute bottom-40 right-10 h-20 w-20 text-primary-300 dark:text-primary-800 opacity-20 animate-bounce" style={{ animationDuration: '4s' }} />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Title */}
        <div className="text-center animate-fadeIn">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-400 dark:bg-primary-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 p-4 rounded-full shadow-xl">
                <Pill className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome to <span className="text-primary-600 dark:text-primary-400">MediCare</span>
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-danger-500 animate-pulse" />
            Sign in to manage your medications
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-900 py-8 px-6 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 animate-scaleIn transition-colors duration-300">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="animate-slideInLeft">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`form-input ${
                    errors.email ? 'border-danger-500 dark:border-danger-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 animate-fadeIn">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="animate-slideInLeft animate-delay-100">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`form-input ${
                    errors.password ? 'border-danger-500 dark:border-danger-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 animate-fadeIn">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="animate-slideInLeft animate-delay-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center animate-fadeIn animate-delay-300">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-4 animate-fadeIn animate-delay-400 transition-colors duration-300">
          <div className="flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <p className="text-sm text-primary-800 dark:text-primary-300 font-semibold">
              Demo Mode Available - Testing Enabled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
