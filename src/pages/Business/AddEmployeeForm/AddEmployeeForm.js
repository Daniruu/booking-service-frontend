import React, { useState } from 'react';
import TextFieldCompact from '../../../components/forms/TextFieldCompact/TextFieldCompact';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateTextField } from '../../../utils/validations';
import './AddEmployeeForm.css';

const AddEmployeeForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [isValidName, setIsValidName] = useState(true);
    const [isValidRole, setIsValidRole] = useState(true);

    const validateForm = () => {
        setIsValidName(true);
        setIsValidRole(true);

        if (validateTextField(name).length > 0) {
            setIsValidName(false);
            return false;
        }

        if (validateTextField(role).length > 0) {
            setIsValidRole(false);
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employeeData = { name, role };
            onSubmit(employeeData);
        }
    };

    return (
        <form className='add-employee-form' onSubmit={handleSubmit} noValidate>
            <h3>Dodaj Pracownika</h3>
            <TextFieldCompact
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Imię pracownika'
                isValid={isValidName}
            />
            <TextFieldCompact
                type='text'
                name='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder='Stanowisko'
                isValid={isValidRole}
            />
            <div className='add-employee-form-button'>
                <PrimaryButton type='submit'>Zapisz</PrimaryButton>
            </div>
        </form>
    );
};

export default AddEmployeeForm;