import React, { createContext, useState, useCallback, useContext, useRef } from 'react';
import { useNotification } from './NotificationContext';
import { handleError } from '../utils/errorHandler';
import { sendRequest } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const isTokenRefreshing = useRef(false);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  const register = async (registerDto) => {
    const url = `${apiUrl}/auth/register`;

    try {
      await sendRequest(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerDto)
      });

      showNotification('Użytkownik zarejestrowany!', 'Użyj swoich danych aby się zalogować', 'success');
      return true;
    } catch (error) {
      showNotification('Nie udało się zarejestrować', error.message, 'error');
      return false;
    }
  };
  
  const login = async (loginDto) => {
    const url = `${apiUrl}/auth/login`;

    try {
      const data = await sendRequest(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDto)
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      showNotification('Logowanie powiodło się!', 'Jesteś zalogowany', 'success');
      console.log('Successful login.');
      return true;
    } catch (error) {
      showNotification('Nie udało się zalogować', error.message, 'error');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showNotification('Wylogowanie', 'Użytkownik został wylogowany', 'info');
    console.log('Account logout');
  };

  const refreshAccessToken = async () => {
    if (isTokenRefreshing.current) return null;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const url = `${apiUrl}/auth/refresh`;

    if (!refreshToken) {
      showNotification('Sesja wygasła','Proszę zalogować się ponownie','info');
      logout();
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
    <AuthContext.Provider value={{ loading, register, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
