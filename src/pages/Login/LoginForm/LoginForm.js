import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { validateEmail, validatePassword } from '../../../utils/validations';

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
        <Card sx={{ display: 'flex', flexDirection: 'column', minWidth: 360, borderRadius: 2, p: 1 }} elevation={2}>
            <CardHeader title='Logowanie' sx={{ alignSelf: 'center', color: 'text.secondary' }} />
            <CardContent component='form' onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                    <TextField 
                        id='outlined-basic' 
                        label='Email' 
                        variant='outlined' 
                        value={email} 
                        onChange={(e) => (setEmail(e.target.value))}
                        error={emailMessage.length > 0}
                        helperText={emailMessage}
                        fullWidth
                    />
                    <TextField 
                        type='password'
                        id='outlined-basic' 
                        label='Hasło' 
                        variant='outlined' 
                        value={password} 
                        onChange={(e) => (setPassword(e.target.value))}
                        error={passwordMessage.length > 0}
                        helperText={passwordMessage}
                        fullWidth
                    />
                    <Typography sx={{ alignSelf: 'center' }}>Nie masz konta? <Link to='/register'>Zarejestruj się</Link></Typography>
                    <Button variant='contained' type='submit' size='large'>Zaloguj się</Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default LoginForm;