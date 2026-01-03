import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import NotificationDropdown from './NotificationDropdown';
import { 
  LayoutDashboard, 
  Pill, 
  Users, 
  Calendar, 
  BarChart3, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  User,
  Heart,
  Activity,
  Sun,
  Moon,
  Droplet
} from 'lucide-react';

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isPatient, isCaretaker, isDonor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const navigationItems = isPatient
    ? [
        { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
        { name: 'My Medications', path: '/patient/medications', icon: Pill },
        { name: 'Doses', path: '/patient/doses', icon: Calendar },
        { name: 'Notifications', path: '/notifications', icon: Bell },
      ]
    : isDonor
    ? [
        { name: 'Dashboard', path: '/donor/dashboard', icon: LayoutDashboard },
        { name: 'Active Requests', path: '/donor/requests', icon: Droplet },
        { name: 'My Donations', path: '/donor/donations', icon: Heart },
        { name: 'Profile', path: '/donor/profile', icon: User },
      ]
    : [
        { name: 'Dashboard', path: '/caretaker/dashboard', icon: LayoutDashboard },
        { name: 'Patients', path: '/caretaker/patients', icon: Users },
        { name: 'Reports', path: '/caretaker/reports', icon: BarChart3 },
        { name: 'Notifications', path: '/notifications', icon: Bell },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-medical-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-medical dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow-medical-lg border-b border-primary-600 dark:border-primary-800 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tight">MediCare</span>
                <span className="text-primary-100 text-xs">Adherence Management</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                      : 'text-primary-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side - Theme Toggle, Notifications & User */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2.5 rounded-lg transition-all duration-200 transform hover:scale-110"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-white" />
                )}
              </button>

              {/* Notification Dropdown */}
              <div className="hidden md:block">
                <NotificationDropdown />
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <div className="bg-white text-primary-600 rounded-full h-8 w-8 flex items-center justify-center font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
                    <p className="text-primary-100 text-xs capitalize">{user?.role}</p>
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-medical shadow-medical-lg z-20 overflow-hidden">
                      <div className="p-4 bg-gradient-to-br from-primary-50 to-white border-b border-primary-100">
                        <p className="text-medical-900 font-medium">{user?.name}</p>
                        <p className="text-medical-500 text-sm">{user?.email}</p>
                        <p className="inline-flex items-center mt-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          {user?.role === 'patient' ? '👤 Patient' : '👨‍⚕️ Caretaker'}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-danger-600 hover:bg-danger-50 dark:hover:bg-red-900 transition-all duration-200 text-left transform hover:scale-105 rounded-lg"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:scale-110"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/5 dark:bg-black/40 backdrop-blur-xl border-t border-primary-400 dark:border-primary-800">
            <div className="px-4 py-4 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-primary-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-100 hover:bg-white/10 hover:text-white transition-all duration-200 w-full transform hover:scale-105"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-medical-200 dark:border-gray-800 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-medical-600 dark:text-gray-400">
              <Heart className="h-5 w-5 text-danger-500" />
              <span className="text-sm">MediCare © 2025 - Improving Medication Adherence</span>
            </div>
            <div className="text-sm text-medical-500 dark:text-gray-500">
              Made with care for better health outcomes
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
