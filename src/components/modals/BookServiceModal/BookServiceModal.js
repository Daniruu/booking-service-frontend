import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IoClose, IoChevronBackSharp   } from 'react-icons/io5';
import { IoMdArrowBack } from "react-icons/io";
import DatePicker from '../../content/DatePicker/DatePicker';
import TimeSlotSlider from '../../content/TimeSlotSlider/TimeSlotSlider';
import './BookServiceModal.css';
import PrimaryButton from '../../buttons/PrimaryButton/PrimaryButton';
import { ClipLoader } from 'react-spinners';

const BookServiceModal = ({ service, employee, isOpen, onClose }) => {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const { refreshAccessToken } = useContext(AuthContext);

    const getAvailableTimeSlots = async (serviceId, date) => {
        const token = localStorage.getItem('accessToken');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
    
        const url = `https://localhost:7217/reservation/available-timeslots?serviceId=${serviceId}&date=${date}&timeZone=${encodeURIComponent(timeZone)}`;
    
        setLoadingSlots(true);
    
        try {
            console.log('Sending time slots request', date);
            const response = await fetch(url, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const json = await response.json();
                setTimeSlots(json.length ? json : []);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch (url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (retryResponse.ok) {
                    const json = await response.json();
                    setTimeSlots(json.length ? json : []);
                } else {
                    setTimeSlots([]);
                    const errorMessage  = await response.text();
                    throw new Error(errorMessage);
                }
            }else {
                setTimeSlots([]);
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingSlots(false);
        }
    };
    

    const handleSelectDateTime = (timeSlot) => {
        if(timeSlot) {
            setSelectedDateTime(new Date(timeSlot));
            setSelectedSlot(timeSlot);
        }
    };

    const createReservation = async () => {
        const token = localStorage.getItem('accessToken');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const url = 'https://localhost:7217/reservation';

        if (!selectedDateTime) {
            alert('Proszę wybrać datę i godzinę rezerwacji');
            return;
        }

        const reservationDto = {
            serviceId: service.id,
            dateTime: selectedDateTime,
            status: 'active',
            timeZone: timeZone
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reservationDto)
            });

            if (response.ok) {
                alert('Usługa została pomyślnie zarezerwowana');
                onClose();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
                const retryResponse = await fetch(url, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(reservationDto)
                });

                if (retryResponse.ok) {
                    alert('Usługa została pomyślnie zarezerwowana');
                    onClose();
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
        }
    };

    const formatDateToLocalISO = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };

    const handleNextStep = () => {
        setStep(2);
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const formatServiceDateTime = (dateTime, duration) => {

        const formattedDate = dateTime.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const startTime = dateTime.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        
        const endDateTime = new Date(dateTime.getTime() + duration * 60000);
        
        const endTime = endDateTime.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        
        return (
            <div className='formatted-date-time'>
                <h2>{`${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`}</h2>
                <p>{`${startTime} - ${endTime} (${duration}min)`}</p>
            </div>
        );
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setSelectedDateTime(null);
    };

    useEffect(() => {
        if (selectedDate) {
            const formattedDate = formatDateToLocalISO(selectedDate);
            getAvailableTimeSlots(service.id, formattedDate);
        }
    }, [selectedDate, service.id]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal-overlay'>
            <div className='book-service-modal'>
                <button className='close-button' onClick={onClose}>
                    <IoClose />
                </button>
                {step === 2 && (
                    <button className='back-button' onClick={handlePrevStep}>
                        <IoMdArrowBack  />
                    </button>
                )}
                {step === 1 && (
                    <div className='reservation-date-time'>
                        <DatePicker
                            selectedDate={selectedDate} 
                            onDateChange={handleSelectDate} 
                        />
                        {loadingSlots ? (
                            <span className='white-space'></span>
                        ) : (
                            timeSlots.length > 0 ? (
                                <TimeSlotSlider 
                                    timeSlots={timeSlots} 
                                    selectedSlot={selectedSlot}
                                    onTimeSlotClick={handleSelectDateTime} 
                                />
                            ) : (
                                <p className='book-service-modal-error'>Brak dostępnych terminów dla wybranej daty</p>
                            )
                        )}
                        <PrimaryButton 
                            className='book-button' 
                            onClick={() => handleNextStep()}
                            disabled={selectedDateTime === null}
                        >
                            Dalej
                        </PrimaryButton>
                    </div>
                )}
                {step === 2 && (
                    <div className='reservation-details'>
                        <div className='reservation-date-time-container'>
                            {formatServiceDateTime(selectedDateTime, service.duration)}
                        </div>
                        <div className='service-details-container'>
                            <h2>{service.name}</h2>
                            <p>{service.description}</p>
                            <p>Pracownik: {employee.name}</p>
                        </div>
                        <div className='price-container'>
                            <p>Łącznie do zapłaty</p>
                            <h1>{service.price},00 zł</h1>
                        </div>
                        <PrimaryButton className='book-button' onClick={createReservation}>
                            Zarezerwuj
                        </PrimaryButton>
                    </div>
                )}      
            </div>
        </div>
    );
};

export default BookServiceModal;