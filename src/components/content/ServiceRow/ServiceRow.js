import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../buttons/PrimaryButton/PrimaryButton';
import './ServiceRow.css';

const ServiceRow = ({ service }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/business/${service.businessId}?serviceId=${service.id}`);
    };

    return (
        <div className='service-row'>
            <div className='service-row-content'>
                <div className="top-row">
                    <h3>{service.name}</h3>
                    <h3>{service.price} zł</h3>
                </div>
                <div className="bottom-row">
                    <p>{service.description}</p>
                    <p>{service.duration} min</p>
                </div>
            </div>
            <PrimaryButton onClick={handleClick}>
                Umów
            </PrimaryButton>
        </div>
    );
};

export default ServiceRow;