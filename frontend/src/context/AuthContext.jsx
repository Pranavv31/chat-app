import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      setAuthUser(res.data);
    } catch {
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signup = async (data) => {
    const res = await axiosInstance.post('/auth/signup', data);
    setAuthUser(res.data);
    return res.data;
  };

  const login = async (data) => {
    const res = await axiosInstance.post('/auth/login', data);
    setAuthUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await axiosInstance.post('/auth/logout');
    setAuthUser(null);
  };

  const updateProfile = async (profilePic) => {
    const res = await axiosInstance.put('/auth/update-profile', { profilePic });
    setAuthUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ authUser, isCheckingAuth, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
