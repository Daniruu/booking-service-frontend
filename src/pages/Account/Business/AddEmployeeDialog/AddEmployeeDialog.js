import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import { useEmployee } from '../../../../context/EmployeeContext';
import { validateEmail, validatePhoneNumber, validateTextField } from '../../../../utils/validations';

const AddEmployeeDialog = ({ open, onClose }) => {
    const { addEmployee } = useEmployee();
    const [employeeData, setEmployeeData] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

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

    const handleSubmit = async () => {
        if (!validate(employeeData)) {
            return;
        }
            
        const dataToSubmit = {
            ...employeeData,
            phone: unformatPhoneNumber(employeeData.phone)
        };

        addEmployee(dataToSubmit);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Dodaj pracownika</DialogTitle>
            <DialogContent>
                <Stack spacing={3} pt={1}>
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
                <Button sx={{ fontSize: 16, textTransform: 'none' }} onClick={onClose}>
                    Anuluj
                </Button>
                <Button sx={{ fontSize: 16, textTransform: 'none' }} onClick={handleSubmit}>
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddEmployeeDialog;