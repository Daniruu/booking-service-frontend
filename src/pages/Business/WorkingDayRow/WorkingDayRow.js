import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import './WorkingDayRow.css';

const WorkingDayRow = ({
    day,
    dayName,
    startTime,
    endTime,
    isEdit,
    onEditClick,
    onDeleteClick,
    onStartTimeChange,
    onEndTimeChange,
    onSave,
    onStopEditing,
    getWorkingHours
}) => {
    return (
        <div className='working-day-row'>
            {isEdit ? (
                <div className='working-day-content'>  
                    <p>{dayName}:</p>
                    <input
                        type='time'
                        value={startTime}
                        onChange={(e) => onStartTimeChange(e.target.value)}
                        
                    />
                    -
                    <input
                        type='time'
                        value={endTime}
                        onChange={(e) => onEndTimeChange(e.target.value)}
                    />
                </div>
            ) : (
                <p>{dayName}: {getWorkingHours(day)}</p>
            )}
            
            <div className='working-day-buttons'>
                {isEdit ? (
                    <>
                        <button className='edit-working-hours-button' onClick={onSave}>
                            <IoCheckmarkSharp />
                        </button>
                        <button className='edit-working-hours-button' onClick={onStopEditing}>
                            <IoClose />
                        </button>
                    </>
                ) : (
                    <>
                        <button className='edit-working-hours-button' onClick={onEditClick}>
                            <MdEdit />
                        </button>
                        <button className='delete-working-hours-button' onClick={onDeleteClick}>
                            <MdDelete />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default WorkingDayRow;
