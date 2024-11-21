import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Box, Typography, CardActionArea, List, ListItem, ListItemText, Chip } from '@mui/material';

const BusinessCard = ({ business }) => {
    const navigate = useNavigate();

    const servicesToDisplay = business?.featuredServices?.slice(0, 3);

    const handleCardClick = () => {
        navigate(`/business/${business.id}`);
    }

    return (
        <Card sx={{ display: 'flex', marginBottom: 2,  minWidth: 800 }} elevation={2}>
            <CardActionArea onClick={handleCardClick} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ position: 'relative', width: 300, height: '100%' }}>
                    {business.averageRating > 0 && (
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                top: 0, 
                                right: 0, 
                                bgcolor: 'rgba(0, 0, 0, 0.6)', 
                                color: '#fff', 
                                borderBottomLeftRadius: 6,
                                px: 2, 
                                py: 0.5, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}
                        >
                            <Typography variant='h6' fontWeight={600}>{business.averageRating.toFixed(1)}</Typography>
                            <Typography variant='body2' fontSize={12} noWrap>{business.reviewCount} opinii</Typography>
                        </Box>
                    )}
                    <CardMedia
                        component='img'
                        sx={{ width: 300, height: '100%' }}
                        image={business.primaryImage?.imageUrl}
                        alt='Business image'
                    />
                </Box>
                
                
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
                                    <Typography variant='body1' color='text.secondary'>Brak wyróżnionych usług</Typography>
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