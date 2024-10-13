import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { validateEmail, validatePassword } from '../../../utils/validations';
import './LoginForm.css';
import { Button } from '@mui/material';

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
        <div className='login-form-container'>
            <h2>Logowanie</h2>
            <form className='login-form' onSubmit={handleSubmit} noValidate>
            <TextField 
                fullWidth
                id='outlined-basic' 
                label='Email' 
                variant='outlined' 
                value={email} 
                onChange={(e) => (setEmail(e.target.value))}
                error={emailMessage.length > 0}
                helperText={emailMessage}
            />
            <TextField 
                fullWidth
                type='password'
                id='outlined-basic' 
                label='Hasło' 
                variant='outlined' 
                value={password} 
                onChange={(e) => (setPassword(e.target.value))}
                error={passwordMessage.length > 0}
                helperText={passwordMessage}
            />
            <p>Nie masz konta? <Link to='/register'>Zarejestruj się</Link></p>
            <Button variant='contained' type='submit' size='large'>Zaloguj się</Button>
        </form>
    </div>
    );
};

export default LoginForm;