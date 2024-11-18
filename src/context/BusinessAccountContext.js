import React, { createContext, useState, useRef, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';
import { useUser } from './UserContext';

const BusinessAccountContext = createContext();

export const BusinessAccountProvider = ({ children }) => {
    const { refreshAccessToken } = useAuth();
    const { showNotification } = useNotification();
    const { user, setUser } = useUser();

    const [business, setBusiness] = useState(null);
    const [images, setImages] = useState(null);
    const [workingHours, setWorkingHours] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchBusiness = async () => {
        const url = `${apiUrl}/businesses`;

        try {
            console.log('Fetcging business data...');
            setLoading(true);

            const businessData = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);

            setBusiness(businessData);
            console.log('Business data successfully fetched');
        } catch (error) {
            showNotification('Nie udało się załadować dane biznesu', error.message, 'error' );
        } finally {
            setLoading(false);
        }
    };

    const registerBusiness = async (registerBusinessDto) => {
        const url = `${apiUrl}/businesses`

        try {
            console.log('Sending create business request...');

            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: JSON.stringify(registerBusinessDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            setUser({
                ...user,
                role: 'owner'
            });
            console.log('Business registered successfuly');
        } catch (error) {
            showNotification('Nie udało się zarejestrować przedsębiorstwa', error.message, 'error');
        }
    };

    const updateBusiness = async (businessId, updateBusinessDto) => {
        const url = `${apiUrl}/businesses/${businessId}`;
        
        try {
            console.log('Updating business data...');

            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateBusinessDto)
            }, refreshAccessToken);

            setBusiness(updateBusinessDto);
            showNotification('Dane zaktualizowane', response.message, 'success');
            console.log('Business successfully updated');
        } catch (error) {
            showNotification('Nie udało się zaktualizować dane biznesu', error.message, 'error');
        }
    };

    const fetchBusinessWorkingHours = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/working-hours`;

        try {
            console.log('Fetching business working hurs');

            const workingHoursData = await sendRequest(url);

            console.log('Business working hours successfully fetched.');
            setWorkingHours(workingHoursData);
        } catch (error) {
            showNotification('Nie udało się saładować godziny pracy', error.message, 'error');
        }
    };

    const updateBusinessWorkingHours = async (businessId, updateWorkingHoursDto) => {
        const url = `${apiUrl}/businesses/${businessId}/working-hours`;

        try {
            console.log('Updating business working hours...');

            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateWorkingHoursDto)
            }, refreshAccessToken);

            showNotification('Godziny pracy zostały zaktualizowane', response.message, 'success');
            console.log('Business working hours updated successfully.');
        } catch (error) {
            showNotification('Nie udało się zaktualizować godziny pracy', error.message, 'error');
        }
    };

    const getBusinessBookings = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/bookins`;

        try {
            console.log('Fetching business bookings...');

            const bookingsData = await sendRequestWithToken(url, {
                method: 'GET'
            });

            console.log('Business bookings successfully fetched.');
            return bookingsData;
        } catch (error) {
            showNotification('','','error');
        }
    };

    const fetchBusinessImages = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/images`;

        try {
            console.log('Fetching business images...');
            const data = await sendRequest(url);

            console.log('Businesses images successfuly fetched.');
            setImages(data);
        } catch (error) {
            showNotification('Nie udao się załadować dane', error.message, 'error');
        }
    };

    const uploadImage = async (businessId, formData) => {
        const url = `${apiUrl}/businesses/${businessId}/upload-image`;

        try {
            console.log("Uploading business image...");

            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: formData
            }, refreshAccessToken);

            showNotification('Przesłano plik', response.message, 'success');
            await fetchBusinessImages(businessId);
        } catch (error) {
            showNotification('Nie udało się przesłać plik', error.message, 'error');
        }
    };


    const setPrimaryImage = async (businessId, imageId) => {
        const url = `${apiUrl}/businesses/${businessId}/set-primary-image/${imageId}`;

        try {
            console.log('Sending set primary image request...');
            const response = await sendRequestWithToken(url, { method: 'PUT' }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            
            setImages(prevImages =>
                prevImages.map(image =>
                    image.id === imageId ? { ...image, isPrimary: true } : { ...image, isPrimary: false }
                )
            );

            console.log('Primary image set.');
        } catch (error) {
            showNotification('Nie udało się ustawić głównego obrazu', error.message, 'error');
        }
    };

    const deleteImage = async (businessId, image) => {
        const url = `${apiUrl}/businesses/${businessId}/delete-image/${image.id}`;

        try {
            console.log('Deleting image...');
            const response = await sendRequestWithToken(url, { method: 'DELETE' }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Image deleted.');

            if (image.isPrimary && images.length > 1) {
                const nextPrimaryImage = images.find(img => img.id !== image.id);
                await setPrimaryImage(businessId, nextPrimaryImage.id);
                showNotification('Nowe główne zdjęcie zostało ustawione', '', 'success');
            }
            await fetchBusinessImages(businessId);
        } catch (error) {
            showNotification('Nie udało się usunąć obrazu', error.message, 'error');
        }
    };

    const togglePublish = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/toggle-publish`;

        try {
            setLoading(true);
            const response = await sendRequestWithToken(url, { method: 'PUT' }, refreshAccessToken);

            setBusiness((prevBusiness) => ({
                ...prevBusiness,
                isPublished: !prevBusiness.isPublished
            }));

            showNotification('Udało się!', response.message, 'success');
        } catch (error) {
            showNotification('Nie udało się zaktualizować status przedsiębiorstwa', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BusinessAccountContext.Provider value = {{ 
            business, 
            images,
            workingHours,
            loading, 
            setBusiness, 
            registerBusiness, 
            fetchBusiness, 
            updateBusiness, 
            updateBusinessWorkingHours, 
            fetchBusinessWorkingHours, 
            getBusinessBookings, 
            uploadImage, 
            fetchBusinessImages,
            setPrimaryImage,
            deleteImage,
            togglePublish
        }}>
            {children}
        </BusinessAccountContext.Provider>
    );
}

export const useBusinessAccount = () => useContext(BusinessAccountContext);