import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/auth/LoginModal';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('jwt_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('jwt_token', token);
    else localStorage.removeItem('jwt_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (jwtToken, userObj) => {
    setToken(jwtToken);
    setUser(userObj);
    setIsLoginOpen(false);
    // placeholder: sync local data to backend later
    const localData = localStorage.getItem('japa_stats');
    if (localData) console.log('syncLocalDataToBackend', JSON.parse(localData));

    // if a redirect path was set, navigate there after login
    if (redirectAfterLogin) {
      navigate(redirectAfterLogin, { replace: true });
      setRedirectAfterLogin(null);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const openLogin = (redirectPath = null) => {
    if (redirectPath) setRedirectAfterLogin(redirectPath);
    setIsLoginOpen(true);
  };
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, openLogin, closeLogin, isAuthenticated: !!token }}>
      {children}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onLogin={login} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
