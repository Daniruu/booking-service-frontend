import React from 'react';
import './FloatingCard.css';

const FloatingCard = ({ children }) => {
    return (
        <div className='floating-card'>
            {children}
        </div>
    );
};

export default FloatingCard;