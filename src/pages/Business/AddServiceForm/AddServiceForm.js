import React, { useState } from 'react';
import { TextFieldCompact, Dropdown } from '../../../components/forms';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateTextField } from '../../../utils/validations';
import './AddServiceForm.css';

const AddServiceForm = ({ onSubmit, employees }) => {
    const [serviceData, setServiceData] = useState({
        name: '',
        employeeId: '',
        description: '',
        price: '',
        duration: '',
        group: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        employeeId: '',
        description: '',
        price: '',
        duration: '',
        group: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({
            ...serviceData,
            [name]: value
        });
    };

    const validateForm = () => {
        let newErrors = { ...errors };

        newErrors.name = validateTextField(serviceData.name);
        newErrors.employeeId = validateTextField(serviceData.employeeId);
        newErrors.price = validateTextField(serviceData.price);
        newErrors.duration = validateTextField(serviceData.duration);
        newErrors.description = validateTextField(serviceData.description);

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(serviceData);
        }
    };

    return (
        <form className='add-service-form' onSubmit={handleSubmit} noValidate>
            <h3>Dodaj Usługę</h3>
            <TextFieldCompact
                type='text'
                name='name'
                value={serviceData.name}
                onChange={handleChange}
                placeholder='Nazwa usługi'
                isValid={errors.name === ''}
            />
            <TextFieldCompact
                type='text'
                name='group'
                value={serviceData.group}
                onChange={handleChange}
                placeholder='Grupa (opcjonalnie)'
            />
            <div className='dropdown'>
                <select 
                    name='employeeId'
                    id='employeeId'
                    onChange={handleChange}
                    value={serviceData.employeeId} 
                >
                    <option value='' disabled>
                        - Wybierz pracownika -
                    </option>
                    {employees.map((employee, index) => (
                        <option key={index} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
            </div>
            <TextFieldCompact
                type='number'
                name='price'
                value={serviceData.price}
                onChange={handleChange}
                placeholder='Cena'
                isValid={errors.price === ''}
            />
            <TextFieldCompact
                type='number'
                name='duration'
                value={serviceData.duration}
                onChange={handleChange}
                placeholder='Czas trwania'
                isValid={errors.duration === ''}
            />
            <TextFieldCompact
                type='text'
                name='description'
                value={serviceData.description}
                onChange={handleChange}
                placeholder='Opis'
                isValid={errors.description === ''}
            />
            <div className='add-service-form-button'>
                <PrimaryButton type='submit'>Zapisz</PrimaryButton>
            </div>
        </form>
    );
};

export default AddServiceForm;