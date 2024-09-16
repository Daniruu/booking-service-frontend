import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import GoogleButton from '../../../components/buttons/GoogleButton/GoogleButton';
import PageLayout from '../../../components/layout/PageLayout';
import FloatingCard from '../../../components/layout/FloatingCard';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleLoginSubmit = async (credentials) => {
        try {
            await login(credentials.email, credentials.password);
            navigate('/');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    return (
        <PageLayout>
            <div className='login-page'>
                <FloatingCard>
                    <div className='login-page-content'>
                        <h2>Logowanie</h2>
                        <LoginForm onSubmit={handleLoginSubmit} />
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        <p>
                            Nie masz konta? <Link to='/register'>Zarejestruj się</Link>
                        </p>
                        <span className='or'>Lub</span>
                        <GoogleButton>Kontynuuj z Google</GoogleButton>
                    </div>
                </FloatingCard>
            </div>
        </PageLayout>
    );
};

export default LoginPage;