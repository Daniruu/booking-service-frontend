import React from 'react';
import EmployeeRow from '../EmployeeRow/EmployeeRow';
import './EmployeeList.css';

const EmployeeList = ({ employees, handleEmployeeClick }) => {
    return (
        <div className='employee-list'>
            {employees.map((employee, index) => (
                <EmployeeRow
                    key={index}
                    employeeName={employee.name}
                    employeeRole={employee.role}
                    onClick={() => handleEmployeeClick(employee)}
                />
            ))}
        </div>
    );
}

export default EmployeeList;