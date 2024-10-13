import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, IconButton, Box, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import TimeSlotSlider from '../../content/TimeSlotSlider/TimeSlotSlider';
import { formatFullDate, formatFullDateWithYear, formatTimeRange } from '../../../utils/formatDate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBooking } from '../../../context/BookingContext';

const BookingModal = ({ open, onClose, service, employee }) => {
    const { createBooking } = useBooking();
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [note, setNote] = useState('');

    dayjs.locale('pl');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleNextStep = () => {
        if (selectedSlot) {
            setStep(2);
        }
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const handleSubmitBooking = () => {
        if (service && selectedSlot) {
            const createBookingDto = ({
                serviceId: service.id,
                dateTime: selectedSlot
            });
            
            createBooking(createBookingDto);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'xs'} fullWidth>
            {step === 1 && (
                <Box sx={{ margin: 1 }}>
                    <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                    <DialogContent sx={{ padding: 0 }}>
                        <Box sx={{ mt: 3, mx: 3 }}>
                            <Typography variant='h6'>{formatFullDate(selectedDate)}</Typography>
                        
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
                                serviceId={service.id} 
                                selectedDate={selectedDate} 
                                selectedSlot={selectedSlot}
                                onSlotClick={handleSlotClick}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ padding: 1 }}>
                        <Button onClick={handleNextStep} variant='contained' size='large' fullWidth>
                            Dalej
                        </Button>
                    </DialogActions>
                </Box>
            )}

            {step === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1, flexGrow: 1, height: '100%' }}>
                <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <IconButton aria-label='back' onClick={handlePrevStep} >
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton aria-label='close' onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            
                <DialogContent sx={{ padding: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ my: 3, mx: 3 }}>
                        <Typography variant='h6'>{formatFullDateWithYear(selectedSlot)}</Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {formatTimeRange(selectedSlot, service.duration)} ({service.duration} min)
                        </Typography>
                    </Box>
            
                    <Box sx={{ my: 3, mx: 3 }}>
                        <Typography variant='h6'>{service.name}</Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>{service.description}</Typography>
                        <Typography variant='body2' color='text.secondary'>Pracownik: {employee.name}</Typography>
                    </Box>
            
                    <Box sx={{ my: 3, mx: 3 }}>
                        <TextField
                            label="Dodaj notatkę (opcjonalnie)"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={note}
                            onChange={handleNoteChange}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mt: 5 }}>
                            <Typography variant="body1">Łącznie do zapłaty</Typography>
                            <Typography variant="h6" sx={{ marginLeft: '16px' }}>{service.price.toFixed(2)} zł</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            
                <DialogActions sx={{ padding: 1 }}>
                    <Button onClick={handleSubmitBooking} variant='contained' size='large' fullWidth>Potwierdzam</Button>
                </DialogActions>
            </Box>
            
            )}
        </Dialog>
    );
}

export default BookingModal;