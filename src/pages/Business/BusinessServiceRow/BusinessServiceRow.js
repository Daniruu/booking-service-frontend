import React from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
import './BusinessServiceRow.css';

const BusinessServiceRow = ({ serviceName, servicePrice, serviceDuration, onClick, isFeatured , onFeautureClick: onFeatureClick }) => {
    return (
        <div className='business-service-row'>
            <div className='business-service-row-content' onClick={onClick}>
                <div className="top-row">
                    <h3>{serviceName}</h3>
                </div>
                <div className="bottom-row">
                    <p>{servicePrice} zł - {serviceDuration} min</p>
                </div>
            </div>
            <button className='feature-button' onClick={onFeatureClick}>
                {isFeatured  ? (<FaStar />) : (<FaRegStar />)}
            </button>
        </div>
    );
}

export default BusinessServiceRow;