import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import { useEmployee } from '../../../../context/EmployeeContext';
import { validateEmail, validatePhoneNumber, validateTextField } from '../../../../utils/validations';
import InputFileUpload from '../../../../components/inputs/InputFileUpload';
import CloseIcon from '@mui/icons-material/Close';

const EditEmployeeDialog = ({ open, onClose, employee }) => {
    const { updateEmployee, uploadEmployeeAvatar, loading } = useEmployee();
    const [formData, setFormData] = useState(new FormData());
    const [avatarPreview, setAvatarPreview] = useState('');
    const [employeeData, setEmployeeData] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (employee) {
            setAvatarPreview(employee.avatarUrl);
            setEmployeeData({
                name: employee.name || '',
                position: employee.position || '',
                email: employee.email || '',
                phone: formatPhoneNumber(employee.phone) || ''
            });
        }
    }, [employee]);

    const [errors, setErrors] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    const handleAvatarChange = (file) => {
        if (file) {
            formData.append('file', file);
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const unformattedPhone = unformatPhoneNumber(value);

            if (unformattedPhone.length <= 9) {
                setEmployeeData({
                    ...employeeData,
                    phone: formatPhoneNumber(value)
                });
            }
        } else {
            setEmployeeData({
                ...employeeData,
                [name]: value
            });
        }
    };

    const validate = (formData) => {
        let newErrors = { ...errors };
        
        newErrors.name = validateTextField(formData.name);
        newErrors.position = validateTextField(formData.position);
        newErrors.email = validateEmail(formData.email);
        newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        
        return !hasErrors;
    };

    const handleSubmit = () => {
        if (!validate(employeeData)) {
            return;
        }
            
        const dataToSubmit = {
            ...employeeData,
            phone: unformatPhoneNumber(employeeData.phone)
        };

        uploadEmployeeAvatar(employee.id, formData);
        updateEmployee(employee.id, dataToSubmit);
        onClose();
    };

    const handleCancel = () => {
        setAvatarPreview(employee.avatarUrl);
        setEmployeeData({
            name: employee.name || '',
            position: employee.position || '',
            email: employee.email || '',
            phone: formatPhoneNumber(employee.phone) || ''
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Dane pracownika</DialogTitle>
            <DialogContent>
                <Stack spacing={3} pt={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt={employee?.name}
                            src={avatarPreview}
                            sx={{ width: 120, height: 120, mr: 2 }}
                        />
                        <InputFileUpload onChange={handleAvatarChange} loading={loading} variant='text' />
                    </Box>
                    
                    <TextField
                        label='Imię'
                        name='name'
                        value={employeeData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Stanowisko'
                        name='position'
                        value={employeeData.position}
                        onChange={handleChange}
                        error={Boolean(errors.position)}
                        helperText={errors.position}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Email'
                        name='email'
                        type='email'
                        value={employeeData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Telefon'
                        name='phone'
                        value={employeeData.phone}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        variant='outlined'
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Button sx={{ fontSize: 16, textTransform: 'none' }} onClick={handleCancel}>
                    Anuluj
                </Button>
                <Button sx={{ fontSize: 16, textTransform: 'none' }} onClick={handleSubmit}>
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditEmployeeDialog;