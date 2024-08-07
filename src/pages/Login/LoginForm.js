import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TextField } from '../../components/forms';
import PrimaryButton from '../../components/buttons/PrimaryButton/PrimaryButton';
import GoogleButton from '../../components/buttons/GoogleButton/GoogleButton';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='login-form'>
            <h2>Logowanie</h2>
            <form className='form' onSubmit={handleLogin}>
                <TextField
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <TextField
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Hasło'
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