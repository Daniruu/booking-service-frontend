import React from 'react';
import WideContainer from '../../../components/layout/WideContainer/WideContainer';
import { Box } from '@mui/material';
import AddBusinessForm from '../AddBusinessForm/AddBusinessForm';
import { useBusiness, useBusinessAccount } from '../../../context/BusinessAccountContext';
import { useNavigate } from 'react-router-dom';

const AddBusinessPage = () => {
    const { registerBusiness } = useBusinessAccount();
    const navigate = useNavigate();

    const handleRegisterBusiness = async (formData) => {
        await registerBusiness(formData);
        navigate('/account/user');
    };

    return (
        <WideContainer sx={{ height: 'calc(100vh - 64px)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <AddBusinessForm onSubmit={handleRegisterBusiness}/>
            </Box>
        </WideContainer>
    );
}

export default AddBusinessPage;