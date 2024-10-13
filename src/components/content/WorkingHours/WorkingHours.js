import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';

const WEEK_DAYS_EN_TO_PL = {
    'Monday': 'Poniedziałek',
    'Tuesday': 'Wtorek',
    'Wednesday': 'Środa',
    'Thursday': 'Czwartek',
    'Friday': 'Piątek',
    'Saturday': 'Sobota',
    'Sunday': 'Niedziela'
};

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const formatTime = (time) => {
    return time ? time.slice(0, 5) : '';
};

const formatWorkingHours = (start, end) => {
    return start && end ? `${formatTime(start)} - ${formatTime(end)}` : 'Dzień wolny';
};

const WorkingHours = ({ workingHours }) => {
    const workingHoursMap = workingHours.reduce((acc, item) => {
        acc[item.dayOfWeek] = item;
        return acc;
    }, {});

    const formattedDays = WEEK_DAYS.map((day) => ({
        day,
        hours: workingHoursMap[day] || null
    }));

    return (
        <Box>
            <List>
                {formattedDays.map((dayItem, index) => (
                    <ListItem key={index} sx={{ padding: '0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="body" color='text.secondary'>
                                {WEEK_DAYS_EN_TO_PL[dayItem.day]}
                            </Typography>
                            <Typography variant="body" sx={{ textAlign: 'right' }} color='text.secondary'>
                                {dayItem.hours ? formatWorkingHours(dayItem.hours.start, dayItem.hours.end) : 'Dzień wolny'}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default WorkingHours;
