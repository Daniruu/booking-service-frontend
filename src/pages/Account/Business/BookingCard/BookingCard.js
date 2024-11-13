import React from 'react';
import { Card, Typography } from '@mui/material';
import { fomratDate, formatDate, formatDateTime, formatTime } from '../../../../utils/formatDate';
import dayjs from 'dayjs';

const BookingCard = ({ booking }) => {
    const startTime = dayjs(booking.dateTime);
    const endTime = startTime.add(booking.serviceDuration, 'minute');

    return (
        <Card elevation={1} sx={{ height: '100%', width: '100%', bgcolor: 'rgba(109, 185, 239, 0.4)', p: 0.5 }}>
            <Typography variant='body1' sx={{ fontSize: 14, fontWeight: '600', color: '#0F1035' }}>
                {startTime.format("HH:mm")} - {endTime.format("HH:mm")}
            </Typography>
            <Typography variant='body1' sx={{ fontSize: 14, color: '#0F1035' }}>
                {booking.serviceName}
            </Typography>
        </Card>
    );
};

export default BookingCard;