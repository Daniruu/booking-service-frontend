import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import LogoutButton from '../../../../components/buttons/LogoutButton/LogoutButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const BusinessSidebarNavigation = ({ selectedSection, setSelectedSection }) => {
    return (
        <Stack spacing={1} mt={2}>
            <Divider />
            <Typography variant='body2' sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: 14, fontWeight: '500', lineHeight: '1.2rem', px: 1, pt: 1 }}>
                Akcje
            </Typography>
            <Button 
                size='large'
                onClick={() => setSelectedSection('businessInfo')} 
                startIcon={<InfoOutlinedIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'businessInfo' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Informacje o firmie
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('employees')} 
                startIcon={<GroupOutlinedIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'employees' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Pracownicy
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('services')} 
                startIcon={<DesignServicesOutlinedIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'services' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Usługi
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('calendar')} 
                startIcon={<CalendarMonthOutlinedIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'calendar' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Kalendarz
            </Button>
            <Divider />
            <Typography variant='body2'sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: 14, fontWeight: '500', lineHeight: '1.2rem', px: 1, pt: 1 }}>
                Akcje
            </Typography>
            <LogoutButton sx={{ justifyContent: 'left' }} />
        </Stack>
    );
}

export default BusinessSidebarNavigation;