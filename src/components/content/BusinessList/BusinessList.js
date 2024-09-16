import React from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import './BusinessList.css';
import { useNavigate } from 'react-router-dom';

const BusinessList = ({ businesses }) => {
    const navigate = useNavigate();

    const handleBusinessClick = (businessId) => {
        navigate(`/business/${businessId}`);
    };

    return (
        <div className='business-list'>
            {businesses.map((business) => (
                <BusinessCard
                    key={business.id}
                    businessName={business.name}
                    businessAddress={business.address}
                    businessImage={business.image}
                    selectedServices={business.services ? (business.services) : ''}
                    onClick={() => handleBusinessClick(business.id)}
                />
            ))}
        </div>
    );
}

export default BusinessList;