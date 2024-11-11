import React from 'react';
import { useUser } from '../../../../context/UserContext';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import InputFileUpload from '../../../../components/inputs/InputFileUpload';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatPhoneNumber } from '../../../../utils/formatPhone';
import ImageIcon from '@mui/icons-material/Image';
import LockResetIcon from '@mui/icons-material/LockReset';

const UserDataCard = () => {
    const { user, loading, uploadAvatar, deleteAvatar } = useUser();

    const handleAvatarUpload = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            uploadAvatar(formData);
        }
    };

    return (
        <Card elevation={2}>
            <CardContent sx={{ display: 'flex' }}>
                <Avatar
                    alt={user?.name}
                    src={user?.avatarUrl}
                    sx={{ width: 100, height: 100, mr: 2 }}
                />
                <Box sx={{ }}>
                    <Typography variant='h6' gutterBottom>{user?.name}</Typography>
                    <Typography variant='body1' color='text.secondary'>{user?.email}</Typography>
                    <Typography variant='body1' color='text.secondary'>{formatPhoneNumber(user?.phone)}</Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardHeader 
                avatar={<ImageIcon sx={{ color: '#1976d2' }} />} 
                title={<Typography variant='body1' fontWeight={500}>Zmień zdjęcie profilu</Typography>}
                action={
                <>
                    <InputFileUpload onChange={handleAvatarUpload} variant='text' loading={loading} />
                    <Button
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => deleteAvatar()}
                        sx={{ textTransform: 'none' }}
                    >
                        Usuń
                    </Button>
                </>}
            />
        </Card>
    );
}

export default UserDataCard;