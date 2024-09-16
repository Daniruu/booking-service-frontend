import React, { useState, useEffect } from 'react';
import TextFieldCompact from '../../../components/forms/TextFieldCompact/TextFieldCompact';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateTextField } from '../../../utils/validations';
import './EditEmployeeForm.css';

const EditEmployeeForm = ({ employee, onSubmit }) => {
    const [name, setName] = useState(employee.name);
    const [role, setRole] = useState(employee.role);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidRole, setIsValidRole] = useState(true);

    useEffect(() => {
        setName(employee.name);
        setRole(employee.role);
    }, [employee]);

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
            onSubmit(employee.id, employeeData);
        }
    };

    return (
        <form className='edit-employee-form' onSubmit={handleSubmit} noValidate>
            <h3>Dane Pracownika</h3>
            <TextFieldCompact
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={name}
                isValid={isValidName}
            />
            <TextFieldCompact
                type='text'
                name='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={role}
                isValid={isValidRole}
            />
            <div className='edit-employee-form-button'>
                <PrimaryButton type='submit'>Zapisz</PrimaryButton>
            </div>
        </form>
    );
};

export default EditEmployeeForm;