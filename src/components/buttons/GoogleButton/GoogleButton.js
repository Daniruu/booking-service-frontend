import React from 'react';
import './GoogleButton.css';

const GoogleButton = ({ children, onCLick, type = 'button'}) => {
    return (
        <button className='google-button' onClick={onCLick} type={type}>
            {children}
        </button>
    );
};

export default GoogleButton