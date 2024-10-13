import React, { createContext, useState, useCallback, useContext, useRef } from 'react';
import { useNotification } from './NotificationContext';
import { handleError } from '../utils/errorHandler';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const isTokenRefreshing = useRef(false);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const register = async (registerDto) => {
    const url = `${apiUrl}/auth/register`;
    try {
      setLoading(true);
      console.log('Sending register request...');

      const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registerDto)
      });

      if (response.ok) {
        const json = await response.json();
        showNotification('Udało się!', json.message, 'success');
        return json;
      } else {
        await handleError(response);
      }
    } catch (error) {
      showNotification('Nie udało się zarejestrować', error.message, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginDto) => {
    const url = `${apiUrl}/auth/login`;
    try {
      setLoading(true);
      console.log('Sending login request');

      const response = await fetch (url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDto)
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('accessToken', json.accessToken);
        localStorage.setItem('refreshToken', json.refreshToken);
        
        showNotification('Logowanie powiodło się!', 'Jesteś zalogowany', 'success');
        console.log('Successful login.');
        setAuth(true);
      } else {
        await handleError(response);
      }
    } catch (error) {
      showNotification('Nie udało się zalogować', error.message, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showNotification('Wylogowanie', 'Użytkownik został wylogowany', 'info');
    setAuth(false);
    console.log('Account logout');
  };

  const refreshAccessToken = async () => {
    if (isTokenRefreshing.current) return null;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const url = `${apiUrl}/auth/refresh`;

    if (!refreshToken) {
      showNotification('Sesja wygasła','Proszę zalogować się ponownie','error');
      logout();
      throw new Error('No refresh token, logout...');
    }
    
    try {
      setLoading(true);
      isTokenRefreshing.current = true; 
      console.log('Refreshing access token...');

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, refreshToken })
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('accessToken', json.accessToken);
        localStorage.setItem('refreshToken', json.refreshToken);

        console.log('Token refreshed successfully.');
        return json.accessToken;
      } else {
        await handleError(response);
      }
    } catch (error) {
      showNotification('Odświeżanie sesji nie powiodło się', error.message, 'error');
      logout();
    } finally {
      setLoading(false);
      isTokenRefreshing.current = false;
    }
  };

  return (
    <AuthContext.Provider value={{ loading, auth, register, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
