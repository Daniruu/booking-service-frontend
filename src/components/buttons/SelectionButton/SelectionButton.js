import React from 'react';
import './SelectionButton.css';

const SelectionButton = ({ children, onClick, type = 'button', icon, isSelected = false }) => {
    return (
        <button 
        className={`selection-button ${isSelected ? 'selected':''}`}
        onClick={onClick} 
        type={type}
        >
            {icon && (<img src={icon} alt='icon' className='icon-extra-sm'/>)}
            {children}
        </button>
    );
};

export default SelectionButton;