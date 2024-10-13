import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Box, Typography, CardActionArea, List, ListItem, ListItemText, Button, Skeleton } from '@mui/material';

const BusinessCard = ({ business, loading }) => {
    const navigate = useNavigate();

    const servicesToDisplay = business?.featuredServices.slice(0, 3);

    const handleCardClick = () => {
        navigate(`/business/${business.id}`);
    }

    if (loading) {
        if (loading) {
            return (
                <Card sx={{ display: 'flex', marginBottom: 2 }}>
                    <Skeleton animation='wave' variant="rectangular" width={300} height='auto' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: 2 }}>
                        <Skeleton animation='wave' variant="text" sx={{ fontSize: '2rem', marginBottom: 0 }} />
                        <Skeleton animation='wave' variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} />
                        <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}>
                            <Skeleton animation='wave' variant="rounded" width={250} height='2rem' />
                            <Skeleton animation='wave' variant="rounded" width={60} height='2rem' />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1}}>
                            <Skeleton animation='wave' variant="rounded" width={250} height='2rem' />
                            <Skeleton animation='wave' variant="rounded" width={60} height='2rem' />
                        </Box>
                    </Box>
                </Card>
            );
        }
    }

    return (
        <Card sx={{ display: 'flex', marginBottom: 2,  minWidth: 800 }} elevation={2}>
            <CardActionArea onClick={handleCardClick} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <CardMedia
                    component='img'
                    sx={{ width: 300, height: '100%' }}
                    image={business.primaryImage?.imageUrl}
                    alt='Business image'
                />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent >
                        <Typography variant='h5' sx={{ color: 'text.primary' }}>
                            {business.name}
                        </Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            {business.address.street} {business.address.buildingNumber} {business.address.roomNumber && <span>/{business.address.roomNumber}</span>}, 
                            {business.address.city}, {business.address.postalCode}
                        </Typography>

                        <Box sx={{ flexGrow: 1, marginTop: 1 }}>
                            {servicesToDisplay?.length > 0 ? (
                                <List sx={{ padding: '0' }}>
                                    {servicesToDisplay.map((service, index) => (
                                        <ListItem key={index} sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
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
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Box mt={2}>
                                    <Typography variant='body1'>Brak wyróżnionych usług</Typography>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    );
}

export default BusinessCard;