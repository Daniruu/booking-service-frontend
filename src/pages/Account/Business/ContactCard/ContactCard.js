import React, { useState } from 'react';
import { useBusiness, useBusinessAccount } from '../../../../context/BusinessAccountContext';
import { Button, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { formatPhoneNumber, unformatPhoneNumber } from '../../../../utils/formatPhone';
import { validateEmail, validatePhoneNumber } from '../../../../utils/validations';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

const ContactCard = () => {
    const { business, updateBusiness } = useBusinessAccount();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        email: business?.email || '',
        phone: formatPhoneNumber(business?.phone) || '',
    });
    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({
            email: business.email,
            phone: formatPhoneNumber(business.phone)
        });
        setErrors({
            email: '',
            phone: ''
        });
    };

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
        
        newErrors.email = validateEmail(formData.email);
        newErrors.phone = validatePhoneNumber(unformatPhoneNumber(formData.phone));
        
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
            email: formData.email,
            phone: unformatPhoneNumber(formData.phone)
        };

        updateBusiness(business.id, dataToSubmit);
    };

    if(!formData) {
        return (<Typography>loading</Typography>);
    };

    return (
        <>
            <CardHeader 
                avatar={<ContactsOutlinedIcon />} 
                action={<IconButton onClick={handleOpenModal}><EditOutlinedIcon /></IconButton>}
                title='Dane kontaktowe' 
                subheader='Zarządzaj danymi: email i telefon' 
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
                <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth='xs'>
                    <DialogTitle>Dane kontaktowe</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} pt={1}>
                            <TextField
                                label='Email'
                                name='email'
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                variant='outlined'
                                fullWidth
                            />
                            <TextField
                                label='Telefon'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                error={Boolean(errors.street)}
                                helperText={errors.street}
                                variant='outlined'
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

export default ContactCard;