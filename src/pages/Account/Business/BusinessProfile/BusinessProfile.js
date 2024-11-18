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
import BookingCalendar from '../BookingCalendar/BookingCalendar';
import { useEmployee } from '../../../../context/EmployeeContext';

const BusinessProfile = () => {
    const { business, fetchBusiness } = useBusinessAccount();
    const { fetchBusinessEmployees } = useEmployee();
    const [selectedSection, setSelectedSection] = useState('businessInfo');

    useEffect(() => {
        fetchBusiness();
    }, []);

    useEffect(() => {
        if (business) {
            fetchBusinessEmployees();
        }
    }, [business]);

    const renderContent = () => {
        switch (selectedSection) {
            case 'businessInfo':
                return (
                    <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
                        <BusinessDetailsCard />
                        <WorkingHoursCard />
                        <BusinessGalleryCard />
                    </Stack>
                );
            case 'employees':
                return (
                    <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
                        <EmployeeCard />
                    </Stack>
                );
            case 'services':
                return (
                    <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
                        <ServicesCard />
                    </Stack>
                );
            case 'calendar':
                return (
                    <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
                        <BookingCalendar />
                    </Stack>
                );
            default:
                return (
                    <Stack spacing={2} sx={{ flex: 1, width: '100%' }}>
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
            <Box sx={{ display: 'flex', flex: 1, p: 3, width: '100%' }}>
                {/* Sidebar */}    
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 250, height: '100%', mr: 5 }}>
                    <UserCard />
                    <BusinessSidebarNavigation selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                </Box>

                {/* Main content */}
                <Box component='main' sx={{ p: 1, width: '100%', overflowX: 'auto' }}>
                    {renderContent()}
                </Box>
            </Box>
        </Container>
    );
}

export default BusinessProfile;