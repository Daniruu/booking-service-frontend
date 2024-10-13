import React, { useEffect, useState } from 'react';
import { useBusiness } from '../../../../context/BusinessContext';
import { Box, Button, Card, CardContent, CardHeader, Collapse, Divider, List, ListItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ExpandMoreButton from '../../../../components/buttons/ExpandMoreButton/ExpandMoreButton';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

const daysOfWeek = [
    { dayOfWeek: 'Monday', label: 'Poniedziałek' },
    { dayOfWeek: 'Tuesday', label: 'Wtorek' },
    { dayOfWeek: 'Wednesday', label: 'Środa' },
    { dayOfWeek: 'Thursday', label: 'Czwartek' },
    { dayOfWeek: 'Friday', label: 'Piątek' },
    { dayOfWeek: 'Saturday', label: 'Sobota' },
    { dayOfWeek: 'Sunday', label: 'Niedziela' }
];

const WorkingHoursCard = () => {
    const { business, workingHours, fetchBusinessWorkingHours, updateBusinessWorkingHours } = useBusiness();
    const [transformedWorkingHours, setTransformedWorkingHours] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [globalSwitch, setGlobalSwitch] = useState(true);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        if (business) {
            fetchBusinessWorkingHours(business.id);
        }
    },[business]);

    useEffect(() => {
        if (workingHours) {
            const transformData = daysOfWeek.map((day) => {
                const foundDay = workingHours.find((entry) => entry.dayOfWeek === day.dayOfWeek);
                return {
                    ...day,
                    enabled: !!foundDay,
                    startTime: foundDay ? dayjs(`1970-01-01T${foundDay.start}`) : dayjs('1970-01-01T08:00:00'),
                    endTime: foundDay ? dayjs(`1970-01-01T${foundDay.end}`) : dayjs('1970-01-01T16:00:00')
                };
            });

            setTransformedWorkingHours(transformData);
            setGlobalSwitch(transformData.every((day) => day.enabled));     
        }
    }, [workingHours]);

    const handleGlobalSwitchChange = () => {
        const newGlobalSwitchState = !globalSwitch;
        setGlobalSwitch(newGlobalSwitchState);

        setTransformedWorkingHours((prevHours) =>
            prevHours.map((day) => ({
                ...day,
                enabled: newGlobalSwitchState
            }))
        );
        setIsEdited(true);
    };

    const handleSwitchChange = (dayName) => {
        setTransformedWorkingHours((prevHours) => {
            const updatedHours = prevHours.map((day) => day.dayOfWeek === dayName ? { ...day, enabled: !day.enabled } : day);
            setGlobalSwitch(updatedHours.every((day) => day.enabled));
            return updatedHours;
        });
        setIsEdited(true);
    };

    const handleTimeChange = (dayName, field, value) => {
        setTransformedWorkingHours((prevHours) =>  
            prevHours.map((day) =>
                day.dayOfWeek === dayName ? { ...day, [field]: value } : day
            )
        );
        setIsEdited(true);
    };

    const handleSave = async () => {
        const updateWorkingHoursDto = transformedWorkingHours.filter((day) => day.enabled).map((day) => ({
            dayOfWeek: day.dayOfWeek,
            start: day.startTime.format('HH:mm:ss'),
            end: day.endTime.format('HH:mm:ss')
        }));

        updateBusinessWorkingHours(business.id, updateWorkingHoursDto);
        setIsEdited(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pl'>
            <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
                <CardHeader 
                    avatar={<AccessTimeIcon />} 
                    action={<ExpandMoreButton expand={expanded} onClick={handleExpandClick}/>}
                    title='Godziny pracy' 
                    subheader='Kontroluj godziny pracy swojej firmy'  
                    sx={{ 
                        '& .MuiCardHeader-action': {
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            alignSelf: 'center'
                        }
                    }}
                />
                <Divider />
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Stack direction='column' spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant='h6'>Przełącznik</Typography>
                                    <Typography variant='body1' sx={{ color: 'text.secondary' }}>Szybkie włączanie i wyłączanie godzin pracy</Typography>
                                </Box>
                                <Switch checked={globalSwitch} onChange={handleGlobalSwitchChange} />
                            </Box>

                            <Divider variant='middle'/>
                            
                            <List>
                                {transformedWorkingHours?.map((day, index) => (
                                    <ListItem key={index} sx={{ px: 0, display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '200px' }}>
                                            <Switch checked={day.enabled} onChange={() => handleSwitchChange(day.dayOfWeek)} />
                                            <Typography variant='body1'>{day.label}</Typography>
                                        </Box>
                                        {day.enabled ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, maxWidth: 500 }}>
                                                    <TimePicker 
                                                        ampm={false}
                                                        label='Od'
                                                        value={day.startTime}
                                                        onChange={(newValue) => handleTimeChange(day.dayOfWeek, 'startTime', newValue)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        sx={{ flexGrow: 1 }}
                                                    />
                                                    <TimePicker 
                                                        clearable
                                                        ampm={false}
                                                        label='Do'
                                                        value={day.endTime}
                                                        onChange={(newValue) => handleTimeChange(day.dayOfWeek, 'endTime', newValue)}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        sx={{ flexGrow: 1 }}
                                                    />
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, bgcolor: '#f8fafb', height: '56px', borderRadius: 1, px: 2, maxWidth: 500 }}>
                                                <Typography variant='body1' sx={{ color: 'grey', display: 'flex', alignItems: 'center', gap: 1 }}><NightlightOutlinedIcon />Dzień wolny</Typography>
                                            </Box>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                            { isEdited && (
                                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
                                    <Button variant='contained' onClick={handleSave}>Zapisz zmiany</Button>
                                </Box>
                            )}
                        </Stack>
                    </CardContent>
                </Collapse>
            </Card>
        </LocalizationProvider>
    );
}

export default WorkingHoursCard;