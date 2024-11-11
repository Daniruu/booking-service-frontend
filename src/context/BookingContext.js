import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { showNotification } = useNotification();
    const { refreshAccessToken } = useAuth();
    const [userBookings, setUserBookings] = useState(null);

    const fetchUserBookings = async () => {
        const url = `${apiUrl}/users/bookings`;
        
        try {
            console.log('Fetching user bookings...');
            const data = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);
            
            console.log("User bookings successfully fetched");
            setUserBookings(data);
        } catch (error) {
            showNotification('Nie udało się pobrać dane rezerwacje', error.message, 'error');
        }
    };

    const fetchBookingDetails = async (bookingId) => {
        const url = `${apiUrl}/bookings/${bookingId}`;

        try {
            const data = await sendRequestWithToken(url, { method: 'GET' }, refreshAccessToken);

            console.log('Booking successfuly fetched.');
            return data;
        } catch (error) {
            showNotification('Nie udało się zaadować dane', error.message, 'error');
        }
    };

    const createBooking = async (createBookingDto) => {
        const url = `${apiUrl}/bookings`;

        try {
            console.log('Sending create booking request: ', createBookingDto);
            
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

    const updateBooking = async (bookingId, updateBookingDto) => {
        const url = `${apiUrl}/bookings/${bookingId}`;

        try {
            console.log(`Sending update booking request: ${bookingId}`, updateBookingDto);

            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateBookingDto)
            }, refreshAccessToken);

            setUserBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, dateTime: updateBookingDto.dateTime } : booking
                )
            );

            showNotification('Udało się!', response.message, 'success');
            console.log('Booking updated successfuly');
        } catch (error) {
            showNotification('Nie udało się zaktualizować rezerwacje', error.message, 'error');
        }
    };

    const cancelBooking = async (bookingId) => {
        const url = `${apiUrl}/bookings/${bookingId}/cancel`;

        try {
            const response = await sendRequestWithToken(url, { method: 'PUT' }, refreshAccessToken);

            setUserBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
                )
            );

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
        <BookingContext.Provider value={{ userBookings, fetchUserBookings, createBooking, fetchBookingDetails, updateBooking, cancelBooking, getAvailableTimeSlots }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => useContext(BookingContext);