import React from 'react';
import { Button } from '@mui/material';

const MinimalisticButton = ({ children, onClick }) => {

    return (
        <Button 
            onClick={onClick}
            sx={{ 
                justifyContent: 'center', 
                bgcolor: 'transparent', 
                color: 'text.secondary', 
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.5,
                textTransform: 'none',
                textWrap: 'nowrap',
                '&::before': {
                    bgcolor: 'text.secondary',
                    content: '""',
                    display: 'inline-block',
                    height: '1px',
                    marginRight: '10px',
                    transition: 'all .42s cubic-bezier(.25,.8,.25,1)',
                    width: 0,
                },
                '&:hover::before': {
                    width: '1.5rem',
                }
            }}
            fullWidth
        >
            {children}
        </Button>
    );
}

export default MinimalisticButton;