import React, { useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CardMedia, Chip, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Skeleton, Stack, Switch, TextField, Typography } from '@mui/material';
import { useBusiness, useBusinessAccount } from '../../../../context/BusinessAccountContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddressCard from '../AddressCard/AddressCard';
import RegistrationCard from '../RegistrationCard/RegistrationCard';
import ContactCard from '../ContactCard/ContactCard';
import ExpandMoreButton from '../../../../components/buttons/ExpandMoreButton/ExpandMoreButton';
import { validateTextField } from '../../../../utils/validations';
import CloseIcon from '@mui/icons-material/Close';
import categories from '../../../../data/BusinessCategories.json';

const BusinessDetailsCard = () => {
    const { business, images, updateBusiness, loading, fetchBusiness, togglePublish } = useBusinessAccount();
    const [expanded, setExpanded] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: business?.name || '',
        category: business?.category || '',
        description: business?.description || '',
    });
    const [errors, setErrors] = useState({
        name: '',
        category: '',
        description: '',
    });

    const handleToggle = () => {
        if (business) {
            togglePublish(business.id);
            fetchBusiness();
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({
            name: business.name,
            category: business.category,
            description: business.description
        });
        setErrors({
            name: '',
            category: '',
            description: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (event, newValue) => {
        setFormData({
            ...formData,
            category: newValue ? newValue.name : ''
        });
    };

    const validate = () => {
        let newErrors = { ...errors };
        
        newErrors.name = validateTextField(formData.name);
        newErrors.category = validateTextField(formData.category);
        newErrors.description = validateTextField(formData.description);
        
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);
        
        return !hasErrors;
    };

    const handleSubmit = () => {
        if (!validate()) {
            return;
        }

        const dataToSubmit = {
            ...business,
            name: formData.name,
            category: formData.category,
            description: formData.description
        };

        updateBusiness(business.id, dataToSubmit)
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader
                avatar={<InfoOutlinedIcon />}
                title='Informacje o firmie'
                subheader='Zarządzaj danymi przedsiębiorstwa'
                action={<ExpandMoreButton expand={expanded} onClick={handleExpandClick}/>}
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

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                {images?.length > 0 && (
                    <CardMedia 
                        sx={{ 
                            height: 240, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            boxShadow: '0 0 30px rgba(0,0,0, 0.8) inset'
                        }} 
                        image={images.find(image => image.isPrimary)?.imageUrl || images[0].imageUrl}
                    />
                )}

                <CardContent>
                    <Stack direction='column'>
                        <CardHeader
                            title={
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography variant="h5">{business.name}</Typography>
                                    <Chip 
                                        size='small' 
                                        color={business.isPublished ? 'success' : 'error'} 
                                        variant='outlined' 
                                        label={business.isPublished ? 'Opublikowano' : 'Niepublikowany'} 
                                        sx={{ fontSize: 12 }}
                                    />
                                </Stack>
                            }
                            subheader={business.category}
                            action={
                                <Stack direction='row' spacing={2}>
                                    <Switch 
                                        checked={business?.isPublished}
                                        onChange={handleToggle}
                                        disabled={loading}
                                    />
                                    <Button onClick={handleOpenModal}>Zmień dane</Button>
                                </Stack>
                            }
                        />
                        <Box px={2} mb={1} >
                            <Typography variant='body1' gutterBottom>Opis przedsiębiorstwa</Typography>
                            <Typography variant='body2' sx={{ color: 'text.secondary' }}>{business.description}</Typography>
                        </Box>
                    </Stack>
                </CardContent>

                <Divider />
                <ContactCard />
                <AddressCard />
                <RegistrationCard />
            </Collapse>
            {openModal && (
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Dane podstawowe firmy</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ minWidth: 480 }}>
                        <Stack spacing={3}>
                            <TextField
                                label='Nazwa'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                fullWidth
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
                                label='Opis'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                error={Boolean(errors.description)}
                                helperText={errors.description}
                                fullWidth
                                multiline
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
        </Card>
    );
}

export default BusinessDetailsCard;