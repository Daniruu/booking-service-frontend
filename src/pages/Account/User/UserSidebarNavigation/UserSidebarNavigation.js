import React from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutButton from '../../../../components/buttons/LogoutButton/LogoutButton';
import BusinessButton from '../BusinessButton/BusinessButton';

const UserSidebarNavigation = ({ selectedSection, setSelectedSection }) => {
    return (
        <Stack spacing={1} mt={2}>
            <Divider />
            <Typography variant='body2' sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: 14, fontWeight: '500', lineHeight: '1.2rem', px: 1, pt: 1 }}>Menu</Typography>
            <Button 
                size='large'
                onClick={() => setSelectedSection('bookings')} 
                startIcon={<CalendarMonthIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'bookings' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Wizyty
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('favourite')} 
                startIcon={<FavoriteIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'favourite' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Ulubione
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('reviews')} 
                startIcon={<GradeIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'reviews' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Opinie
            </Button>
            <Button 
                size='large'
                onClick={() => setSelectedSection('settings')} 
                startIcon={<SettingsIcon />}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: selectedSection === 'settings' ? 'primary.main' : 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                }}
            >
                Ustawienia
            </Button>
            <Divider />
            <Typography variant='body2'sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: 14, fontWeight: '500', lineHeight: '1.2rem', px: 1, pt: 1 }}>Akcje</Typography>
            <BusinessButton />
            <LogoutButton sx={{ justifyContent: 'left' }} />
        </Stack>
    );
}

export default UserSidebarNavigation;