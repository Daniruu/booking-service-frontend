import React from 'react';
import { MdAdd } from "react-icons/md";
import './AddEmployeeButton.css';

const AddEmployeeButton = ({ onClick }) => {
    return (
        <button className='add-employee-button' onClick={onClick}>
            <MdAdd />
            Dodaj pracownika
        </button>
    );
}

export default AddEmployeeButton;