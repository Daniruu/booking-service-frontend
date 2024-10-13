import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../context/UserContext';
import { Box, Button, ButtonGroup, List, ListItem, Typography } from '@mui/material';
import BookingCard from '../BookingCard/BookingCard';

const BookingList = () => {
    const { bookings, fetchUserBookings } = useUser();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchUserBookings();
    }, []);

    const getFilteredBookings = () => {
        switch (filter) {
            case 'upcoming':
                return bookings?.filter(booking => booking.status === 'pending');
            case 'past':
                return bookings?.filter(booking => booking.status === 'completed' || booking.status === 'cancelled');
            default:
                return bookings;
        }
    };

    const filteredBookings = getFilteredBookings()?.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 600, width: '100%' }}>
            <Typography variant='h5'>Lista rezerwacji</Typography>
            <ButtonGroup variant='outlined' sx={{ alignSelf: 'end', my: 2 }}>
                <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>Wszystkie</Button>
                <Button onClick={() => setFilter('upcoming')} variant={filter === 'upcoming' ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>Nadchodzące</Button>
                <Button onClick={() => setFilter('past')} variant={filter === 'past' ? 'contained' : 'outlined'} sx={{ textTransform: 'none' }}>Zakończone</Button>
            </ButtonGroup>

            {filteredBookings?.length > 0 ? (
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredBookings.map((booking, index) => (
                        <ListItem key={index} sx={{ padding: 0 }}>
                            <BookingCard booking={booking} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Brak rezerwacji.
                </Typography>
            )}
        </Box>
    );
};

export default BookingList;
