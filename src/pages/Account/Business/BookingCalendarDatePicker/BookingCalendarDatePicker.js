import React, { useState } from 'react';
import { Box, Button, IconButton, Popover, Stack, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { formatFullDate } from '../../../../utils/formatDate';
import { DateCalendar, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EventIcon from '@mui/icons-material/Event';

const BookingCalendarDatePicker = ({ selectedDate, setSelectedDate }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenCalendar = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseCalendar = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Stack direction='row' alignItems='center' spacing={1} px={2}>
            
            <Button 
                variant='outlined' 
                onClick={() => setSelectedDate(dayjs())}
                sx={{ textTransform: 'none', color: 'text.secondary', borderColor: '#ccc', fontWeight: 600 }}
                color='inherit'
                size='small'
            >
                Dzisiaj
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <IconButton onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))} size='small'>
                    <NavigateBeforeIcon />
                </IconButton>
                <IconButton onClick={() => setSelectedDate(selectedDate.add(1, 'day'))} size='small'>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
            <Typography variant='h6'>{selectedDate.format('DD MMMM YYYY')}</Typography>
            <IconButton onClick={handleOpenCalendar}>
                <EventIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseCalendar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pl'>
                    <DateCalendar value={selectedDate} onChange={(newValue) => {setSelectedDate(newValue); handleCloseCalendar()}} />
                </LocalizationProvider>
            </Popover>
        </Stack>
    );
};

export default BookingCalendarDatePicker;