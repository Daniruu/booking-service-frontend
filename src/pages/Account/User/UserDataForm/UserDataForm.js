import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useUser } from '../../../../context/UserContext';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import { validateEmail, validatePhoneNumber, validateTextField } from '../../../../utils/validations';
import PersonIcon from '@mui/icons-material/Person';

const UserDataForm = () => {
    const { user, updateUser, loading } = useUser();
    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        phone: formatPhoneNumber(user?.phone),
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setFormData({
                    ...formData,
                    phone: formatPhoneNumber(value)
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validate = () => {
        let newErrors = { ...errors };

        newErrors.name = validateTextField(formData.name);
        newErrors.email = validateEmail(formData.email);
        newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const unformattedPhone = unformatPhoneNumber(formData.phone);
            
        const updateUserDto = {
            ...formData,
            phone: unformattedPhone
        };

        updateUser(updateUserDto);
        setIsEdit(false);
    };

    return (
        <Card elevation={2}>
            <CardHeader 
                avatar={<PersonIcon sx={{ color: '#1976d2' }} />}
                title={<Typography variant='body1' fontWeight={500}>Dane użytkownika</Typography>}
                action={
                    isEdit ? (
                        <Button onClick={() => setIsEdit(false)} color='error' sx={{ textTransform: 'none' }}>Anuluj</Button>
                    ) : (
                        <Button onClick={() => setIsEdit(true)} sx={{ textTransform: 'none' }}>Edytuj</Button>
                    )
                }
            />
            <Divider/>
            <CardContent>
                <Stack spacing={3} pt={1}>
                    <TextField  
                        label='Imię' 
                        variant='outlined' 
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        disabled={!isEdit}
                        size='small'
                        fullWidth
                    />
                    <TextField  
                        label='Email' 
                        variant='outlined' 
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        disabled={!isEdit}
                        size='small'
                        fullWidth
                    />
                    <TextField  
                        label='Telefon' 
                        variant='outlined' 
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        disabled={!isEdit}
                        size='small'
                        fullWidth
                    />
                    {isEdit && (
                        <Button variant='contained' onClick={handleSubmit} sx={{  textTransform: 'none' }}>Zapisz</Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default UserDataForm;