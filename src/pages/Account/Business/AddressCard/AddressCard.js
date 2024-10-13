import React, { useState } from 'react';
import { Autocomplete, Button, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useBusiness } from '../../../../context/BusinessContext';
import { formatPostalCode, unformatPostalCode } from '../../../../utils/formatPostalCode';
import { validateAddress } from '../../../../utils/validations';
import LocationSearchingOutlinedIcon from '@mui/icons-material/LocationSearchingOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import regions from '../../../../data/Regions.json';

const AddressCard = () => {
    const { business, updateBusiness } = useBusiness();
    const [openModal, setOpenModal] = useState(false);
    const [addressData, setAddressData] = useState({
        region: business?.address.region || '',
        city: business?.address.city || '',
        street: business?.address.street || '',
        buildingNumber: business?.address.buildingNumber || '',
        roomNumber: business?.address.roomNumber || '',
        postalCode: business?.address.postalCode || ''
    });
    const [errors, setErrors] = useState({
        region: '',
        city: '',
        street: '',
        buildingNumber: '',
        roomNumber: '',
        postalCode: ''
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAddressData({
            region: business.address.region,
            city: business.address.city,
            street: business.address.street,
            buildingNumber: business.address.buildingNumber,
            roomNumber: business.address.roomNumber,
            postalCode: business.address.postalCode
        });
        setErrors({
            region: '',
            city: '',
            street: '',
            buildingNumber: '',
            roomNumber: '',
            postalCode: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'postalCode') {
            const unformattedPostalCode = unformatPostalCode(value);

            if (unformattedPostalCode.length <= 5) {
                setAddressData({
                    ...addressData,
                    postalCode: formatPostalCode(value)
                });
            }
        } else {
            setAddressData({
                ...addressData,
                [name]: value
            });
        }
    };

    const handleAutocompleteChange = (e, value) => {
        setAddressData({
            ...addressData,
            region: value?.name || ''
        });
    };

    const validate = () => {
        let newErrors = { ...errors };
        
        newErrors = validateAddress(addressData, ['region', 'city', 'street', 'buildingNumber', 'postalCode']);
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        
        return !hasErrors;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            return;
        }

        const dataToSubmit = {
            ...business,
            address: {
                ...addressData,
                roomNumber: addressData.roomNumber || null
            }
        };

        updateBusiness(business.id, dataToSubmit)
    };

    if(!addressData) {
        return (<Typography>loading</Typography>);
    };

    return (
        <>
            <CardHeader 
                avatar={<LocationSearchingOutlinedIcon />} 
                action={<IconButton onClick={handleOpenModal}><EditOutlinedIcon /></IconButton>}
                title='Dane adresowe' 
                subheader='Zarządzaj danymi adresowymi firmy' 
                sx={{ 
                    '& .MuiCardHeader-action': {
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        alignSelf: 'center'
                    }
                }}
            />
            <Divider />
            {openModal && (
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Edytuj dane adresowe firmy</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ minWidth: 480 }}>
                        <Stack spacing={3}>
                            <Autocomplete
                                options={regions}
                                getOptionLabel={(option) => option.name}
                                value={regions.find(option => option.name === addressData.region) || null}
                                onChange={handleAutocompleteChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label='Wojewódzdto'
                                        error={Boolean(errors.region)}
                                        helperText={errors.region}
                                        variant='standard'
                                    />
                                )}
                            />
                            <TextField
                                label='Miasto'
                                name='city'
                                value={addressData.city}
                                onChange={handleChange}
                                error={Boolean(errors.city)}
                                helperText={errors.city}
                                variant='standard'
                                fullWidth
                            />
                            <TextField
                                label='Ulica'
                                name='street'
                                value={addressData.street}
                                onChange={handleChange}
                                error={Boolean(errors.street)}
                                helperText={errors.street}
                                variant='standard'
                                fullWidth
                            />
                            <Stack direction='row' spacing={2}>
                                <TextField
                                    label='Numer budynku'
                                    name='buildingNumber'
                                    value={addressData.buildingNumber}
                                    onChange={handleChange}
                                    error={Boolean(errors.buildingNumber)}
                                    helperText={errors.buildingNumber}
                                    variant='standard'
                                    fullWidth
                                />
                                <TextField
                                    label='Numer lokalu (opcjonalnie)'
                                    name='roomNumber'
                                    value={addressData.roomNumber}
                                    onChange={handleChange}
                                    variant='standard'
                                    fullWidth
                                />
                            </Stack>
                            <TextField
                                label='Kod pocztowy'
                                name='postalCode'
                                value={addressData.postalCode}
                                onChange={handleChange}
                                error={Boolean(errors.postalCode)}
                                helperText={errors.postalCode}
                                variant='standard'
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <IconButton aria-label='close' onClick={() => handleCloseModal()} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <Button sx={{ fontSize: 16 }} onClick={() => handleCloseModal()}>
                            Anuluj
                        </Button>
                        <Button sx={{ fontSize: 16 }} onClick={handleSubmit}>
                            Zapisz
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default AddressCard;