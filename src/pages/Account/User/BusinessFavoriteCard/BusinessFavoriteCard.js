import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BusinessFavoriteCard = ({ business }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/business/${business.id}`);
    }

    return (
        <Card sx={{ maxWidth: 320 }} elevation={2}>
            <CardActionArea onClick={handleCardClick}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={business.primaryImage.imageUrl}
                    title='Obraz przedsiębiorstwa'
                />
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