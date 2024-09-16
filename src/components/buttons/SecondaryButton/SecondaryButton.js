import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = ({ children, onClick, type = 'button', className = '' }) => {
    return (
        <button className={`secondary-button ${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default SecondaryButton;