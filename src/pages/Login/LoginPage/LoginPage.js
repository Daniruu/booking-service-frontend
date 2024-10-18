import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';
import { Box, Container } from '@mui/material';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = () => {
    const { login } = useAuth();
    const { fetchUserData } = useUser();
    const navigate = useNavigate();
    
    const handleLogin = async (loginDto) => {
        const isLoggedIn = await login(loginDto);
        if (isLoggedIn) {
            await fetchUserData();
            navigate('/');
        }
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <LoginForm onSubmit={handleLogin} />
            </Box>
        </Container>
    );
};

export default LoginPage;