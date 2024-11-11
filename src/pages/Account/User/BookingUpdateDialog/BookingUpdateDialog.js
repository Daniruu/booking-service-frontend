import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useBooking } from '../../../../context/BookingContext';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { formatFullDate, formatTime } from '../../../../utils/formatDate';
import TimeSlotSlider from '../../../../components/content/TimeSlotSlider/TimeSlotSlider';

const BookingUpdateDialog = ({ open, onClose, booking }) => {
    const { updateBooking } = useBooking();
    const [selectedDate, setSelectedDate] = useState(dayjs(booking.dateTime));
    const [selectedSlot, setSelectedSlot] = useState(null);
    dayjs.locale('pl');

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleUpdateBooking = () => {
        updateBooking(booking.id, { dateTime: selectedSlot });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Box sx={{ mt: 3, mx: 3 }}>
                    <Typography variant='h6'>{formatFullDate(selectedDate)} - {formatTime(booking.dateTime)}</Typography>
                
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pl'>
                        <Box>
                            <DateCalendar 
                                value={selectedDate}
                                onChange={(mewValue) => setSelectedDate(mewValue)}
                                minDate={dayjs()}
                                disablePast
                                sx={{
                                    '& .MuiDayCalendar-weekContainer': {
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        width: '100%',
                                        margin: 0
                                    },
                                    '& .MuiPickersDay-dayWithMargin': {
                                        width: 'calc(100% - 4px)',
                                        height: 'calc(100% - 4px)',
                                        aspectRatio: '1',
                                        fontSize: '1.0em',
                                    },
                                    '& .MuiPickersDay-root': {
                                        fontSize: '1em',
                                        marginX: '10px'
                                    },
                                    '& .MuiTypography-root': {
                                        fontSize: '1em',
                                        marginX: '10px'
                                    },
                                    '& .MuiPickersCalendarHeader-root': {
                                        paddingLeft: '0'
                                    },
                        
                                    width: '100%',
                                    maxHeight: '100%'
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>
                <Box maxWidth={'100%'}>
                    <Typography mx={3}>Wybierz godzinę</Typography>
                    <TimeSlotSlider 
                        serviceId={booking.serviceId} 
                        selectedDate={selectedDate} 
                        selectedSlot={selectedSlot}
                        onSlotClick={handleSlotClick}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='contained' 
                    onClick={handleUpdateBooking} 
                    disabled={!selectedSlot}
                    sx={{ textTransform: 'none' }} 
                    fullWidth
                >
                    Zapisz zmiany
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookingUpdateDialog;