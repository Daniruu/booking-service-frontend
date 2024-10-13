import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';
import { useBusiness } from '../../../../context/BusinessContext';
import { Avatar, Box, Card, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import WideContainer from '../../../../components/layout/WideContainer/WideContainer';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupIcon from '@mui/icons-material/Group';
import RoomServiceIcon from '@mui/icons-material/RoomServiceOutlined';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import EmployeesSection from '../EmployeesSection/EmployeesSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import { useAuth } from '../../../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

const BusinessProfile = () => {
    const { logout } = useAuth();
    const { user, setUser } = useUser();
    const { business, fetchBusiness } = useBusiness();
    const [selectedSection, setSelectedSection] = useState('info');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBusiness();
    }, []);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const handleLogout = () => {
        setUser(null);
        logout();
    };
    
    if (!business) return <Typography>Loading...</Typography>;

    return (
        <WideContainer>
            <Toolbar />
            <Box sx={{ display: 'flex', mb: 8 }}>
                <Stack direction='column' sx={{ width: 350, bgcolor: 'tansparend', p: 3, height: 'calc(100vh - 64px)', position: 'sticky', top: 64 }} spacing={2}>
                    <Card 
                        onClick={() => navigate('/account/user')}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            backgroundColor: 'transparent', 
                            padding: 2,
                            width: '100%',
                            marginBottom: 2,
                            transition: 'box-shadow 0.3s',
                            '&:hover': {
                                boxShadow: 2,
                            },
                            cursor: 'pointer'
                        }} 
                        elevation={0}
                    >
                        <Avatar 
                            src={user.avatarUrl}
                            alt={user.name}
                            sx={{ width: 56, height: 56, marginRight: 2 }}
                        />
                        <Stack>
                            <Typography variant='body1' gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color='text.secondary'>
                                {user.email}
                            </Typography>
                        </Stack>
                    </Card>

                    <List sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <ListItem button onClick={() => handleSectionChange('info')} sx={{ cursor: 'pointer', borderRadius: 1 }}>
                            <InfoOutlinedIcon sx={{ color: selectedSection === 'info' ? '#3F72AF' : '#112D4E', mr: 2 }} />
                            <ListItemText primary='Informacje o firmie' />
                        </ListItem>

                        <ListItem button onClick={() => handleSectionChange('employees')} sx={{ cursor: 'pointer', borderRadius: 1 }}>
                            <GroupIcon sx={{ color: selectedSection === 'employees' ? '#3F72AF' : '#112D4E', mr: 2 }} />
                            <ListItemText primary='Pracownicy' />
                        </ListItem>

                        <ListItem button onClick={() => handleSectionChange('services')} sx={{ cursor: 'pointer', borderRadius: 1 }}>
                            <RoomServiceIcon sx={{ color: selectedSection === 'services' ? '#3F72AF' : '#112D4E', mr: 2 }} />
                            <ListItemText primary='Usługi' />
                        </ListItem>

                        <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer', borderRadius: 1, mt: 'auto' }}>
                            <LogoutIcon sx={{ color: selectedSection === 'services' ? '#3F72AF' : '#112D4E', mr: 2 }} />
                            <ListItemText primary='Wyloguj się' />
                        </ListItem>
                    </List>
                </Stack>
                
                <Box component='main' sx={{ flexGrow: 1, p: 4, maxWidth: 900, mx: 'auto' }}>
                    {selectedSection === 'info' && <BusinessInfo />}
                    {selectedSection === 'employees' && <EmployeesSection />}
                    {selectedSection === 'services' && <ServicesSection />}
                </Box>
            </Box>
        </WideContainer>
    );
}

export default BusinessProfile;