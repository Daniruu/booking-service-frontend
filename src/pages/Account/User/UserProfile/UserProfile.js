import React, { useState } from 'react';
import { Box, Stack, Toolbar } from '@mui/material';
import UserDetails from '../UserDetails/UserDetails';
import WideContainer from '../../../../components/layout/WideContainer/WideContainer';
import BookingList from '../BookingList/BookingList';

const UserProfile = () => {
    const [selectedSection, setSelectedSection] = useState('bookings');

    return (
        <WideContainer >
            <Toolbar />
            <Box sx={{ display: 'flex', mb: 8 }}>
                <Box direction='column' sx={{ display: 'flex', flexDirection: 'column', width: 350, bgcolor: 'tansparend', p: 3, height: 'calc(100vh - 64px)', position: 'sticky', top: 64 }} spacing={2}>
                    <UserDetails />
                </Box>
                
                <Box component='main' sx={{ flexGrow: 1, p: 4, maxWidth: 900, mx: 'auto' }}>
                    <Stack spacing={2}>
                        {selectedSection === 'bookings' && <BookingList />}
                    </Stack>
                </Box>
            </Box>
        </WideContainer>
    );
}

export default UserProfile;