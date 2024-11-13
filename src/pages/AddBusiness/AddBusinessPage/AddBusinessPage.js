import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import AddBusinessForm from '../AddBusinessForm/AddBusinessForm';
import { useBusinessAccount } from '../../../context/BusinessAccountContext';
import { useNavigate } from 'react-router-dom';

const AddBusinessPage = () => {
    const { registerBusiness } = useBusinessAccount();
    const navigate = useNavigate();

    const handleRegisterBusiness = async (formData) => {
        await registerBusiness(formData);
        navigate('/account/user');
    };

    return (
        <Container sx={{ height: '100vh' }}>
            <Toolbar />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 64px)' }}>
                <AddBusinessForm onSubmit={handleRegisterBusiness}/>
            </Box>
        </Container>
    );
}

export default AddBusinessPage;