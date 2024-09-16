import React from 'react';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import './BusinessPageServiceRow.css';

const BusinessPageServiceRow = ({ service, onClick }) => {
    return (
        <div className='business-page-service-row'>
            {service && (
                <>
                    <div className='business-page-service-row-content'>
                    <div className="top-row">
                        <h3>{service.name}</h3>
                        <h3>{service.price} zł</h3>
                    </div>
                    <div className="bottom-row">
                        <p>{service.description}</p>
                        <p>{service.duration} min</p>
                    </div>
                    </div>
                    <PrimaryButton onClick={() => onClick(service.id)}>
                        Umów
                    </PrimaryButton>
                </>
            )}
        </div>
    );
}

export default BusinessPageServiceRow;