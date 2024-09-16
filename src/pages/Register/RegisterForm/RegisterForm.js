import React, { useState } from 'react';
import { TextField } from '../../../components/forms';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateEmail, validatePassword, validatePhoneNumber, validateTextField } from '../../../utils/validations';
import './RegisterForm.css';

const RegisterForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 2;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        secondName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        secondName: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateStep = (step) => {
        let newErrors = { ...errors };

        switch (step) {
            case 1: 
                newErrors.email = validateEmail(formData.email);
                newErrors.password = validatePassword(formData.password);
                newErrors.confirmPassword = formData.password === formData.confirmPassword ? '' : 'Hasła muszą się zgadzać';
                break;
            case 2:
                newErrors.firstName = validateTextField(formData.firstName, 'Imię');
                newErrors.secondName = validateTextField(formData.secondName, 'Nazwisko');
                newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
                break;
            default:
                break;
        }   

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleNextStep = (e) => {
        e.preventDefault();

        if (validateStep(step) && step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(step)) {
            const { confirmPassword, ...dataToSubmit } = formData;
            onSubmit(dataToSubmit);
        }
    }

    return (
        <div className='register-form'>
                {(step === 1) && (
                    <form className='form' onSubmit={handleNextStep} noValidate>
                        <TextField
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className='large'
                            errorMessage={errors.email}
                        />
                        <TextField
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Hasło'
                            className='large'
                            errorMessage={errors.password}  
                        />
                        <TextField
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Powtórz hasło'
                            className='large'
                            errorMessage={errors.confirmPassword}
                        />
                        <div className='register-form-buttons'>
                            <PrimaryButton type='submit' className='large'>Dalej</PrimaryButton>
                        </div>    
                    </form>
                )}

                {(step === 2) && (
                    <form className='form' onSubmit={handleSubmit} noValidate>
                        <TextField
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='Imię'
                            errorMessage={errors.firstName}
                            className='large'
                        />
                        <TextField
                            type='text'
                            name='secondName'
                            value={formData.secondName}
                            onChange={handleChange}
                            placeholder='Nazwisko'
                            errorMessage={errors.secondName}
                            className='large'
                        />
                        <TextField
                            type='phone'
                            name='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder='Telefon'
                            errorMessage={errors.phoneNumber}
                            className='large'
                        />
                        <div className='register-form-buttons'>
                            <PrimaryButton type='submit' className='large'>Zarejestruj się</PrimaryButton>
                        </div>
                    </form>
                )}
        </div>
    );
};

export default RegisterForm;