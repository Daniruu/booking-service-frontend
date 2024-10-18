import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhoneNumber, validateTextField } from '../../../utils/validations';
import { Button, Card, CardContent, CardHeader, IconButton, Stack, TextField, Typography } from '@mui/material';
import { formatPhoneNumber, unformatPhoneNumber} from '../../../utils/formatPhone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterForm = ({ onSubmit }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 2;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setFormData({
                    ...formData,
                    phone: formatPhoneNumber(value)
                });
            }
            
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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
                newErrors.name = validateTextField(formData.name, 'Imię');
                newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));
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

    const handlePrevStep = (e) => {
        if (step > 1) {
            setStep(1);
            setErrors({
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                phone: ''
            })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateStep(step)) {
            const unformattedPhone = unformatPhoneNumber(formData.phone);
            
            const dataToSubmit = {
                ...formData,
                phone: unformattedPhone
            };
    
            const { confirmPassword, ...finalDataToSubmit } = dataToSubmit;
            onSubmit(finalDataToSubmit);
        }
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: 360, borderRadius: 2, p: 1, position: 'relative' }} elevation={2}>
            <CardHeader 
                title='Rejestracja' 
                sx={{ 
                    alignSelf: 'center', 
                    color: 'text.secondary', 
                    '& .MuiCardHeader-action': {
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        alignSelf: 'center'
                    } 
                }}
            />
            {step > 1 && (
                <IconButton aria-label='back' onClick={handlePrevStep} sx={{ position: 'absolute', right: 16, top: 16 }}>
                    <ArrowBackIcon />
                </IconButton>
            )}
            <CardContent component='form' onSubmit={handleSubmit} noValidate>
            {(step === 1) && (
                <Stack spacing={3}>
                    <TextField 
                        id='outlined-basic'
                        label='Email' 
                        variant='outlined' 
                        name='email'
                        value={formData.email} 
                        onChange={handleChange}
                        error={errors.email.length > 0}
                        helperText={errors.email}
                        placeholder='user@example.com'
                        fullWidth
                    />
                    <TextField 
                        type='password'
                        id='outlined-basic' 
                        label='Hasło' 
                        variant='outlined' 
                        name='password'
                        value={formData.password} 
                        onChange={handleChange}
                        error={errors.password.length > 0}
                        helperText={errors.password}
                        fullWidth
                    />
                    <TextField 
                        type='password'
                        id='outlined-basic' 
                        label='Potwierdź hasło' 
                        variant='outlined' 
                        name='confirmPassword'
                        value={formData.confirmPassword} 
                        onChange={handleChange}
                        error={errors.confirmPassword.length > 0}
                        helperText={errors.confirmPassword}
                        fullWidth
                    />
                    <Typography sx={{ alignSelf: 'center' }}>Masz już konto? <Link to='/login'>Zaloguj się</Link></Typography>
                    <Button variant='contained' type='button' onClick={handleNextStep} size='large'>Dalej</Button>
                </Stack>
            )}

            {(step === 2) && (
                <Stack spacing={3}>
                    <TextField 
                        id='outlined-basic'
                        label='Imię' 
                        variant='outlined' 
                        name='name'
                        value={formData.name} 
                        onChange={handleChange}
                        error={errors.name.length > 0}
                        helperText={errors.name}
                        fullWidth
                    />
                    <TextField 
                        id='outlined-basic'
                        label='Telefon' 
                        variant='outlined' 
                        name='phone'
                        value={formData.phone} 
                        onChange={handleChange}
                        error={errors.phone.length > 0}
                        helperText={errors.phone}
                        placeholder='+48'
                        fullWidth
                    />
                    <Typography sx={{ alignSelf: 'center' }}>Masz już konto? <Link to='/login'>Zaloguj się</Link></Typography>
                    <Button variant='contained' type='submit' size='large'>Zarejestruj się</Button>
                </Stack>
            )}
            </CardContent>

            
        </Card>
    );
};

export default RegisterForm;
