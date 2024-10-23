import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Stack, TextField, Typography } from '@mui/material';
import ExpandMoreButton from '../../../../components/buttons/ExpandMoreButton/ExpandMoreButton';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import { useBusiness, useBusinessAccount } from '../../../../context/BusinessAccountContext';
import { useService } from '../../../../context/ServiceContext';
import { useNotification } from '../../../../context/NotificationContext';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEmployee } from '../../../../context/EmployeeContext';

const ServicesCard = () => {
    const { business } = useBusinessAccount();
    const { employees, fetchBusinessEmployees } = useEmployee();
    const { services, addService, fetchBusinessServices, updateBusinessService, deleteBusinessService } = useService();
    const { showNotification } = useNotification();
    const [expanded, setExpanded] = useState(true);

    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [currentServiceData, setCurrentServiceData] = useState({
        id: null,
        name: '',
        description: '',
        price: null,
        duration: null,
        group: '',
        employeeId: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        group: '',
        employeeId: ''
    });

    useEffect(() => {
        if (business) {
            fetchBusinessServices(business.id);
        }
    }, [business]);

    useEffect(() => {
        if (business) {
            fetchBusinessEmployees(business.id);
        }
    }, [business]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpenServiceModal = (service = null) => {
        if (service) {
            setCurrentServiceData(service);
        } else {
            setCurrentServiceData({
                id: null,
                name: '',
                description: '',
                price: '',
                duration: '',
                group: '',
                employeeId: ''
            });
        }
        setOpenServiceModal(true);
    };

    const handleCloseServiceModal = () => {
        setOpenServiceModal(false);
        setCurrentServiceData({
            id: null,
            name: '',
            description: '',
            price: '',
            duration: '',
            group: '',
            employeeId: ''
        });
        setErrors({
            name: '',
            description: '',
            price: '',
            duration: '',
            group: '',
            employeeId: ''
        });
    };

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setCurrentServiceData({
            ...currentServiceData,
            [name]: name === 'price' || name === 'duration' ? Number(value) : value
        });
    };

    const validate = (formData) => {
        let newErrors = { ...errors };
        
        newErrors.name = formData.name ? '' : 'Pole jest wymagane';
        newErrors.description = formData.description ? '' : 'Pole jest wymagane';
        newErrors.price = formData.price > 0 ? '' : 'Cena powinna być większa niż 0';
        newErrors.duration = formData.duration > 0 ? '' : 'Czas trwania powinien быть больше 0';
        newErrors.group = formData.group ? '' : 'Pole jest wymagane';
        newErrors.employeeId = formData.employeeId ? '' : 'Pole jest wymagane';
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        return !hasErrors;
    };

    const handleServiceSubmit = async () => {
        if (!validate(currentServiceData)) {
            return;
        }

        try {
            if (currentServiceData.id) {
                updateBusinessService(business.id, currentServiceData.id, currentServiceData);
            } else {
                addService(business.id, currentServiceData);
            }
            setOpenServiceModal(false);
        } catch (error) {
            showNotification('Nie udało się zapisać usługi', error.message, 'error');
        }
    };

    const handleDeleteService = async (id) => {
        deleteBusinessService(business.id, id);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader 
                avatar={<RoomServiceOutlinedIcon />} 
                action={<ExpandMoreButton expand={expanded} onClick={handleExpandClick} />}
                title='Usługi' 
                subheader='Zarządzaj usługami'  
            />
            <Divider />

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent sx={{ '&:last-child': { paddingBottom: 0 } }}>
                    <Stack direction='column' spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6'>Usługi</Typography>
                            <Button 
                                sx={{ textTransform: 'none' }} 
                                variant='contained' 
                                onClick={() => handleOpenServiceModal()}
                                startIcon={<AddIcon />}
                            >
                                Dodaj
                            </Button>
                        </Box>

                        <List>
                            {services?.map((service) => (
                                <ListItem key={service.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                                    <ListItemText
                                        primary={service.name}
                                        secondary={service.description}
                                    />
                                    <ListItemText
                                        primary={`${service.price} zł`}
                                        secondary={`${service.duration} min`}
                                        primaryTypographyProps={{ textAlign: 'right' }}
                                        secondaryTypographyProps={{ textAlign: 'right' }}
                                    />
                                    <Box sx={{ marginLeft: 2}}>
                                        <IconButton onClick={() => handleOpenServiceModal(service)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteService(service.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </CardContent>
            </Collapse>

            {openServiceModal && (
                <Dialog open={openServiceModal} onClose={handleCloseServiceModal}>
                    <DialogTitle>{currentServiceData.id ? 'Edytuj usługę' : 'Dodaj usługę'}</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ minWidth: 480 }}>
                        <Stack spacing={3}>
                            <TextField
                                label='Nazwa'
                                name='name'
                                value={currentServiceData.name}
                                onChange={handleServiceChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Opis'
                                name='description'
                                value={currentServiceData.description}
                                onChange={handleServiceChange}
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                                variant='standard'
                                fullWidth
                                multiline
                            />
                            <TextField
                                label='Cena'
                                name='price'
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                value={currentServiceData.price}
                                onChange={handleServiceChange}
                                error={Boolean(errors.price)}
                                helperText={errors.price}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Czas trwania'
                                name='duration'
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                value={currentServiceData.duration}
                                onChange={handleServiceChange}
                                error={Boolean(errors.duration)}
                                helperText={errors.duration}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Grupa'
                                name='group'
                                value={currentServiceData.group}
                                onChange={handleServiceChange}
                                error={Boolean(errors.group)}
                                helperText={errors.group}
                                variant='standard'
                                fullWidth
                            />
                            <Autocomplete
                                options={employees || []}
                                getOptionLabel={(option) => option.name}
                                value={employees?.find((e) => e.id === currentServiceData.employeeId) || null}
                                onChange={(e, newValue) => {
                                    setCurrentServiceData({
                                        ...currentServiceData,
                                        employeeId: newValue ? newValue.id : ''
                                    });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pracownik"
                                        error={Boolean(errors.employeeId)}
                                        helperText={errors.employeeId}
                                        variant='standard'
                                        fullWidth
                                    />
                                )}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ fontSize: 16 }} onClick={handleCloseServiceModal}>
                            Anuluj
                        </Button>
                        <Button sx={{ fontSize: 16 }} onClick={handleServiceSubmit}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Card>
    );
};

export default ServicesCard;
