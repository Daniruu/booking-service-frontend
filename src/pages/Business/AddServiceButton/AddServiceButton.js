import React from 'react';
import { MdAdd } from "react-icons/md";
import './AddServiceButton.css';

const AddServiceButton = ({ onClick }) => {
    return (
        <button className='add-service-button' onClick={onClick}>
            <MdAdd />
            Dodaj usługę
        </button>
    );
}

export default AddServiceButton;