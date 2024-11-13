import React, { createContext, useState, useRef, useContext } from 'react';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';
import { useAuth } from './AuthContext';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const { refreshAccessToken } = useAuth();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    const [businesses, setBusinesses] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [businessDetails, setBusinessDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchBusinesses = async (queryParams) => {
        const url = new URL(`${apiUrl}/businesses/list`);
        const params = new URLSearchParams(queryParams);
        url.search = params.toString();

        try {
            console.log('Fetching businesses list...');
            setLoading(true);
            const data = await sendRequest(url);

            console.log('Businesses successfuly fetched.');
            setBusinesses(data.businesses);
            setPagination(data.pagination);
        } catch (error){
            showNotification('Nie udało się załadować dane', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchBusinessDetails = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}`;

        try {
            console.log('Fetching business details data, business id: ', businessId);
            setLoading(true);
            const data = await sendRequest(url);

            console.log('Business details successfully fetched');
            setBusinessDetails(data);
        } catch (error) {
            showNotification('Nie udało się załadować dane', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const checkFavoriteStatus = async (businessId) => {
        const url = `${apiUrl}/users/favorites/${businessId}/exists`;

        try {
            const response = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);
            setIsFavorite(response);
        } catch (error) {
            showNotification('Nie udało się sprawdzić firmy w ulubionych', error.message, 'error');
        }
    };

    const toggleFavorite = async (businessId) => {
        const url = `${apiUrl}/users/favorites/${businessId}`

        try {
            if (isFavorite) {
                await sendRequestWithToken(url, { method: 'DELETE' }, refreshAccessToken);
            } else {
                await sendRequestWithToken(url, { method: 'POST' }, refreshAccessToken);
            }
    
            setIsFavorite(!isFavorite);
        } catch (error) {
            showNotification('Nie udało się zmienić status przedsiębiorstwa', error.message, 'error');
        }
    };

    return (
        <BusinessContext.Provider value={{ businesses, pagination, businessDetails, loading, isFavorite, checkFavoriteStatus, fetchBusinesses, fetchBusinessDetails, toggleFavorite }}>
            {children}
        </BusinessContext.Provider>
    );
}

export const useBusiness = () => useContext(BusinessContext);