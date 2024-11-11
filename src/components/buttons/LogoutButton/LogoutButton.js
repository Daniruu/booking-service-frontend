import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../context/AuthContext';

const LogoutButton = ({ sx }) => {
    const { logout } = useAuth();
    return (
        <Button 
            fullWidth
            size='large'
            startIcon={<LogoutIcon />} 
            sx={{ color: 'text.secondary', textTransform: 'none', fontSize: '16px', borderRadius: 2, ...sx }}
            onClick={logout}
        >
            Wyloguj się
        </Button>
    )
}

export default LogoutButton;