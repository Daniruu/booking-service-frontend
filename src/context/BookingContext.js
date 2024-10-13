import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { showNotification } = useNotification();
    const { refreshAccessToken } = useAuth();

    const createBooking = async (createBookingDto) => {
        const url = `${apiUrl}/bookings`;

        try {
            console.log('Sending create booking request: ');
            
            const response = await sendRequestWithToken(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createBookingDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Booking created successfuly');
        } catch (error) {
            showNotification('Nie udało się zarezerwować usługę', error.message, 'error');
        }
    };

    const getBooking = async (bookingId) => {
        const url = `${apiUrl}/bookings/${bookingId}`;

        try {
            const bookingData = await sendRequest(url);

            console.log('Booking successfuly fetched.');
            return bookingData;
        } catch (error) {
            showNotification('Nie udało się zaadować dane', error.message, 'error');
        }
    };

    const updateBooking = async (bookingId, updateBookingDto) => {
        const url = `${apiUrl}/bookings/${bookingId}`;

        try {
            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateBookingDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Booking updated successfuly');
        } catch (error) {
            showNotification('Nie udało się zaktualizować rezerwacje', error.message, 'error');
        }
    };

    const cancelBooking = async (bookingId) => {
        const url = `${apiUrl}/bookings/${bookingId}`;

        try {
            const response = await sendRequestWithToken(url, { method: 'PUT' }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Booking cancelled successfuly');
        } catch (error) {
            showNotification('Nie udało się odwołać usługę', error.message, 'error');
        }
    };

    const getAvailableTimeSlots = async (serviceId, date) => {
        const url = `${apiUrl}/bookings/available-slots?serviceId=${serviceId}&dateTime=${encodeURIComponent(date)}`;

        try {
            const data = await sendRequestWithToken(url, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, refreshAccessToken);

            console.log('Time Slots fetched successfuly.');
            return data;
        } catch (error) {
            showNotification('Nie udało się pobrać dane', error.message, 'error');
            throw new Error(error.message);
        }
    };
    
    return (
        <BookingContext.Provider value={{ createBooking, getBooking, updateBooking, cancelBooking, getAvailableTimeSlots }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => useContext(BookingContext);