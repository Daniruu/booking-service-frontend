import React, { useEffect } from 'react';
import { useUser } from '../../../../context/UserContext';
import { Box, Grid, Grid2, Typography } from '@mui/material';
import BusinessFavoriteCard from '../BusinessFavoriteCard/BusinessFavoriteCard';

const FavoritesList = () => {
    const { favoriteBusinesses, fetchFavoriteBusinesses, loading } = useUser();

    useEffect(() => {
        fetchFavoriteBusinesses();
    }, []);

    if (loading) { 
        return <Typography>Loading...</Typography>
    };

    return (
        <Box>
            {favoriteBusinesses?.length > 0 ? (
                <Grid2 container spacing={3}>
                    {favoriteBusinesses?.map((business) => (
                        <BusinessFavoriteCard key={business.id} business={business} />
                    ))}
                </Grid2>
            ) : (
                <Typography variant='h6'>Nie dodałeś żadnej firmy do ulubionych</Typography>
            )}
            
        </Box>
    );
}

export default FavoritesList;