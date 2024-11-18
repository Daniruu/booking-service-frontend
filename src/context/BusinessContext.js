import React, { createContext, useState, useRef, useContext } from 'react';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';
import { useAuth } from './AuthContext';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const { refreshAccessToken } = useAuth();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    const [loading, setLoading] = useState(false);
    const [businesses, setBusinesses] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [businessDetails, setBusinessDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviews, setReviews] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);

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

    const fetchBusinessReviews = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/reviews`;

        try {
            setLoading(true);
            console.log('Fetching business reviews...');
            const data = await sendRequest(url);

            setReviews(data);
            console.log('Business reviwes fetched successfully!');
        } catch (error) {
            showNotification('Nie udało się pobrać dane o opiniach', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const addReview = async (businessId, reviewData) => {
        const url = `${apiUrl}/businesses/${businessId}/reviews`;

        try {
            setLoading(true);
            console.log('Sending business review');
            const response = await sendRequestWithToken(url, { 
                method: 'POST',
                body: JSON.stringify(reviewData)
            }, refreshAccessToken);

            await fetchBusinessReviews(businessId);
            setHasReviewed(true);
            showNotification('Udało się!', response.message, 'success');
        } catch (error) {
            showNotification('Nie udało się dodać opinie', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const checkReviewStatus = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/reviews/exists`;

        try {
            console.log('Checking review status...');
            const response = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);
            setHasReviewed(response);
        } catch (error) {
            showNotification('Nie udało się sprawdzić statusu opinii', error.message, 'error');
        }
    };

    return (
        <BusinessContext.Provider value={{ 
            businesses, 
            pagination, 
            businessDetails, 
            loading, 
            isFavorite, 
            reviews, 
            hasReviewed,
            checkReviewStatus,
            addReview, 
            fetchBusinessReviews, 
            checkFavoriteStatus, 
            fetchBusinesses, 
            fetchBusinessDetails, 
            toggleFavorite 
        }}>
            {children}
        </BusinessContext.Provider>
    );
}

export const useBusiness = () => useContext(BusinessContext);