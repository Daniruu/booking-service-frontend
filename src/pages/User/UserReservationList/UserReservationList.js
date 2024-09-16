import React, { useState, useEffect } from 'react';
import ReservationItem from '../UserPage/ReservationItem/ReservationItem';
import './UserReservationList.css';

const UserReservationList = ({ reservations, onReservationClick }) => {
    const upcommingResertvations = reservations.filter(reservation => reservation.status === 'active').sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));;
    const pastReservations = reservations.filter(reservation => reservation.status === 'cancelled' || reservation.status === 'finished').sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));;
    
    return (
        <div className='user-reservation-list'>
            {upcommingResertvations.length > 0 && (
                <>
                <h3>Nadchodznące</h3>
                {upcommingResertvations.map((reservation) => (
                    <ReservationItem 
                        key={reservation.id}
                        reservation={reservation}
                        onClick={() => onReservationClick(reservation)}
                    />)
                )}
                </>
            )}

            {pastReservations.length > 0 && (
                <>
                <h3>Zakończone</h3>
                {pastReservations.map((reservation) => (
                    <ReservationItem 
                        key={reservation.id}
                        reservation={reservation}
                    />)
                )}
                </>
            )}
        </div>
    );
}

export default UserReservationList;