import React from 'react';
import './EmployeeRow.css';

const EmployeeRow = ({ employeeName, employeeRole, onClick }) => {
    return (
        <div className='employee-row' onClick={onClick}>
            {employeeName} <span>({employeeRole})</span>
        </div>
    );
}

export default EmployeeRow;