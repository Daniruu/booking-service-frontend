import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import PrimaryButton from '../../buttons/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton/SecondaryButton';
import './WorkingHours.css';

const daysOfWeek = [
    { label: 'Poniedziałek', value: 1 },
    { label: 'Wtorek', value: 2 },
    { label: 'Środa', value: 3 },
    { label: 'Czwartek', value: 4 },
    { label: 'Piątek', value: 5 },
    { label: 'Sobota', value: 6 },
    { label: 'Niedziela', value: 7 },
];

const WorkingHours = ({ businessId }) => {
    const { refreshAccessToken } = useContext(AuthContext);
    const [workingHours, setWorkingHours] = useState([]);
    const [editingDay, setEditingDay] = useState(null);
    const [newHours, setNewHours] = useState({ startTime: '', endTime: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (businessId) {
            fetchWorkingHours();
        }
    }, [businessId]);

    const fetchWorkingHours = async () => {
        const url = `https://localhost:7217/WorkingHours/${businessId}`;

        try {
            setLoading(true);
            console.log('Fetching working hours...');
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const json = await response.json();
                setWorkingHours(json);
            } else {
                console.error('Failed to fetch working hours');
            }
        } catch (error) {
            console.error('Error fetching working hours:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (day) => {
        const hours = workingHours.find(d => d.day === day.value);
        setNewHours({
            startTime: hours ? hours.startTime : '',
            endTime: hours ? hours.endTime : ''
        });
        setEditingDay(day.value);
    };

    const handleSave = async () => {
        const existingWorkingHours = workingHours.find(wh => wh.day === editingDay);
        const method = existingWorkingHours ? 'PUT' : 'POST';
        const url = `https://localhost:7217/WorkingHours/${businessId}`;
    
        const updateHours = {
            id: existingWorkingHours ? existingWorkingHours.id : 0, // передаем id, если оно есть
            day: editingDay,
            startTime: newHours.startTime || null,
            endTime: newHours.endTime || null
        };
    
        try {
            setLoading(true);
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updateHours)
            });
    
            if (response.ok) {
                if (method === 'POST') {
                    setWorkingHours(prev => [...prev, updateHours]);
                } else {
                    setWorkingHours(prev => prev.map(d => d.id === existingWorkingHours.id ? { ...existingWorkingHours, ...updateHours } : d));
                }
                setEditingDay(null);
                setNewHours({ startTime: '', endTime: '' });
            } else {
                console.error("Failed to update working hours.");
            }
        } catch (error) {
            console.error("Error updating working hours:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSetClosed = () => {
        setNewHours({ startTime: null, endTime: null });
        handleSave();
    };

    return (
        <div className="working-hours">
            <h3>Godziny Pracy</h3>
            <ul>
                {daysOfWeek.map(day => {
                    const hours = workingHours.find(d => d.day === day.value);
                    return (
                        <li key={day.value} className="working-hours-item">
                            <div className="day-info">
                                <span>{day.label}</span>
                                {hours && hours.startTime && hours.endTime
                                    ? <span>{hours.startTime} - {hours.endTime}</span>
                                    : <span>Dzień wolny</span>
                                }
                            </div>
                            <div className="day-actions">
                                {editingDay === day.value ? (
                                    <>
                                        <input
                                            type="time"
                                            value={newHours.startTime || ''}
                                            onChange={(e) => setNewHours({ ...newHours, startTime: e.target.value })}
                                        />
                                        <input
                                            type="time"
                                            value={newHours.endTime || ''}
                                            onChange={(e) => setNewHours({ ...newHours, endTime: e.target.value })}
                                        />
                                        <PrimaryButton onClick={handleSave} disabled={loading}>
                                            Zapisz
                                        </PrimaryButton>
                                        <SecondaryButton onClick={handleSetClosed} disabled={loading}>
                                            Anuluj
                                        </SecondaryButton>
                                    </>
                                ) : (
                                    <SecondaryButton onClick={() => handleEdit(day)}>
                                        {hours ? 'Edit' : 'Add'}
                                    </SecondaryButton>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default WorkingHours;
