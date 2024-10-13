import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useNotification } from '../../../context/NotificationContext';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';
import WideContainer from '../../../components/layout/WideContainer/WideContainer';
import { Box } from '@mui/material';

const RegisterPage = () => {
    const { register } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const handleRegisterSubmit = async (formData) => {
        try {
            await register(formData);
            navigate('/login');
            
        } catch (error) {
            console.error(error);
            showNotification('Bąd przy rejestracji', error.message, 'error');
        }
    }

    return (
        <WideContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <RegisterForm onSubmit={handleRegisterSubmit} />
            </Box>
        </WideContainer>
    );
};

export default RegisterPage;