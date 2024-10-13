import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { useBusiness } from './BusinessContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const { refreshAccessToken } = useAuth();
    const { showNotification } = useNotification();
    const { setBusiness } = useBusiness();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [employees, setEmployees] = useState(null);

    const addEmployee = async (businessId, addEmployeeDto) => {
        const url = `${apiUrl}/businesses/${businessId}/employees`;

        try {
            console.log('Adding employee to business...');
            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: JSON.stringify(addEmployeeDto)
            }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Employee added successfully.');
            await fetchBusinessEmployees(businessId);
        } catch (error) {
            showNotification('Nie udało się dodać pracownika', error.message, 'error');
        }
    };

    const fetchBusinessEmployees = async (businessId) => {
        const url = `${apiUrl}/businesses/${businessId}/employees`;

        try {
            console.log('Fetching business employees...');

            const data = await sendRequest(url);

            console.log('Employee successfully fetched.');
            setEmployees(data);
        } catch (error) {
            showNotification('Nie udało się załadować dane pracowników', error.message, 'error');
        }
    };

    const updateEmployee = async (businessId, employeeId, updateEmployeeDto) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}`;

        try {
            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateEmployeeDto)
            }, refreshAccessToken);

            showNotification('Dane pracownika zaktualizowane', response.message, 'success');
            console.log('Employee successfully added.');
        } catch (error) {
            showNotification('Nie udało się zaktualizować dane pracownika', error.message, 'error');
        }
    };

    const deleteEmployee = async (businessId, employeeId) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}`;

        try {
            const response = await sendRequestWithToken(url, { method: 'DELETE' }, refreshAccessToken);

            showNotification('Udało się!', response.message, 'success');
            console.log('Employee deleted.');

            fetchBusinessEmployees(businessId);
        } catch (error) {
            showNotification('Nie udało się usunąć pracownika', error.message, 'error');
        }
    };

    const uploadEmployeeAvatar = async (businessId, employeeId, formData) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}/upload-avatar`;

        try {
            console.log('Uploading employee avatar...');
            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: formData
            }, refreshAccessToken);

            showNotification('Udało się', response.message, 'success');
            
            setBusiness((prevBusiness) => ({
                ...prevBusiness,
                employees: prevBusiness.employees.map(employee =>
                    employee.id === employeeId ? { ...employee, avatarUrl: response.avatarUrl } : employee
                )
            }));
        } catch (error) {
            showNotification('Nie udało się załadować awataru pracownika', error.message, 'error');
        }
    };

    const updateEmployeeWorkingHours = async (businessId, employeeId, updateWorkingHoursDto) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}/working-hours`;

        try {
            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateWorkingHoursDto)
            });

            showNotification('Udało się!', response.message, 'success');
            console.log('Updated employee working hours.');
        } catch (error) {
            showNotification('Nie udało się zaktualizować godzin pracy pracownika', error.message, 'error');
        }
    };

    const getEmployeeWorkingHours = async (businessId, employeeId) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}/working-hours`;

        try {
            const data = await sendRequestWithToken(url, {
                method: 'GET'
            }, refreshAccessToken);

            return data;
        } catch (error) {
            showNotification('Nie udało się załadować godzin pracy pracownika', error.message, 'error');
        }
    };

    return (
        <EmployeeContext.Provider value = {{ employees, addEmployee, fetchBusinessEmployees, updateEmployee, deleteEmployee, uploadEmployeeAvatar, updateEmployeeWorkingHours, getEmployeeWorkingHours }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export const useEmployee = () => useContext(EmployeeContext);