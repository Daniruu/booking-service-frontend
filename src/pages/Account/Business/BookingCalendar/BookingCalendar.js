import React, { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Divider, duration, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';
import { useEmployee } from '../../../../context/EmployeeContext';
import { useBooking } from '../../../../context/BookingContext';
import { useBusinessAccount } from '../../../../context/BusinessAccountContext';
import BookingCalendarDatePicker from '../BookingCalendarDatePicker/BookingCalendarDatePicker';
import BookingCard from '../BookingCard/BookingCard';

dayjs.extend(utc);
dayjs.extend(timezone);

const BookingCalendar = () => {
    const { business } = useBusinessAccount();
    const { employees } = useEmployee();
    const { businessBookings, fetchBusinessBookings, loading } = useBooking();
    const [selectedDate, setSelectedDate] = useState(dayjs());

    useEffect(() => {
        if (business) {
            fetchBusinessBookings(business.id);
        }
    }, [business]);

    const timeIntervals = Array.from({ length: 24 * 4}, (_, i) => {
        const time = dayjs().startOf('day').add(i * 15, 'minute');
        return {
            fullTime: time.format('HH:mm'),
            displayTime: time.minute() === 0 ? time.format('HH:mm') : time.format('mm'),
            isHourStart: time.minute() === 0,
            time: time
        };
    });

    const getBookingForDateTimeAndEmployee = (time, employeeId) => {
        const dateTimeToCompare = selectedDate.set('hour', time.hour()).set('minute', time.minute()).startOf('minute').utc();
        
        return businessBookings?.find(
            (booking) =>
                dayjs(booking.startTime).utc().startOf('minute').isSame(dateTimeToCompare) &&
                booking.employeeId === employeeId
        );
    };

    const occupitedIntervals = employees.reduce((acc, employee) => {
        acc[employee.id] = new Set();
        return acc;
    }, {});

    if (loading) {
        return(
            <Typography>Loading...</Typography>
        );
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <BookingCalendarDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <Paper sx={{ width: '100%', bgcolor: 'transparent' }} elevation={0}>
                <TableContainer sx={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', px: 1 }}>
                    <Table stickyHeader size="small" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        position: 'sticky',
                                        left: 0,
                                        border: 'none',
                                        bgcolor: 'var(--background-color)',
                                        width: 40,
                                    }}
                                ></TableCell>
                                {employees?.map((employee) => (
                                    <TableCell
                                        key={employee.id}
                                        sx={{
                                            border: 'none',
                                            bgcolor: 'var(--background-color)',
                                            width: `calc((100% - 36px) / ${employees.length})`, // Динамическая ширина
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <Stack direction="row" alignItems="start" spacing={1}>
                                            <Avatar alt={employee.name} src={employee.avatarUrl} />
                                            <Box>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={500}
                                                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                >
                                                    {employee.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="#bbb"
                                                    sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                                >
                                                    {employee.position}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <Box py={2} />
                        <TableBody>
                            {timeIntervals.map((time, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 1,
                                            border: 'none',
                                            bgcolor: 'var(--background-color)',
                                            width: 40,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: 5,
                                                color: 'text.secondary',
                                                fontSize: 12,
                                                display: time.isHourStart ? 'block' : 'none',
                                            }}
                                        >
                                            {time.displayTime}
                                        </Typography>
                                    </TableCell>
                                    {employees?.map((employee) => {
                                        if (occupitedIntervals[employee.id].has(time.time.unix())) {
                                            return null;
                                        }

                                        const booking = getBookingForDateTimeAndEmployee(time.time, employee.id);

                                        if (booking) {
                                            const rowSpan = Math.ceil(booking.serviceDuration / 15);

                                            for (let i = 0; i < rowSpan; i++) {
                                                occupitedIntervals[employee.id].add(
                                                    time.time.add(i * 15, 'minute').unix()
                                                );
                                            }

                                            return (
                                                <TableCell
                                                    key={employee.id}
                                                    rowSpan={rowSpan}
                                                    sx={{
                                                        borderTop: time.isHourStart ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                                                        borderBottom: 'none',
                                                        verticalAlign: 'top',
                                                        px: 0.2,
                                                        py: '4px',
                                                        height: rowSpan * 15,
                                                    }}
                                                >
                                                    {booking && <BookingCard booking={booking} />}
                                                </TableCell>
                                            );
                                        }

                                        return (
                                            <TableCell
                                                key={employee.id}
                                                sx={{
                                                    borderTop: time.isHourStart ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                                                    height: 15,
                                                    borderBottom: 'none',
                                                }}
                                            />
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Paper>
        </Stack>
    );
};

export default BookingCalendar;