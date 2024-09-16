import React, { useState } from 'react';
import { TextField } from '../../../components/forms';
import { validateTextField, validateEmail, validatePhoneNumber, validateAddress } from '../../../utils/validations';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import './BusinessDataForm.css';

// Возвращает основные данные бизнеса с возсожностью редактировать их
const BusinessDataForm = ({ business, onSubmit }) => {
    const [formData, setFormData] = useState({
        category: business.category,
        name: business.name,
        email: business.email,
        phoneNumber: business.phoneNumber,
        nip: business.nip,
        regon: business.regon,
        krs: business.krs,
        address: {
            region: business.address.region,
            city: business.address.city,
            street: business.address.street,
            buildingNumber: business.address.buildingNumber,
            roomNumber: business.address.roomNumber,
            postalCode: business.address.postalCode
        },
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        nip: '',
        regon: '',
        krs: '',
        address: {
            region: '',
            city: '',
            street: '',
            buildingNumber: '',
            roomNumber: '',
            postalCode: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in formData.address) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        let newErrors = { ...errors };

        newErrors.name = validateTextField(formData.name);
        newErrors.email = validateEmail(formData.email);
        newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
        newErrors.nip = validateTextField(formData.nip);
        newErrors.regon = validateTextField(formData.regon);

        const addressErrors = validateAddress(formData.address, ['region', 'city', 'street', 'buildingNumber', 'postalCode']);
        newErrors.address = { ...addressErrors };

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(error =>
            typeof error === 'string' ? error : Object.values(error).some(e => e)
        );

        return !hasErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form className='business-data-form' onSubmit={handleSubmit}>
            <h3>Dane podstawowe</h3>
            <div className='business-data-grid'>
                <TextField 
                    type='text'
                    name='name'
                    label={'Imię pracownika'}
                    value={formData.name}
                    onChange={handleChange}
                    errorMessage={errors.name}
                />
                <TextField 
                    type='text'
                    name='email'
                    label={'Email'}
                    value={formData.email}
                    onChange={handleChange}
                    errorMessage={errors.email}
                />
                <TextField 
                    type='text'
                    name='phoneNumber'
                    label={'Numer telefonu'}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    errorMessage={errors.phoneNumber}
                />
                <TextField 
                    type='text'
                    name='nip'
                    label={'NIP'}
                    value={formData.nip}
                    onChange={handleChange}
                    errorMessage={errors.nip}
                />
                <TextField 
                    type='text'
                    name='regon'
                    label={'Regon'}
                    value={formData.regon}
                    onChange={handleChange}
                    errorMessage={errors.regon}
                />
                <TextField 
                    type='text'
                    name='krs'
                    label={'KRS (Opcjonalnie)'}
                    value={formData.krs}
                    onChange={handleChange}
                    errorMessage={errors.krs}
                />
            </div>
            <h3>Dane adresowe</h3>
            <div className='business-data-grid'>
                <TextField 
                    type='text'
                    name='region'
                    label={'Województwo'}
                    value={formData.address.region}
                    onChange={handleChange}
                    errorMessage={errors.address.region}
                    className='full-width'
                />
                <TextField 
                    type='text'
                    name='city'
                    label={'Miasto'}
                    value={formData.address.city}
                    onChange={handleChange}
                    errorMessage={errors.address.city}
                    className='full-width'
                />
                <TextField 
                    type='text'
                    name='street'
                    label={'Ulica'}
                    value={formData.address.street}
                    onChange={handleChange}
                    errorMessage={errors.address.street}
                />
                <TextField 
                    type='text'
                    name='buildingNumber'
                    label={'Numer domu'}
                    value={formData.address.buildingNumber}
                    onChange={handleChange}
                    errorMessage={errors.address.buildingNumber}
                />
                <TextField 
                    type='text'
                    name='postalCode'
                    label={'Kod pocztowy'}
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    errorMessage={errors.address.postalCode}
                />
                <TextField 
                    type='text'
                    name='roomNumber'
                    label={'Numer lokalu (Opcjonalnie)'}
                    value={formData.address.roomNumber}
                    onChange={handleChange}
                    errorMessage={errors.address.roomNumber}
                />
            </div>
            <div className='business-data-form-button'>
                <PrimaryButton type='submit'>Zapisz</PrimaryButton>
            </div>
        </form>
    );
}

export default BusinessDataForm;