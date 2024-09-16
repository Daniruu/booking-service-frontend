import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button className={`primary-button ${className}`} onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default PrimaryButton;