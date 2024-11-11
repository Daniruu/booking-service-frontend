import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useBooking } from '../../../../context/BookingContext';
import {  formatFullDate, formatTime } from '../../../../utils/formatDate';
import { Link } from 'react-router-dom';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatPhoneNumber } from '../../../../utils/formatPhone';
import BookingUpdateDialog from '../BookingUpdateDialog/BookingUpdateDialog';

const BookingDetailsDialog = ({ open, onClose, booking }) => {
    const { fetchBookingDetails, cancelBooking } = useBooking();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (open) {
            fetchBookingDetails(booking.id).then(setBookingDetails);
        }
    }, [open, booking]);

    const handleCancel = () => {
        cancelBooking(booking.id);
        onClose();
    };

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

    if (!bookingDetails) return null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box p={1}>
                        <Typography variant='body1' color='text.secondary'>Szczegóły rezerwacji</Typography>
                        <Typography variant='h6'>{formatFullDate(bookingDetails.dateTime)} - {formatTime(bookingDetails.dateTime)}</Typography>
                    </Box>
                    <Chip variant='outlined' label={statusText[booking.status]} color={statusColor[booking.status]} sx={{ marginLeft: 'auto' }} />
                </Box>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Box p={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                            <Typography variant='body1' fontWeight={500} noWrap>{bookingDetails.serviceName}</Typography>
                            <Typography variant='body1' fontWeight={500} sx={{ textWrap: 'nowrap' }}>{bookingDetails.price} zł</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                            <Typography variant='body1' noWrap>{bookingDetails.serviceDescription}</Typography>
                            <Typography variant='body1' sx={{ textWrap: 'nowrap' }}>{bookingDetails.duration} min</Typography>
                        </Box>
                    </Box>

                    <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
                        <AccordionSummary 
                            expandIcon={<ExpandMoreIcon />} 
                            sx={{
                                borderRadius: 2,
                                backgroundColor: '#f5f7fa',
                                '& .MuiAccordionSummary-content': { alignItems: 'center' },
                            }}>
                            <Typography variant='body1' fontWeight={500}>Dane przedsiębiorstwa</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0 }}>
                            <Table size='small'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                                                <StorefrontOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                                Firma
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <Link to={`/business/${bookingDetails.businessId}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                                                <Avatar variant='rounded' src={bookingDetails.businessImage.imageUrl}/>
                                                <Typography fontWeight={500} mx={2}>{bookingDetails.businessName}</Typography>
                                                <LaunchIcon fontSize='small' />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                                                <LocalPhoneOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                                Telefon
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} noWrap>{formatPhoneNumber(bookingDetails.businessPhone)}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                                                <EmailOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                                Email
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} noWrap>{bookingDetails.businessEmail}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                                                <PlaceOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                                Adres
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} noWrap>
                                                {bookingDetails?.businessAddress.street} {bookingDetails?.businessAddress.buildingNumber}
                                                {bookingDetails?.businessAddress.roomNumber ? `/${bookingDetails?.businessAddress.roomNumber},` : ', '}
                                                {bookingDetails?.businessAddress.city} {bookingDetails?.businessAddress.postalCode}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>
                                            <Typography fontWeight={500} color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                                                <PersonOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                                Pracownik
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ border: 0 }}>
                                            <Chip 
                                                avatar={<Avatar alt={bookingDetails.employeeName} src={bookingDetails.employeeAvatarUrl} />} 
                                                label={bookingDetails.employeeName}
                                                variant='outlined'
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center'}}>
                {bookingDetails.status === 'pending' && (
                    <>
                    <Button onClick={handleDialogOpen} sx={{ textTransform: 'none' }}>
                        Edytuj
                    </Button>
                    <Button onClick={handleCancel} color='error' sx={{ textTransform: 'none' }}>
                        Odwołaj rezerwacje
                    </Button>
                    </>
                )}
            </DialogActions>

            <BookingUpdateDialog open={dialogOpen} onClose={handleDialogClose} booking={bookingDetails}/>
        </Dialog>
    );
}

export default BookingDetailsDialog;