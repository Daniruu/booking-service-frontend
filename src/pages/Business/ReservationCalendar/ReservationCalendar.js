import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IoClose } from 'react-icons/io5';
import DatePicker from '../../../components/content/DatePicker/DatePicker';
import './ReservationCalendar.css';

const ReservationCalendar = ({ business }) => {
    const { refreshAccessToken } = useContext(AuthContext);
    const [reservations, setReservations] = useState(null);
    const [loading, setLoading] = useState(false);
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const formatDateForUrl = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };

    const getBusinessReservations = async (selectedDate) => {
        const token = localStorage.getItem('accessToken');
        
        const formattedDate = formatDateForUrl(selectedDate);
        const url = `https://localhost:7217/reservation/${business.id}?date=${formattedDate}`;

        try {
            setLoading(true);
            console.log('Sending get business reservation request', {formattedDate})
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const json = await response.json();
                setReservations(json);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${newToken}` }
                });

                if (retryResponse.ok) {
                    const json = await retryResponse.json();
                    setReservations(json);
                } else {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
    };

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const formatDate = (date) => {
        const formattedDate = date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
    };
    
    useEffect(() => {
        if (business && business.id) {
            getBusinessReservations(selectedDate);
        }
    }, [selectedDate, business]);

    return (
        <div className='reservation-calendar'>
            <div className='reservation-calendar-header'>
                <button className='date-picker-toggler' onClick={toggleCalendar}>
                    {formatDate(selectedDate)}
                </button>
                {isCalendarOpen && (
                    <DatePicker 
                        selectedDate={selectedDate}
                        onDateChange={handleSelectDate}
                        className='reservation-calendar-date-picker'
                    />
                )}
                <button className='set-today-button' onClick={() => setSelectedDate(today)}>
                    Dzisiaj
                </button>
            </div>
        </div>
    );
}

export default ReservationCalendar;
