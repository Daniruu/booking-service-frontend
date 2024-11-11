import React from 'react';
import { Avatar, Badge, Card, Stack, Typography } from '@mui/material';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserCard = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate('/account/user')}
            sx={{ 
                display: 'flex', 
                alignItems: 'center',
                background: 'transparent',
                padding: 1,
                width: '100%',
                cursor: 'pointer'
            }} 
            elevation={0}
        >
            <Avatar 
                src={user.avatarUrl}
                alt={user.name}
                sx={{ width: 48, height: 48, mr: 2 }}
            />
            
            <Stack>
                <Typography variant='body1' fontWeight={500}>
                    {user.name}
                </Typography>
                <Typography variant="body2" fontSize={12} color='text.secondary'>
                    {user.email}
                </Typography>
            </Stack>
        </Card>
    );
}

export default UserCard;