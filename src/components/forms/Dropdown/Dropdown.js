import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, name, value, options, onChange, errorMessage }) => {

    return (
        <div className='dropdown'>
            {label && <label>{label}</label>}
            <select 
                name={name}
                id={name}
                onChange={onChange}
                value={value}   
            >
                <option value='' disabled>
                    - Wybierz -
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
    );
};

export default Dropdown;