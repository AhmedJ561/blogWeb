 import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // { _id, username, email, token }
  const [loading, setLoading] = useState(true);

  // Rehydrate from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('blogwen_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data);
    localStorage.setItem('blogwen_user', JSON.stringify(data));
    return data;
  };

  const register = async (credentials) => {
    const data = await registerUser(credentials);
    setUser(data);
    localStorage.setItem('blogwen_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogwen_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
