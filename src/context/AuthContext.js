import React, { createContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFetchingUser = useRef(false);
  const isFetchingToken = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !isFetchingUser.current) {
      getData(token);
    }
  }, []);

  async function getData(token) {
    const url = 'https://localhost:7217/user';

    try {
      setLoading(true);
      console.log('Fetching user data');
      isFetchingUser.current = true;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if(response.ok) {
        const json = await response.json();
        setUser(json);
      } else if (response.status === 401) {
        console.log('Token expired, refreshing token...');
        await refreshAccessToken();
        const newToken = localStorage.getItem('accessToken');
        await getData(newToken);
      } else {
        const responseMessage = await response.text();
        throw new Error(`Response status: ${response.status}, responseMessage: ${responseMessage}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      isFetchingUser.current = false;
      setLoading(false);
    }
  }

  const login = async (email, password) => {
    const url = 'https://localhost:7217/auth/login';
    try {
      console.log('Sending login request');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const json = await response.json();
        localStorage.setItem('accessToken', json.token);
        localStorage.setItem('refreshToken', json.refreshToken);
        await getData(json.token);
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.log('No refresh token available, logging out...');
      logout();
      return;
    }

    try {
      console.log('Sending refresh token request');
      isFetchingUser.current = true;
      const response = await fetch('https://localhost:7217/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, refreshToken }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log('Token refreshed successfully');
        localStorage.setItem('accessToken', json.token);
        localStorage.setItem('refreshToken', json.refreshToken);
      } else {
        const errorText = await response.text();
        console.error('Token refresh failed:', errorText);
        logout();
      }
    } catch (error) {
      console.error('Error:', error);
      logout();
    } finally {
      isFetchingUser.current = false;
    }
  }

  const register = async (registerDto) => {
    const url = 'https://localhost:7217/auth/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerDto)
      });

      if (response.ok) {
        alert('Successful registration!');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (firstName, secondName, email, phoneNumber) => {
    const token = localStorage.getItem('accessToken');
    const url = 'https://localhost:7217/user';
    try {
      console.log('Sending user update request');
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, secondName, email, phoneNumber })
      });

      if (response.ok) {
        console.log('User updated successfully');
        await getData(token);
      } else {
        const errorText = await response.text();
        console.error('User update failed:', errorText);
        throw new Error('User update failed');
      }
    } catch (error) {
      console.error('Error during user update:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
