import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, LogOut, User, Home, Pill, Calendar, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isPatient, isCaretaker } = useAuth();
  const location = useLocation();

  const patientNavItems = [
    { to: '/patient/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/patient/medications', icon: Pill, label: 'Medications' },
    { to: '/patient/doses', icon: Calendar, label: 'Doses' },
  ];

  const caretakerNavItems = [
    { to: '/caretaker/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/caretaker/patients', icon: Users, label: 'Patients' },
    { to: '/caretaker/reports', icon: BarChart3, label: 'Reports' },
  ];

  const navItems = isPatient ? patientNavItems : caretakerNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Pill className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-900">MedTrack</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <NotificationDropdown />

              {/* User Menu */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.fullName}</p>
                    <p className="text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-danger hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.to)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-3 mb-3">
                  <User className="h-8 w-8 text-gray-600" />
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">{user?.fullName}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-danger hover:bg-gray-100 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
