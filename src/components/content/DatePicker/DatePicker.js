import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateChange, className = '' }) => {
    const months = [
        "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", 
        "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];

    const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const handleMonthChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };

    const handleDateClick = (day) => {
        const date = new Date(currentYear, currentMonth, day);

        const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
        if (selectedDate < todayDate) {
            return;
        }
        onDateChange(date);
    };

    const formatDate = (date) => {
        const formattedDate = date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`;
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentYear, currentMonth);

        const startPadding = (firstDayOfMonth + 6) % 7;

        for (let i = 0; i < startPadding; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isSelected = selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;
            
            const isToday = today.getDate() === day &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

            const isPastDay = new Date(currentYear, currentMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                
            days.push(
                <div
                    key={day}
                    className={`day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isPastDay ? 'past' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className={`date-picker ${className}`}>
            <div className="date-picker-header">
                <h2>{formatDate(selectedDate)}</h2>
            </div>

            <div className="month-select">
                <select value={currentMonth} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <div className="calendar">
                <div className="week-days">
                    {weekDays.map((day, index) => (
                        <div key={index} className="week-day">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-days">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
