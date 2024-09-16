import React from 'react';
import './TextField.css';

const TextField = ({ label, name, value, onChange, type = 'text', placeholder = '', errorMessage, className = '', readOnly = false }) => {
    return (
        <div className={`text-field ${className} ${readOnly ? 'read-only' : ''}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                className={readOnly ? 'read-only-input' : ''}
            />
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
};

export default TextField;
