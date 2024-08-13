import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = ({ children, onClick, type = 'button' }) => {
    return (
        <button className='secondary-button' onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default SecondaryButton;