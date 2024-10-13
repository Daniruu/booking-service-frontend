import React from 'react';
import { Card, CardContent, Typography, Box, Divider, IconButton, CardActions, Chip } from '@mui/material';
import { formatDayShort, formatTimeRange, formatWeekDayShort } from '../../../../utils/formatDate';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BookingCard = ({ booking }) => {

    const statusText = {
        completed: 'Zakończona',
        pending: 'Aktywna',
        cancelled: 'Odwołana'
    }

    const statusColor = {
        completed: 'default',
        pending: 'info',
        cancelled: 'error'
    };


    return (
        <Card elevation={2} sx={{ width: '100%', display: 'flex', cursor: 'pointer', transition: '0.3s',
            '&:hover': {
                boxShadow: 3,
                transform: 'scale(1.01)',
            }, }}>
            <CardContent sx={{ display: 'flex', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingRight: 3, paddingLeft: 1 }}>
                    <Typography>{formatWeekDayShort(booking.dateTime)}</Typography>
                    <Typography variant='h4'>{formatDayShort(booking.dateTime)}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box px={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Typography variant='body1' gutterBottom>
                        {booking.serviceName}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                        <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}}>
                            <AccessTimeIcon sx={{ mr: 1 }} /> {formatTimeRange(booking.dateTime, booking.duration)} ({booking.duration} min)
                        </Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}}>
                            <PersonIcon sx={{ mr: 1 }} /> {booking.employeeName}
                        </Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}}>
                            <AttachMoneyOutlinedIcon sx={{ mr: 1 }} /> {booking.price} zł
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip variant='outlined' label={statusText[booking.status]} color={statusColor[booking.status]} />
                </Box>
            </CardContent>
            <CardActions>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BookingCard;
