import React from 'react';
import { useUser } from '../../../../context/UserContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';

const BusinessButton = ({ sx }) => {
    const { user } = useUser();
    const navigate = useNavigate();

    if (user.role === 'user') {
        return (
            <Button 
                size='large'
                startIcon={<WorkIcon />}
                onClick={() => navigate('/add-business')}
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                    ...sx
                }}
            >
                Dodaj biznes
            </Button>
        )
    } else {
        return (
            <Button 
                size='large'
                startIcon={<WorkIcon />}
                onClick={() => navigate('/account/business')}  
                sx={{ 
                    textTransform: 'none', 
                    justifyContent: 'left',
                    color: 'text.secondary',
                    fontSize: '16px',
                    borderRadius: 2,
                    ...sx
                }}
            >
                Profil biznesu
            </Button>
        )
    }
    
}

export default BusinessButton;