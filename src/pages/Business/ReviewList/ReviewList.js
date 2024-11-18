import React from 'react';
import { Avatar, Box, Divider, List, ListItem, Rating, Stack, Typography } from '@mui/material';
import { useBusiness } from '../../../context/BusinessContext';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/pl';
dayjs.extend(localeData);
dayjs.locale('pl');

const ReviewList = () => {
    const { reviews } = useBusiness();
    const formattedDate = dayjs(reviews?.createdAt).format('D MMM YYYY');

    return (
        <Box>
            <Typography variant='h5' fontWeight={500}>Opinie</Typography>

            {reviews?.length > 0 ? (
                <List>
                    {reviews?.map((review) => (
                        <ListItem key={review.id} sx={{ p: 0 }}>
                            <Stack sx={{ width: '100%' }}>
                                <Divider />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', my: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Avatar 
                                            src={review.userAvatarUrl}
                                            alt={review.userName}
                                        />
                                        <Box>
                                            <Typography variant='body1' fontWeight={600}>{review.userName}</Typography>
                                            <Typography variant='body2'>{formattedDate}</Typography>
                                        </Box>
                                    </Box>
                                    <Rating value={review.rating} readOnly />
                                </Box>
                                <Typography variant='body2' mb={2}>{review.comment}</Typography>
                            </Stack>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body1' mt={2}>Ta firma nie ma jeszcze żadnych opinii</Typography>
            )}
        </Box>
    );
};

export default ReviewList;