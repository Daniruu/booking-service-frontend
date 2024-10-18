import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Box, Container } from '@mui/material';
import RegisterForm from '../RegisterForm/RegisterForm';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (registerDto) => {
        const isRegistered = await register(registerDto);
        if (isRegistered) {
            navigate('/login');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <RegisterForm onSubmit={handleRegister} />
            </Box>
        </Container>
    );
};

export default RegisterPage;