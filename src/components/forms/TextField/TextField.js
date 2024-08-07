import React from 'react';
import './TextField.css';

const TextField = ({ label, name, value, onChange, type = 'text', placeholder = '', errorMessage }) => {
    return (
        <div className='text-field'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
};

export default TextField;
