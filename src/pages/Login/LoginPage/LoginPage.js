import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';
import { useNotification } from '../../../context/NotificationContext';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';
import WideContainer from '../../../components/layout/WideContainer/WideContainer';
import { Box, Container, Toolbar } from '@mui/material';

const LoginPage = () => {
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const { fetchUserData } = useUser();
    const navigate = useNavigate();
    
    const handleLoginSubmit = async (credentials) => {
        try {
            await login(credentials);
            await fetchUserData();
            navigate('/');
        } catch (error) {
            console.error(error);
            showNotification('Bąd przy logowaniu', error.message, 'error');
        }
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <LoginForm onSubmit={handleLoginSubmit} />
            </Box>
        </Container>
    );
};

export default LoginPage;