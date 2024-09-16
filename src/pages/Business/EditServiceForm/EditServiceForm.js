import React, { useState, useEffect } from 'react';
import TextFieldCompact from '../../../components/forms/TextFieldCompact/TextFieldCompact';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateTextField } from '../../../utils/validations';
import './EditServiceForm.css';

const EditServiceForm = ({ service, employees, onSubmit }) => {
    const [serviceData, setServiceData] = useState({
        name: service.name,
        employeeId: service.employeeId,
        description: service.description,
        price: service.price,
        duration: service.duration,
        group: service.group
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

    useEffect(() => {
        setServiceData({
            name: service.name,
            employeeId: service.employeeId,
            description: service.description,
            price: service.price,
            duration: service.duration,
            group: service.group
        });
    }, [service]);

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
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(service.id, serviceData);
        }
    };

    return (
        <form className='edit-employee-form' onSubmit={handleSubmit} noValidate>
            <h3>Usługa</h3>
            <TextFieldCompact
                type='text'
                name='name'
                value={serviceData.name}
                onChange={handleChange}
                placeholder={serviceData.name}
                isValid={errors.name === ''}
            />
            <TextFieldCompact
                type='text'
                name='group'
                value={serviceData.group}
                onChange={handleChange}
                placeholder={serviceData.group}
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
                placeholder={serviceData.price}
                isValid={errors.price === ''}
            />
            <TextFieldCompact
                type='number'
                name='duration'
                value={serviceData.duration}
                onChange={handleChange}
                placeholder={serviceData.duration}
                isValid={errors.duration === ''}
            />
            <TextFieldCompact
                type='text'
                name='description'
                value={serviceData.description}
                onChange={handleChange}
                placeholder={serviceData.description}
                isValid={errors.description === ''}
            />
            <div className='edit-service-form-button'>
                <PrimaryButton type='submit'>Zapisz</PrimaryButton>
            </div>
        </form>
    );
};

export default EditServiceForm;