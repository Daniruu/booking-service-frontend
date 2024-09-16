import React, { useState } from 'react';
import { TextField } from '../../../components/forms';
import PrimaryButton from '../../../components/buttons/PrimaryButton/PrimaryButton';
import { validateEmail, validatePassword } from '../../../utils/validations';
import './LoginForm.css';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessge] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setEmailMessge(emailError);
        setPasswordMessage(passwordError);

        if (!emailError && !passwordError) {
            const credentials = {
                email: email,
                password: password
            };

            onSubmit(credentials);
        }  
    }

    return (
        <form className='form' onSubmit={handleSubmit} noValidate>
            <TextField
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                errorMessage={emailMessage}
                className='large'
            />
            <TextField
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Hasło'
                className='large'
                errorMessage={passwordMessage}
            />
            <div className='login-form-buttons'>
                <PrimaryButton type='submit' className='large'>Zaloguj się</PrimaryButton>
            </div>
        </form>
    );
};

export default LoginForm;