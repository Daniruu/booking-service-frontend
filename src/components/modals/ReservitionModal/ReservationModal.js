import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { IoClose, IoChevronBackSharp   } from 'react-icons/io5';
import { IoMdArrowBack } from "react-icons/io";
import DatePicker from '../../content/DatePicker/DatePicker';
import TimeSlotSlider from '../../content/TimeSlotSlider/TimeSlotSlider';
import './ReservationModal.css';
import PrimaryButton from '../../buttons/PrimaryButton/PrimaryButton';
import { ClipLoader } from 'react-spinners';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import { MdDeleteOutline } from "react-icons/md";

const ReservationModal = ({ reservation, isOpen, onClose, onDelete }) => {
    const { refreshAccessToken } = useContext(AuthContext);

    const handleDeleteReservation = () => {
        onDelete(reservation.id);
        onClose();
    };
    

    const formatServiceDateTime = () => {
        const dateTime = new Date(reservation.dateTime);
        
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
        
        const endDateTime = new Date(dateTime.getTime() + reservation.service.duration * 60000);
        
        const endTime = endDateTime.toLocaleTimeString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        
        return (
            <div className='formatted-date-time'>
                <h2>{`${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`}</h2>
                <p>{`${startTime} - ${endTime} (${reservation.service.duration}min)`}</p>
            </div>
        );
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal-overlay'>
            <div className='reservation-modal'>
                <button className='close-button' onClick={onClose}>
                    <IoClose />
                </button>
                
                <div className='reservation-details'>
                    <div className='reservation-date-time-container'>
                        {formatServiceDateTime()}
                    </div>
                    <div className='service-details-container'>
                        <h2>{reservation.service.name}</h2>
                        <p>{reservation.service.description}</p>
                        <p>Pracownik: {reservation.service.employee.name}</p>
                    </div>
                    <div className='price-container'>
                        <p>Łącznie do zapłaty</p>
                        <h1>{reservation.service.price},00 zł</h1>
                    </div>
                    <div className='reservation-modal-buttons'>
                        <PrimaryButton className='edit-button' >Edyduj</PrimaryButton>
                        <SecondaryButton onClick={() => handleDeleteReservation()}><MdDeleteOutline /></SecondaryButton>
                    </div>
                </div>     
            </div>
        </div>
    );
};

export default ReservationModal;