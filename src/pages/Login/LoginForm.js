import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TextField } from '../../components/forms';
import PrimaryButton from '../../components/buttons/PrimaryButton/PrimaryButton';
import GoogleButton from '../../components/buttons/GoogleButton/GoogleButton';
import './LoginForm.css';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessge] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailMessge('');
        setPasswordMessage('');

        if (!checkRequiredFields()) {
            return;
        }

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            //обработка ошибки
        }
    }

    const checkRequiredFields = () => {
        setEmail(email.trim());
        setPassword(password.trim());

        if (!validateEmail()) {
            return false;
        }

        if (!validatePassword()) {
            return false;
        }
        
        return true;
    }

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setEmailMessge('Pole jest wymagane');
            return false;
        }

        if (!regex.test(email)) {
            setEmailMessge('Nie prawidłowy Email');
            return false;
        }

        return true;
    }

    const validatePassword = () => {
        const isNotEmpty = password.length > 0;
        const hasNoSpaces = !/\s/.test(password);

        if (!isNotEmpty) {
            setPasswordMessage('Pole jest wymagane');
            return false;
        }

        if (!hasNoSpaces) {
            setPasswordMessage('hasło nie może zawierać spacji');
            return false;
        }

        return true;
    }

    return (
        <div className='login-form'>
            <h2>Logowanie</h2>
            <form className='form' onSubmit={handleLogin} noValidate>
                <TextField
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    errorMessage={emailMessage}
                />
                <TextField
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Hasło'
                    errorMessage={passwordMessage}
                />
                <a href='/login'>Nie pamiętasz hasła?</a>
                <PrimaryButton type='submit'>Zaloguj się</PrimaryButton>
            </form>

            <span style={{ fontSize: '14px'}}>Nie masz konta? <a href='/register'>Zarejestruj się</a> </span>

            <span className='or'>Lub</span>

            <GoogleButton>Kontynuuj z Google</GoogleButton>
        </div>
    );
};

export default LoginForm;