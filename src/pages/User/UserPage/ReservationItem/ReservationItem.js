import React from 'react';
import './ReservationItem.css';


const ReservationItem = ({ reservation, onClick }) => {
    const formattedDate = new Date(reservation.dateTime).toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    return (
        <div className='reservation-item' onClick={onClick}>
            <div className="top-row">
                <div>
                    <h3>{reservation.service.name}</h3>
                    <p className={`status ${reservation.status}`}>
                    ({reservation.status === 'active' 
                        ? 'aktywna' 
                        : reservation.status === 'cancelled' 
                        ? 'anulowana' 
                        : 'zakończona'})
                    </p>

                </div>
                <p>{reservation.service.employee.name}</p> 
            </div>
            <div className="bottom-row">
            <p>{formattedDate} ({reservation.service.duration} min)</p>
                <p className='price'>{reservation.service.price} zł</p>
            </div>
        </div>
    );
}

export default ReservationItem;