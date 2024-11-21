import React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BusinessFavoriteCard = ({ business }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/business/${business.id}`);
    }

    return (
        <Card sx={{ maxWidth: 320 }} elevation={2}>
            <CardActionArea onClick={handleCardClick}>
                <Box sx={{ position: 'relative', height: 140 }}>
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
                        sx={{ height: 140 }}
                        image={business.primaryImage.imageUrl}
                        title='Obraz przedsiębiorstwa'
                    />
                </Box>
                
                <CardContent>
                    <Typography gutterBottom variant='h6' noWrap>
                        {business.name}sdfasdfadfd
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {business?.address.street} {business?.address.buildingNumber}
                        {business?.address.roomNumber ? `/${business?.address.roomNumber},` : ', '}
                        {business?.address.postalCode} {business?.address.city}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default BusinessFavoriteCard;