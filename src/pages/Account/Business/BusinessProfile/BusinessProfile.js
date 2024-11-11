import React, { useEffect, useState } from 'react';
import { useBusinessAccount } from '../../../../context/BusinessAccountContext';
import { Box, Container, Stack, Toolbar, Typography } from '@mui/material';
import UserCard from '../../UserCard/UserCard';
import BusinessSidebarNavigation from '../BusinessSidebarNavigation/BusinessSidebarNavigation';
import BusinessDetailsCard from '../BusinessDetailsCard/BusinessDetailsCard';
import WorkingHoursCard from '../WorkingHoursCard/WorkingHoursCard';
import BusinessGalleryCard from '../BusinessGalleryCard/BusinessGalleryCard';
import EmployeeCard from '../EmployeesCard/EmployeesCard';
import ServicesCard from '../ServicesCard/ServicesCard';

const BusinessProfile = () => {
    const { business, fetchBusiness } = useBusinessAccount();
    const [selectedSection, setSelectedSection] = useState('businessInfo');

    useEffect(() => {
        fetchBusiness();
    }, []);

    const renderContent = () => {
        switch (selectedSection) {
            case 'businessInfo':
                return (
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Typography variant='h5' fontWeight={600}>Informacje o firmie</Typography>
                        <BusinessDetailsCard />
                        <WorkingHoursCard />
                        <BusinessGalleryCard />
                    </Stack>
                );
            case 'employees':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Pracownicy</Typography>
                        <EmployeeCard />
                    </Stack>
                );
            case 'services':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Usługi</Typography>
                        <ServicesCard />
                    </Stack>
                );
            case 'calendar':
                return (
                    <Stack spacing={2} sx={{ flex: 1}}>
                        <Typography variant='h5' fontWeight={600}>Kalendarz</Typography>
                        **TO DO**
                    </Stack>
                );
            default:
                return (
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Typography variant='h5' fontWeight={600}>Informacje o firmie</Typography>
                        <BusinessDetailsCard />
                        <WorkingHoursCard />
                        <BusinessGalleryCard />
                    </Stack>
                );
        }
    };
    
    if (!business) {
        return (
            <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            </Container>
        );
    };

    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <Box sx={{ display: 'flex', flex: 1, p: 3 }}>
                {/* Sidebar */}    
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 250, height: '100%', mr: 10 }}>
                    <UserCard />
                    <BusinessSidebarNavigation selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                </Box>

                {/* Main content */}
                <Box component='main' sx={{ pt: 2, width: '100%' }}>
                    {renderContent()}
                </Box>
            </Box>
        </Container>
    );
}

export default BusinessProfile;