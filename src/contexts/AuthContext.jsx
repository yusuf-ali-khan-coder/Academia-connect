import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        api.setTokens(parsed.accessToken, parsed.refreshToken);
        api.getMe().then(u => { setUser(u); setLoading(false); }).catch(() => { localStorage.removeItem('auth'); setLoading(false); });
      } catch { localStorage.removeItem('auth'); setLoading(false); }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    api.setTokens(data.access, data.refresh);
    localStorage.setItem('auth', JSON.stringify({ accessToken: data.access, refreshToken: data.refresh }));
    setUser(data.user);
    return data.user;
  };

  const signup = async (formData) => {
    const data = await api.signup(formData);
    api.setTokens(data.access, data.refresh);
    localStorage.setItem('auth', JSON.stringify({ accessToken: data.access, refreshToken: data.refresh }));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    api.clearTokens();
    localStorage.removeItem('auth');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
