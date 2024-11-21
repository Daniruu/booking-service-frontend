import React, { useEffect } from 'react';
import { Avatar, Box, Divider, List, ListItem, Rating, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/pl';
import { useUser } from '../../../../context/UserContext';
dayjs.extend(localeData);
dayjs.locale('pl');

const UserReviewList = () => {
    const { reviews, fetchUserReviews } = useUser();
    const formattedDate = dayjs(reviews?.createdAt).format('D MMM YYYY');

    useEffect(() => {
        fetchUserReviews();
    })

    return (
        <Box>
            {reviews?.length > 0 ? (
                <List>
                    {reviews?.map((review) => (
                        <ListItem key={review.id} sx={{ p: 0 }}>
                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Avatar 
                                        src={review.businessImageUrl}
                                        alt={review.businessName}
                                        sx={{ height: 64, width: 64 }}
                                    />
                                    <Box>
                                        <Rating value={review.rating} readOnly />
                                        <Typography variant='body1' fontWeight={600}>{review.businessName}</Typography>
                                        <Typography variant='body2'>{formattedDate}</Typography>
                                    </Box>
                                </Box>
                                <Typography variant='body2' mb={2}>{review.comment}</Typography>
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body1' mt={2}>Nie zostawiłeś jeszcze żadnych opinii</Typography>
            )}
        </Box>
    );
};

export default UserReviewList;