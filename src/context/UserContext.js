import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';
import { useNotification } from './NotificationContext';
import { handleError } from '../utils/errorHandler';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { refreshAccessToken } = useAuth();
    const { showNotification } = useNotification();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState(null);
    const [loading, setLoading] = useState(false);
    const isFetchingUser = useRef(false);
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchUserData = async () => {
        if (isFetchingUser.current) return;
        const url = `${apiUrl}/users`;

        console.log('Fetching user data...');
        try {
            setLoading(true);
            isFetchingUser.current = true;

            const userData = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);

            setUser(userData);
            console.log('User data successfully fetched');
        } catch (error) {
            showNotification('Nie udało się załadować dane użytkownika', error.message, 'error');
        } finally {
            setLoading(false);
            isFetchingUser.current = false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (token && !isFetchingUser.current) {
            fetchUserData();
        }
    }, []);

    const getUserById = async (userId) => {
        const url = `${apiUrl}/users/${userId}`;

        console.log('Fetching user data, user id: ', userId);
        try {
            const userData = await sendRequest(url);

            console.log('User data successfully fetched');
            return userData;
        } catch (error) {
            showNotification('Nie udało się załadować dane', error.message, 'error');
        }
    };

    const updateUser = async (updateUserDto) => {
        const url = `${apiUrl}/users`;
        
        try {
            console.log('Updating user data...');
            setLoading(true);
            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateUserDto)
            }, refreshAccessToken);

            setUser({
                ...user,
                name: updateUserDto.name,
                email: updateUserDto.email,
                phone: updateUserDto.phone
            });

            showNotification('Udało się!', response.message, 'success');
            console.log('User data successfully updated');
        } catch (error) {
            showNotification('Nie udało się zaktualizować dane użytkownika', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserBookings = async () => {
        const url = `${apiUrl}/users/bookings`;

        
        try {
            console.log('Fetching user bookings...');
            const data = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);
            
            console.log("User bookings successfully fetched");
            setBookings(data);
        } catch (error) {
            showNotification('Nie udało się pobrać dane rezerwacje', error.message, 'error');
        }
    };

    const uploadAvatar = async (formData) => {
        const url = `${apiUrl}/users/upload-avatar`;
        
        try {
            console.log("Uploading user avatar...");
            setLoading(true);

            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: formData
            }, refreshAccessToken);
            
            setUser({
                ...user,
                avatarUrl: response.avatarUrl
            });

            showNotification('Udało się!', response.message, 'success');
        } catch (error) {
            showNotification('Nie udało się zaktualizować zdjęcie profilu', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const deleteAvatar = async () => {
        const url = `${apiUrl}/users/delete-avatar`;

        try {
            console.log("Uploading user avatar...");
            
            const response = await sendRequestWithToken(url, {
                method: 'DELETE'
            }, refreshAccessToken);

            setUser({
                ...user,
                avatarUrl: null
            });
            
            showNotification('Udało się!', response.message, 'success');
        } catch (error) {
            showNotification('Nie udało się usunąć zdjęcie profilu', error.message, 'error');
        }
    };

    return (
        <UserContext.Provider value={{ user, bookings, loading, setUser, fetchUserData, getUserById, updateUser, fetchUserBookings, uploadAvatar, deleteAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
