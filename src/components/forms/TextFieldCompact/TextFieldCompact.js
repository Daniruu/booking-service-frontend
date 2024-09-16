import React from 'react';
import './TextFieldCompact.css';

const TextFieldCompact = ({ label, name, value, onChange, type = 'text', placeholder = '', isValid = true, className = '' }) => {
    return (
        <div className={`text-field-compact ${className} ${!isValid ? 'invalid' : ''}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextFieldCompact;
