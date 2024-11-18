import React, { useEffect, useRef, useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { fomratDate, formatDate, formatDateTime, formatTime } from '../../../../utils/formatDate';
import dayjs from 'dayjs';

const BookingCard = ({ booking }) => {
    const startTime = dayjs(booking.dateTime);
    const endTime = startTime.add(booking.serviceDuration, 'minute');
    const [direction, setDirtection] = useState('column');
    const cardRef = useRef(null);

    useEffect(() => {
        const resizeObserve = new ResizeObserver(([entry]) => {
            if (entry) {
                const { height } = entry.contentRect;
                setDirtection(height > 50 ? 'column' : 'row' );
            }
        });

        if (cardRef.current) {
            resizeObserve.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                resizeObserve.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <Card ref={cardRef} elevation={3} sx={{ height: '100%', bgcolor: '#039be5', p: 0.5 }}>
            <Stack direction={direction} spacing={0.5}>
                <Typography variant='body1' noWrap sx={{ fontSize: 14, fontWeight: '600', color: '#FFF' }}>
                    {startTime.format("HH:mm")} - {endTime.format("HH:mm")}
                </Typography>
                <Typography variant='body1' noWrap sx={{ fontSize: 14, color: '#FFF' }}>
                    {booking.serviceName}
                </Typography>
            </Stack>
        </Card>
    );
};

export default BookingCard;