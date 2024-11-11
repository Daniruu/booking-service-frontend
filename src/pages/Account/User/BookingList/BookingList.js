import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../context/UserContext';
import { Box, Button, ButtonGroup, List, ListItem, Pagination, Tab, Tabs, Typography } from '@mui/material';
import BookingCard from '../BookingCard/BookingCard';
import { useBooking } from '../../../../context/BookingContext';

const BookingList = () => {
    const { userBookings, fetchUserBookings } = useBooking();
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchUserBookings();
    }, []);

    const getFilteredBookings = () => {
        switch (filter) {
            case 'upcoming':
                return userBookings?.filter(booking => booking.status === 'pending');
            case 'past':
                return userBookings?.filter(booking => booking.status === 'completed' || booking.status === 'cancelled');
            default:
                return userBookings;
        }
    };

    const filteredBookings = getFilteredBookings()?.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    const handleTabChange = (event, newValue) => {
        setFilter(newValue);
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedBookings = filteredBookings?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 600, width: '100%' }}>
            <Tabs 
                value={filter}
                onChange={handleTabChange}
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label='Wszystkie' value='all' sx={{ textTransform: 'none' }} />
                <Tab label='Nadchodzące' value='upcoming' sx={{ textTransform: 'none' }} />
                <Tab label='Zakończnone' value='past' sx={{ textTransform: 'none' }} />
            </Tabs>

            {paginatedBookings?.length > 0 ? (
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {paginatedBookings.map((booking, index) => (
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

            <Pagination
                count={Math.ceil((filteredBookings?.length || 0) / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 2, alignSelf: 'center' }}
            />
        </Box>
    );
};

export default BookingList;
