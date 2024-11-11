import React, { useState } from 'react';
import { Button, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useBusiness, useBusinessAccount } from '../../../../context/BusinessAccountContext';
import { validateKrs, validateNIP, validateRegon } from '../../../../utils/validations';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

const RegistrationCard = () => {
    const { business, updateBusiness } = useBusinessAccount();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        nip: business?.nip || '',
        regon: business?.regon || '',
        krs: business?.krs || null,
    });
    const [errors, setErrors] = useState({
        nip: '',
        regon: '',
        krs: ''
    });

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({
            nip: business.nip,
            regon: business.regon,
            krs: business.krs
        });
        setErrors({
            nip: '',
            regon: '',
            krs: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = { ...errors };
        
        newErrors.nip = validateNIP(formData.nip);
        newErrors.regon = validateRegon(formData.regon);
        newErrors.krs = validateKrs(formData.krs);
        
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
            nip: formData.nip,
            regon: formData.regon,
            krs: formData.krs || null
        };

        updateBusiness(business.id, dataToSubmit)
    };

    if(!formData) {
        return (<Typography>loading</Typography>);
    };

    return (
        <>
            <CardHeader 
                avatar={<AccountBalanceOutlinedIcon />} 
                action={<IconButton onClick={handleOpenModal}><EditOutlinedIcon /></IconButton>}
                title='Dane rejestracyjne' 
                subheader='Zarządzaj danymi rejestracyjnymi firmy' 
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
                    <DialogTitle>Dane rejestracyjne firmy</DialogTitle>
                    <DialogContent>
                        <Stack spacing={3} pt={1}>
                            <TextField
                                label='NIP'
                                name='nip'
                                value={formData.nip}
                                onChange={handleChange}
                                error={Boolean(errors.nip)}
                                helperText={errors.nip}
                                variant='outlined'
                                fullWidth
                            />
                            <TextField
                                label='Regon'
                                name='regon'
                                value={formData.regon}
                                onChange={handleChange}
                                error={Boolean(errors.regon)}
                                helperText={errors.regon}
                                variant='outlined'
                                fullWidth
                            />
                            <TextField
                                label='KRS (opcjonalnie)'
                                name='krs"'
                                value={formData.krs}
                                onChange={handleChange}
                                error={Boolean(errors.krs)}
                                helperText={errors.krs}
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

export default RegistrationCard;