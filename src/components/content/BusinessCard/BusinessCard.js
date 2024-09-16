import React from 'react';
import ServiceRow from '../ServiceRow/ServiceRow';
import BookServiceModal from '../../modals/BookServiceModal/BookServiceModal';
import './BusinessCard.css';


const BusinessCard = ({ businessName, businessAddress, businessImage, selectedServices, onClick }) => {
    const servicesToDisplay = selectedServices.slice(0, 3);

    return (
        <div className='business-card'>
            {/*<img src={businessImage} alt='Zdjęcie przedsiębiorstwa'></img>*/}
            <img src="https://placeholder.apptor.studio/420/360/product1.png" alt="" onClick={onClick} />
            <div className='business-card-content'>
                <h2 onClick={onClick}>{businessName}</h2>
                <p>
                    {businessAddress.street} {businessAddress.buildingNumber} 
                    {businessAddress.roomNumber ? `/${businessAddress.roomNumber}` : ''}, {businessAddress.city}
                </p>
                <ul>
                    {servicesToDisplay.length > 0 ? (
                        servicesToDisplay.map((selectedService) => (
                            <li key={selectedService.id}>
                                <ServiceRow
                                    service={selectedService}
                                />
                            </li>
                        ))
                    ) : (
                        <p>Brak wybranych usług</p>
                    )}
                </ul>
                <button className='show-more-button' onClick={onClick}>
                    Pokaż więcej...
                </button>
            </div>
        </div>
    );
}

export default BusinessCard;