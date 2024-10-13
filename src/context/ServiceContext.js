import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const { refreshAccessToken } = useAuth();
    const { showNotification } = useNotification();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [services, setServices] = useState(null);

    const addService = async (businessId, addServiceDto) => {
        const url = `${apiUrl}/businesses/${businessId}/services`;

        try {
            console.log('Adding service...', addServiceDto);

            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: JSON.stringify(addServiceDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Service added successfully.');

            await fetchBusinessServices(businessId);
        } catch (error) {
            showNotification('Nie udało się dodać usługę', error.message, 'error');
        }
    };

    const fetchBusinessServices = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/services`;

        try {
            console.log('Fetching business services...');

            const data = await sendRequest(url);

            console.log('Business services fetched successfully.');
            setServices(data);
        } catch (error) {
            showNotification('Nie udało się załadować dane o usługach', error.message, 'error');
        }
    };

    const getBusinessService = async (businessId, serviceId) => {
        const url = `${apiUrl}/businesses/${businessId}/services/${serviceId}`;

        try {
            console.log('Fetching business service details...');

            const data = await sendRequest(url);

            console.log('Business service fetched successfully.');
            return data;
        } catch (error) {
            showNotification('Nie udało się załadować dane o usłudze', error.message, 'error');
        }
    };

    const updateBusinessService = async (businessId, serviceId, updateServiceDto) => {
        const url = `${apiUrl}/businesses/${businessId}/services/${serviceId}`;

        try {
            console.log('Updating business service...');

            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateServiceDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Business service updated successfully.');

            await fetchBusinessServices(businessId);
        } catch (error) {
            showNotification('Nie udało się zaktualizować usługę', error.message, 'error');
        }
    };

    const deleteBusinessService = async (businessId, serviceId) => {
        const url = `${apiUrl}/businesses/${businessId}/services/${serviceId}`;

        try {
            console.log('Updating business service...');

            const response = await sendRequestWithToken(url, {
                method: 'DELETE'
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Business service deleted successfully.');

            await fetchBusinessServices(businessId);
        } catch (error) {
            showNotification('Nie udało się usunąnć usługę', error.message, 'error');
        }
    };

    return (
        <ServiceContext.Provider value = {{ services, addService, fetchBusinessServices, getBusinessService, updateBusinessService, deleteBusinessService }}>
            {children}
        </ServiceContext.Provider>
    );
}

export const useService = () => useContext(ServiceContext);