import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from '@mui/material';
import { useService } from '../../../../context/ServiceContext';
import { useEmployee } from '../../../../context/EmployeeContext';
import CloseIcon from '@mui/icons-material/Close';

const EditServiceDialog = ({ open, onClose, service }) => {
    const { employees } = useEmployee();
    const { updateBusinessService, loading } = useService();
    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        price: null,
        duration: null,
        group: '',
        employeeId: ''
    });

    useEffect(() => {
        if (service) {
            setServiceData({
                id: service.id,
                name: service.name,
                description: service.description || '',
                price: service.price,
                duration: service.duration,
                group: service.group,
                employeeId: service.employeeId
            });
        }
    }, [service]);

    const [errors, setErrors] = useState({
        name: '',
        position: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData({
            ...serviceData,
            [name]: name === 'price' || name === 'duration' ? Number(value) : value
        });
    };

    const validate = (formData) => {
        let newErrors = { ...errors };
        
        newErrors.name = formData.name ? '' : 'Pole jest wymagane';
        newErrors.description = formData.description ? '' : 'Pole jest wymagane';
        newErrors.price = formData.price > 0 ? '' : 'Cena powinna być większa niż 0';
        newErrors.duration = formData.duration > 0 ? '' : 'Czas trwania powinien быть больше 0';
        newErrors.employeeId = formData.employeeId ? '' : 'Pole jest wymagane';
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleSubmit = () => {
        if (!validate(serviceData)) {
            return;
        }

        updateBusinessService(service.id, serviceData);
        onClose();
    };

    const handleCancel = () => {
        setServiceData({
            id: service.id,
            name: service.name,
            description: service.description || '',
            price: service.price,
            duration: service.duration,
            group: service.group,
            employeeId: service.employeeId
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <DialogTitle>Dane usługi</DialogTitle>
            <DialogContent>
                <Stack spacing={3} pt={1}>
                    <TextField
                        label='Nazwa'
                        name='name'
                        value={serviceData.name}
                        onChange={handleChange}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Opis'
                        name='description'
                        value={serviceData.description}
                        onChange={handleChange}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        variant='outlined'
                        fullWidth
                        multiline
                    />
                    <TextField
                        label='Cena'
                        name='price'
                        type='number'
                        InputProps={{ inputProps: { min: 0 } }}
                        value={serviceData.price}
                        onChange={handleChange}
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Czas trwania'
                        name='duration'
                        type='number'
                        InputProps={{ inputProps: { min: 0 } }}
                        value={serviceData.duration}
                        onChange={handleChange}
                        error={Boolean(errors.duration)}
                        helperText={errors.duration}
                        variant='outlined'
                        fullWidth
                    />
                    <TextField
                        label='Grupa'
                        name='group'
                        value={serviceData.group}
                        onChange={handleChange}
                        error={Boolean(errors.group)}
                        helperText={errors.group}
                        variant='outlined'
                        fullWidth
                    />
                    <Autocomplete
                        options={employees || []}
                        getOptionLabel={(option) => option.name}
                        value={employees?.find((e) => e.id === serviceData.employeeId) || null}
                        onChange={(e, newValue) => {
                            setServiceData({
                                ...serviceData,
                                employeeId: newValue ? newValue.id : ''
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pracownik"
                                error={Boolean(errors.employeeId)}
                                helperText={errors.employeeId}
                                variant='outlined'
                                fullWidth
                            />
                        )}
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

export default EditServiceDialog;