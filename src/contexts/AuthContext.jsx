import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data on app load (fresh start every time)
    const shouldClearAuth = !sessionStorage.getItem('hasLoadedBefore');
    
    if (shouldClearAuth) {
      console.log('🧹 First load - clearing all auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      sessionStorage.setItem('hasLoadedBefore', 'true');
      setLoading(false);
      return;
    }
    
    // Check for existing authentication only if not first load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('🔍 Checking stored auth:', { storedToken: !!storedToken, storedUser: !!storedUser });
    
    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsedUser);
      console.log('✅ Restored auth state for user:', parsedUser.email, 'Role:', parsedUser.role);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password });
      console.log('🔐 Login response:', data);
      
      const { token: newToken, user: newUser } = data;
      console.log('🔐 Token:', newToken);
      console.log('🔐 User:', newUser);
      
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('userRole', newUser.role); // For mock API
      
      console.log('✅ Auth state updated, navigating to dashboard for role:', newUser.role);
      
      toast.success('Login successful!');
      
      // Navigate based on role
      if (newUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (newUser.role === 'caretaker') {
        navigate('/caretaker/dashboard');
      } else if (newUser.role === 'donor') {
        navigate('/donor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Login error:', error);
      const message = error.response?.data?.message || error.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (formData) => {
    try {
      await authAPI.register(formData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    isPatient: user?.role === 'patient',
    isCaretaker: user?.role === 'caretaker',
    isDonor: user?.role === 'donor',
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
