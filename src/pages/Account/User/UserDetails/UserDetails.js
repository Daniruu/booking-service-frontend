import React, { useState } from 'react';
import { useUser } from '../../../../context/UserContext';
import { Button, Avatar, TextField, Card, CardHeader, CardContent, Box, CardActions, Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Stack, Divider } from '@mui/material';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import { validateEmail, validatePhoneNumber, validateTextField } from '../../../../utils/validations';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InputFileUpload from '../../../../components/inputs/InputFileUpload';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../../context/AuthContext';

const UserDetails = () => {
    const { logout } = useAuth();
    const { user, setUser, updateUser, uploadAvatar, deleteAvatar, loading } = useUser();
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        phone: formatPhoneNumber(user.phone)
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        logout();
    };

    const handleClikOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAvatarUpload = (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            uploadAvatar(formData);
        }
    };

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleStopEdit = () => {
        setIsEdit(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setUserData({
                    ...userData,
                    phone: formatPhoneNumber(value)
                });
            }
            
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        let newErrors = { ...errors };
        
        newErrors.name = validateTextField(userData.name, 'Imię');
        newErrors.email = validateEmail(userData.email);
        newErrors.phone = validatePhoneNumber(unformatPhoneNumber(userData.phone));

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return 
        }

        const unformattedPhone = unformatPhoneNumber(userData.phone);
        
        const updateUserDto = {
            ...userData,
            phone: unformattedPhone
        };

        updateUser(updateUserDto);
        setIsEdit(false);
    };

    const handleDeleteAvatar = async () => {
        deleteAvatar();
        setOpenDialog(false);
    };

    return (
        <Card elevation={2} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader title={
                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: 1, color: 'text.primary' }}>
                    <AccountCircleOutlinedIcon /> Dane Użytkownika
                </Typography>}
            />
            <CardContent>
                <Box sx={{ display: 'flex', mb: 4 }}>
                    <Avatar 
                        src={user.avatarUrl}
                        alt={user.name}
                        sx={{ width: 96, height: 96, marginRight: 3 }}
                    />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                        <InputFileUpload onChange={handleAvatarUpload} />
                        <Button
                            variant='outlined'
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            onClick={handleClikOpenDialog}
                            disabled={loading}
                        >
                            Usuń
                        </Button>
                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle>
                                {'Chcesz usunąć swoje zdjęcie profilu?'}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Usuniętych plików nie da się później odzyskać
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Anuluj</Button>
                                <Button onClick={handleDeleteAvatar}>Potwierdź</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    
                    <TextField 
                        label='Imię' 
                        variant='outlined' 
                        name='name'
                        value={userData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        slotProps={{
                            input: {
                            readOnly: !isEdit,
                            },
                        }}
                        size='small'
                    />
                    <TextField 
                        label='Email' 
                        variant='outlined' 
                        name='email'
                        value={userData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        slotProps={{
                            input: {
                            readOnly: !isEdit,
                            },
                        }}
                        size='small'
                    />
                    <TextField 
                        label='Telefon' 
                        variant='outlined' 
                        name='phone'
                        value={userData.phone}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        slotProps={{
                            input: {
                            readOnly: !isEdit,
                            },
                        }}
                        size='small'
                    />
                </Box>
            </CardContent>
            <CardActions sx={{ margin: 1 }}>
                {isEdit ? (
                    <>
                        <Button variant='outlined' onClick={() => handleStopEdit()}>
                            Anuluj
                        </Button>
                        <Button variant='contained' onClick={handleSubmit}>
                            Zapisz
                        </Button>
                    </>
                ) : (
                    <Button variant='contained' onClick={() => handleEdit()}>
                        Edytuj
                    </Button>
                )}
            </CardActions>
            <Divider variant='middle'/>
            <CardActions sx={{ mt: 'auto' }}>
                <Stack sx={{ width: '100%', margin: 1 }} spacing={2}>
                    {user.role === 'user' ? (
                        <Button variant='outlined' onClick={() => navigate('/add-business')} fullWidth>
                            Dodaj biznes
                        </Button>   
                    ) : (
                        <Button variant='outlined' onClick={() => navigate('/account/business')} fullWidth>
                            Przejdź do profilu biznesu
                        </Button>
                    )}
                    <Button variant='outlined' startIcon={<LogoutIcon />} color='error' onClick={handleLogout} fullWidth>
                        Wyloguj się
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}

export default UserDetails;