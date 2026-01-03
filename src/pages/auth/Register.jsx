import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { Pill, Mail, Lock, Loader, Heart, Activity, User, UserCircle, Users, Droplet } from 'lucide-react';

const schema = yup.object({
  fullName: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
  role: yup.string().oneOf(['patient', 'caretaker', 'donor'], 'Please select a role').required('Role is required'),
}).required();

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'patient',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, fullName, ...rest } = data;
    const registerData = {
      name: fullName,
      ...rest
    };
    await registerUser(registerData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950 px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Animated Medical Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-10 left-20 h-10 w-10 text-primary-200 dark:text-primary-900 opacity-20 animate-pulse" />
        <Activity className="absolute top-60 right-10 h-12 w-12 text-primary-300 dark:text-primary-800 opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <Users className="absolute bottom-32 left-10 h-14 w-14 text-primary-200 dark:text-primary-900 opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <UserCircle className="absolute bottom-10 right-32 h-16 w-16 text-primary-300 dark:text-primary-800 opacity-20 animate-bounce" style={{ animationDuration: '4s' }} />
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
            Join <span className="text-primary-600 dark:text-primary-400">MediCare</span>
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-danger-500 animate-pulse" />
            Start your journey to better health
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white dark:bg-gray-900 py-8 px-6 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 animate-scaleIn transition-colors duration-300">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div className="animate-slideInLeft">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register('fullName')}
                  className={`form-input ${
                    errors.fullName ? 'border-danger-500 dark:border-danger-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 animate-fadeIn">{errors.fullName.message}</p>
              )}
            </div>
            {/* Email Field */}
            <div className="animate-slideInLeft animate-delay-100">
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

            {/* Role Selection */}
            <div className="animate-slideInLeft animate-delay-200">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className={`relative flex flex-col items-center justify-center px-4 py-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedRole === 'patient' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950 shadow-lg' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800'
                }`}>
                  <input
                    type="radio"
                    value="patient"
                    {...register('role')}
                    className="sr-only"
                  />
                  <UserCircle className={`h-8 w-8 mb-2 ${
                    selectedRole === 'patient' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className={`text-sm font-semibold ${
                    selectedRole === 'patient' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                  }`}>Patient</span>
                </label>
                <label className={`relative flex flex-col items-center justify-center px-4 py-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedRole === 'caretaker' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950 shadow-lg' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800'
                }`}>
                  <input
                    type="radio"
                    value="caretaker"
                    {...register('role')}
                    className="sr-only"
                  />
                  <Users className={`h-8 w-8 mb-2 ${
                    selectedRole === 'caretaker' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className={`text-sm font-semibold ${
                    selectedRole === 'caretaker' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                  }`}>Caretaker</span>
                </label>
                <label className={`relative flex flex-col items-center justify-center px-4 py-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedRole === 'donor' 
                    ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950 shadow-lg' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800'
                }`}>
                  <input
                    type="radio"
                    value="donor"
                    {...register('role')}
                    className="sr-only"
                  />
                  <Droplet className={`h-8 w-8 mb-2 ${
                    selectedRole === 'donor' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  <span className={`text-sm font-semibold ${
                    selectedRole === 'donor' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                  }`}>Blood Donor</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 animate-fadeIn">{errors.role.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="animate-slideInLeft animate-delay-300">
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
                  autoComplete="new-password"
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

            {/* Confirm Password Field */}
            <div className="animate-slideInLeft animate-delay-400">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={`form-input ${
                    errors.confirmPassword ? 'border-danger-500 dark:border-danger-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-danger-600 dark:text-danger-400 animate-fadeIn">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 animate-fadeIn animate-delay-400">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 dark:from-primary-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Create account
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center animate-fadeIn">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950 border-2 border-primary-200 dark:border-primary-800 rounded-xl p-4 animate-fadeIn transition-colors duration-300">
          <div className="flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <p className="text-sm text-primary-800 dark:text-primary-300 font-semibold">
              Secure Registration - Your Health, Our Priority
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
