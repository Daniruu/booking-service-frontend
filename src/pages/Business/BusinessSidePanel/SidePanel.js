import React from 'react';
import { IoClose } from "react-icons/io5";
import './SidePanel.css';

const SidePanel = ({ isVisible, onClose, children }) => {
    return (
        <div className={`side-panel ${isVisible ? 'visible' : 'hidden'}`}>
            <button className='close-button' onClick={onClose}>
                <IoClose />
            </button>
            <div className='panel-content'>
                {children}
            </div>
        </div>
    );
};

export default SidePanel;