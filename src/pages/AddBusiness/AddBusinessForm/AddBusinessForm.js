import React, { useState } from 'react';
import { validateAddress, validateEmail, validateKrs, validateNIP, validatePhoneNumber, validateRegon, validateTextField } from '../../../utils/validations';
import { Autocomplete, Button, Grid2, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Box, Grid, Stack } from '@mui/system';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../utils/formatPhone';
import { formatPostalCode, unformatPostalCode } from '../../../utils/formatPostalCode';
import categories from '../../../data/BusinessCategories.json';
import regions from '../../../data/Regions.json';

const steps = ['Podstawowe informacje', 'Dane rejestracyjne', 'Dane adresowe'];

const AddBusinessForm = ({ onSubmit }) => {
    const [step, setStep] = useState(0);
    const totalSteps = 3;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        email: '',
        phone: '',
        nip: '',
        regon: '',
        krs: null,
        address: {
            street: '',
            city: '',
            region: '',
            postalCode: '',
            buildingNumber: '',
            roomNumber: null

        }
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        category: '',
        email: '',
        phone: '',
        nip: '',
        regon: '',
        krs: '',
        address: {
            street: '',
            city: '',
            region: '',
            postalCode: '',
            buildingNumber: '',
            roomNumber: ''

        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in formData.address) {
            if (name === 'postalCode') {
                const unformattedPostalCode = unformatPostalCode(value);

                if (unformattedPostalCode.length <= 5) {
                    setFormData({
                        ...formData,
                        address: {
                            ...formData.address,
                            postalCode: formatPostalCode(value)
                        }
                    });
                }
            } else {
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        [name]: value
                    }
                });
            }
        } else {
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
        }
    };

    const handleCategoryChange = (event, newValue) => {
        setFormData({
            ...formData,
            category: newValue ? newValue.name : ''
        });
    };

    const handleRegionChange = (event, newValue) => {
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                region: newValue ? newValue.name : ''
            }
        });
    };

    const validateStep = (step) => {
        let newErrors = { ...errors };

        switch (step) {
            case 0:
                newErrors.name = validateTextField(formData.name);
                newErrors.description = validateTextField(formData.description);
                newErrors.email = validateEmail(formData.email);
                newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));
                newErrors.category = validateTextField(formData.category);
                break;
            case 1:
                newErrors.nip = validateNIP(formData.nip);
                newErrors.regon = validateRegon(formData.regon);
                newErrors.krs = validateKrs(formData.krs);
                break;
            case 2:
                const addressErrors = validateAddress(formData.address, ['region', 'city', 'street', 'buildingNumber', 'postalCode']);
                newErrors.address = { ...addressErrors };
                break;
            default:
                break;
        }

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(error =>
            typeof error === 'string' ? error : Object.values(error).some(e => e)
        );
        
        return !hasErrors;
    };

    const handleNextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handlePrevStep = () => {
        if (step > 0) {
            setErrors({
                name: '',
                description: '',
                category: '',
                email: '',
                phone: '',
                nip: '',
                regon: '',
                krs: '',
                address: {
                    street: '',
                    city: '',
                    region: '',
                    postalCode: '',
                    buildingNumber: '',
                    roomNumber: ''

                }
            });
            setStep(step - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep(step)) {
            return;
        }

        const sanitizedFormData = {
            ...formData,
            krs: formData.krs === '' ? null : formData.krs,
            address: {
                ...formData.address,
                roomNumber: formData.address.roomNumber === '' ? null : formData.address.roomNumber
            }
        };

        const unformattedPhone = unformatPhoneNumber(formData.phone);
            
        const dataToSubmit = {
            ...sanitizedFormData,
            phone: unformattedPhone
        };

        onSubmit(dataToSubmit);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="Nazwa"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Opis"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={Boolean(errors.description)}
                            fullWidth
                            multiline
                            margin="normal"
                            
                        />
                        <Autocomplete
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            value={categories.find(option => option.name === formData.category) || null}
                            onChange={handleCategoryChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Kategoria'
                                    error={Boolean(errors.category)}
                                    helperText={errors.category}
                                    fullWidth
                                />
                            )}
                        />
                        <TextField
                            label='Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            fullWidth
                        />
                        <TextField
                            label='Telefon'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            error={Boolean(errors.phone)}
                            helperText={errors.phone}
                            fullWidth
                            placeholder='+48'
                        />
                    </Stack>
                );
            case 1:
                return (
                    <Stack spacing={2}>
                        <TextField
                            label='NIP'
                            name='nip'
                            value={formData.nip}
                            onChange={handleChange}
                            error={Boolean(errors.nip)}
                            helperText={errors.nip}
                            fullWidth
                        />
                        <TextField
                            label='Regon'
                            name='regon'
                            value={formData.regon}
                            onChange={handleChange}
                            error={Boolean(errors.regon)}
                            helperText={errors.regon}
                            fullWidth
                        />
                        <TextField
                            label='KRS (opcjonalnie)'
                            name='krs'
                            value={formData.krs}
                            onChange={handleChange}
                            error={Boolean(errors.krs)}
                            helperText={errors.krs}
                            fullWidth
                        />
                    </Stack>
                );
            case 2:
                return (
                    <Stack spacing={2}>
                        <TextField
                            label='Ulica'
                            name='street'
                            value={formData.address.street}
                            onChange={handleChange}
                            error={Boolean(errors.address?.street)}
                            helperText={errors.address?.street}
                            fullWidth
                        />
                        <TextField
                            label='Miasto'
                            name='city'
                            value={formData.address.city}
                            onChange={handleChange}
                            error={Boolean(errors.address?.city)}
                            helperText={errors.address?.city}
                            fullWidth
                        />
                        <Autocomplete
                            options={regions}
                            getOptionLabel={(option) => option.name}
                            value={regions.find(option => option.name === formData.address.region) || null}
                            onChange={handleRegionChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Wojewódzdto'
                                    error={Boolean(errors.address?.region)}
                                    helperText={errors.address?.region}
                                    fullWidth
                                />
                            )}
                        />
                        <TextField
                            label='Kod pocztowy'
                            name='postalCode'
                            value={formData.address.postalCode}
                            onChange={handleChange}
                            error={Boolean(errors.address?.postalCode)}
                            helperText={errors.address?.postalCode}
                            fullWidth
                        />
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={6}>
                                <TextField
                                    label='Numer budynku'
                                    name='buildingNumber'
                                    value={formData.address.buildingNumber}
                                    onChange={handleChange}
                                    error={Boolean(errors.address?.buildingNumber)}
                                    helperText={errors.address?.buildingNumber}
                                    fullWidth
                                />
                            </Grid2>
                            <Grid2 item xs={6}>
                                <TextField
                                    label='Numer lokalu (opcjonalnie)'
                                    name='roomNumber'
                                    value={formData.address.roomNumber}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid2>
                        </Grid2>
                    </Stack>
                );
            default:
                return null;
        }
    };

    return (
        <Paper sx={{ padding: 4, width: 800 }}>
            <Typography variant='h5' mb={4}>
                Rejestracja przedsiębiorstwa
            </Typography>
            <Stepper activeStep={step}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ marginY: 4 }}>
                {renderStepContent(step)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={step === 0} onClick={handlePrevStep}>
                    Wstecz
                </Button>
                {step === totalSteps - 1 ? (
                    <Button variant='contained' color='primary' onClick={handleSubmit}>
                        Zatwierdź
                    </Button>
                ) : (
                    <Button variant='contained' color='primary' onClick={handleNextStep}>
                        Dalej
                    </Button>
                )}
            </Box>
        </Paper>
    );
}

export default AddBusinessForm;