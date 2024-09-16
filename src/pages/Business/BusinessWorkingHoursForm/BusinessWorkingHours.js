import React, { useState } from 'react';
import WorkingDayRow from '../WorkingDayRow/WorkingDayRow';
import './BusinessWorkingHours.css';

const WorkingHoursForm = ({ weeklyWorkingHours, onAdd, onSave, onDelete }) => {
    const [editDay, setEditDay] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleEditClick = (day) => {
        setEditDay(day);
        const workingDay = weeklyWorkingHours.find(dayItem => dayItem.day === day);
        if (workingDay) {
            setStartTime(workingDay.startTime);
            setEndTime(workingDay.endTime);
        } else {
            setStartTime('');
            setEndTime('');
        }
    };

    const handleSave = () => {
        const workingDay = weeklyWorkingHours.find(dayItem => dayItem.day === editDay);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const newWorkingDay = {
            day: editDay,
            startTime: startTime,
            endTime: endTime,
            timeZone: timeZone
        };

        if (workingDay) {
            onSave(newWorkingDay);
        } else {
            onAdd(newWorkingDay);
        }
        setEditDay(null);
    };

    const handleDelete = (day) => {
        const workingDay = weeklyWorkingHours.find(dayItem => dayItem.day === day);
        if (workingDay) {
            onDelete(workingDay.id);
            setEditDay(null);
        }
    };

    const getWorkingHours = (day) => {
        const workingDay = weeklyWorkingHours.find(dayItem => dayItem.day === day);
        return workingDay ? `${workingDay.startTime} - ${workingDay.endTime}` : 'Dzień wolny';
    };

    const dayNames = [
        "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"
    ];

    return (
        <div className='working-hours-form'>
            <h3>Godziny pracy</h3>

            {dayNames.map((dayName, index) => (
                <WorkingDayRow
                    key={index}
                    day={index + 1}
                    dayName={dayName}
                    startTime={startTime}
                    endTime={endTime}
                    isEdit={editDay === (index + 1)}
                    onEditClick={() => handleEditClick(index + 1)}
                    onDeleteClick={() => handleDelete(index + 1)}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                    onSave={handleSave}
                    onStopEditing={() => setEditDay(null)}
                    getWorkingHours={getWorkingHours}
                />
            ))}
        </div>
    );
};

export default WorkingHoursForm;
