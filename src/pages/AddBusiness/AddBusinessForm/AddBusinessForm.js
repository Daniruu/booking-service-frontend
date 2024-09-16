import React from 'react';
import { useState } from 'react';
import { TextField, Dropdown } from '../../../components/forms';
import { ProgressSidebar } from '../../../components/forms';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../../components/buttons/SecondaryButton/SecondaryButton';
import { validateEmail, validatePhoneNumber, validateTextField, validateNIP, validateRegon, validateKrs, validateAddress } from '../../../utils/validations';
import categories from '../../../data/BusinessCategories.json';
import './AddBusinessForm.css';

const AddBusinessForm = ({ onSubmitSuccess }) => {
    const [step, setStep] = useState(1);
    const steps = ['Podstawowe informacje', 'Dane rejestracyjne', 'Dane adresowe'];

    const [businessData, setBusinessData] = useState({
        name: '',
        category: '',
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

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        email: '',
        phoneNumber: '',
        nip: '',
        regon: '',
        krs: '',
        address: {
            region: '',
            street: '',
            buildingNumber: '',
            roomNumber: '',
            postalCode: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in businessData.address) {
            setBusinessData({
                ...businessData,
                address: {
                    ...businessData.address,
                    [name]: value
                }
            });
        } else {
            setBusinessData({
                ...businessData,
                [name]: value
            });
        }
    };

    const handleNextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setErrors({
                name: '',
                category: '',
                email: '',
                phoneNumber: '',
                nip: '',
                regon: '',
                krs: '',
                address: {
                    region: '',
                    street: '',
                    buildingNumber: '',
                    roomNumber: '',
                    postalCode: ''
                }
            });
            setStep(step - 1);
        }
    };

    const validateStep = (step) => {
        let newErrors = { ...errors };

        switch (step) {
            case 1:
                newErrors.name = validateTextField(businessData.name);
                newErrors.email = validateEmail(businessData.email);
                newErrors.phoneNumber = validatePhoneNumber(businessData.phoneNumber);
                newErrors.category = validateTextField(businessData.category);
                break;
            case 2:
                newErrors.nip = validateNIP(businessData.nip);
                newErrors.regon = validateRegon(businessData.regon);
                newErrors.krs = validateKrs(businessData.krs);
                break;
            case 3:
                const addressErrors = validateAddress(businessData.address, ['region', 'city', 'street', 'buildingNumber', 'postalCode']);
                newErrors.address = { ...addressErrors };
                break;
            default:
                break;
        }

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(error =>
            typeof error === 'string' ? error : Object.values(error).some(e => e)
        );
        
        return !hasErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep(step)) {
            return;
        }

        onSubmitSuccess(businessData);
    }

    return (
        <div className='add-business-form'>
            <ProgressSidebar currentStep={step} steps={steps} />
            <form className='add-business-form-content' onSubmit={handleSubmit}>
                <h2>{steps[step-1]}</h2>
                {step === 1 && (
                    <>
                        <p>Wprowadź dane swojej firmy</p>
                        <TextField
                            type='text'
                            label='Nazwa'
                            name='name'
                            value={businessData.name}
                            onChange={handleChange}
                            errorMessage={errors.name}
                        />
                        <TextField
                            type='email'
                            label='Email'
                            name='email'
                            value={businessData.email}
                            onChange={handleChange}
                            errorMessage={errors.email}
                        />
                        <TextField
                            type='phone'
                            label='Numer Telefonu'
                            name='phoneNumber'
                            value={businessData.phoneNumber}
                            onChange={handleChange}
                            errorMessage={errors.phoneNumber}
                        />
                        <Dropdown
                            label='Wybierz kategorie'
                            name='category'
                            value={businessData.category}
                            onChange={handleChange}
                            options={categories}
                            errorMessage={errors.category}
                        />
                    </>
                )}
                {step === 2 && (
                    <>
                        <p>Wprowadź dane rejestracyjne firmy</p>
                        <TextField
                            type='text'
                            label='NIP'
                            name='nip'
                            value={businessData.nip}
                            onChange={handleChange}
                            errorMessage={errors.nip}
                        />
                        <TextField
                            type='text'
                            label='Regon'
                            name='regon'
                            value={businessData.regon}
                            onChange={handleChange}
                            errorMessage={errors.regon}
                        />
                        <TextField
                            type='text'
                            label='KRS'
                            name='krs'
                            value={businessData.krs}
                            onChange={handleChange}
                            errorMessage={errors.krs}
                        />
                    </>
                )}
                {step === 3 && (
                    <>
                        <p>Wprowadź adres firmy</p>
                        <TextField
                            type='text'
                            label='Województwo'
                            name='region'
                            value={businessData.address.region}
                            onChange={handleChange}
                            errorMessage={errors.address.region}
                        />
                        <TextField
                            type='text'
                            label='Miasto'
                            name='city'
                            value={businessData.address.city}
                            onChange={handleChange}
                            errorMessage={errors.address.city}
                        />
                        <TextField
                            type='text'
                            label='Ulica'
                            name='street'
                            value={businessData.address.street}
                            onChange={handleChange}
                            errorMessage={errors.address.street}
                        />
                        <div className='wrapper'>
                            <TextField
                                type='text'
                                label='Numer Domu'
                                name='buildingNumber'
                                value={businessData.address.buildingNumber}
                                onChange={handleChange}
                                errorMessage={errors.address.buildingNumber}
                            />
                            <TextField
                                type='text'
                                label='Numer Lokalu'
                                name='roomNumber'
                                value={businessData.address.roomNumber}
                                onChange={handleChange}
                                errorMessage={errors.address.roomNumber}
                            />
                        </div>
                        <TextField
                            type='text'
                            label='Kod Pocztowy'
                            name='postalCode'
                            value={businessData.address.postalCode}
                            onChange={handleChange}
                            errorMessage={errors.address.postalCode}
                        />
                    </>
                )}
                <div className={`form-buttons ${step === 1 ? 'single-button' : ''}`}>
                    {step > 1 && <SecondaryButton onClick={handlePreviousStep}>Powrót</SecondaryButton>}
                    {step !== steps.length && <PrimaryButton onClick={handleNextStep}>Dalej</PrimaryButton>}
                    {step === steps.length && <PrimaryButton type='submit'>Zapisz</PrimaryButton>}
                </div>
            </form>
        </div>
    );
}

export default AddBusinessForm;