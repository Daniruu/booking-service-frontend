import React, { useState } from 'react';
import { Box, Button, Container, Divider, Stack, Toolbar, Typography } from '@mui/material';
import BookingList from '../BookingList/BookingList';
import UserSidebarNavigation from '../UserSidebarNavigation/UserSidebarNavigation';
import UserCard from '../../UserCard/UserCard';
import UserDataForm from '../UserDataForm/UserDataForm';
import UserDataCard from '../UserDataCard/UserDataCard';
import FavoritesList from '../FavoritesList/FavoritesList';
import ReviewList from '../../../Business/ReviewList/ReviewList';
import UserReviewList from '../UserReviewList/UserReviewList';

const UserProfile = () => {
    const [selectedSection, setSelectedSection] = useState('bookings');

    const renderContent = () => {
        switch (selectedSection) {
            case 'settings':
                return (
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Typography variant='h5' fontWeight={600}>Ustawienia konta</Typography>
                        <UserDataCard />
                        <UserDataForm />
                    </Stack>
                );
            case 'bookings':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Wizyty</Typography>
                        <BookingList />
                    </Stack>
                );
            case 'favourite':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Ulubione</Typography>
                        <FavoritesList />
                    </Stack>
                );
            case 'reviews':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Opinie</Typography>
                        <UserReviewList />
                    </Stack>
                );
            default:
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Wizyty</Typography>
                        <BookingList />
                    </Stack>
                );
        }
    };

    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3 }}>
                {/* Sidebar */}    
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 250, height: '100%', mr: 10 }}>
                    <UserCard />
                    <UserSidebarNavigation selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                </Box>

                {/* Main content */}
                <Box component='main' sx={{ pt: 2, width: '100%' }}>
                    {renderContent()}
                </Box>
            </Box>
        </Container>
    );
}

export default UserProfile;