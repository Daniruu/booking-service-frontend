import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import GoogleButton from '../../../components/buttons/GoogleButton/GoogleButton';
import PageLayout from '../../../components/layout/PageLayout';
import FloatingCard from '../../../components/layout/FloatingCard';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (formData) => {
        try {
            await register(formData);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    }

    return (
        <PageLayout>
            <div className='register-page'>
                <FloatingCard>
                    <div className='register-page-content'>
                        <h2>Rejestracja</h2>
                        <RegisterForm onSubmit={handleRegisterSubmit} />
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        <p>
                            Masz już konto? <Link to='/login'>Zaloguj się</Link>
                        </p>
                        <span className='or'>Lub</span>
                        <GoogleButton>Kontynuuj z Google</GoogleButton>
                    </div>
                </FloatingCard>
            </div>
        </PageLayout>
    );
};

export default RegisterPage;