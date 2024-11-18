import React, { useState } from 'react'
import { Box, Button, Rating, Stack, TextField, Typography } from '@mui/material'
import { useBusiness } from '../../../context/BusinessContext';

const AddReviewForm = ({ businessId }) => {
    const { addReview, loading } = useBusiness();
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        addReview(businessId, {
            rating: rating,
            comment: comment
        });
        
        setRating(null);
        setComment('');
    };

    return (
        <Box>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <Box>
                    <Typography variant='h5' gutterBottom align='center'>Jak oceniasz usługi tej firmy?</Typography>
                    <Typography variant='body2' align='center'>Dodaj swoją opinię o tym biznesie, aby pomóc innym użytkownikom w wyborze!</Typography>
                </Box>
                <Rating
                    value={rating}
                    onChange={(evetn, newValue) => {setRating(newValue)}}
                    size='large'
                />
                <TextField 
                    fullWidth
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Dodaj komentarz'
                    rows={3}
                />
                <Button 
                    variant='contained' 
                    sx={{ textTransform: 'none' }}
                    disabled={!(rating && comment) || loading}
                    onClick={handleSubmit}
                    fullWidth
                >
                    Dodaj opinie
                </Button>
            </Stack>
        </Box>
    );
}

export default AddReviewForm;