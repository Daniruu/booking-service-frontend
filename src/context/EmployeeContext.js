import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { sendRequest, sendRequestWithToken } from '../utils/api';
import { useBusinessAccount } from './BusinessAccountContext';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const { refreshAccessToken } = useAuth();
    const { showNotification } = useNotification();
    const { business } = useBusinessAccount();
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [employees, setEmployees] = useState(null);
    const [loading, setLoading] = useState(false);

    const addEmployee = async (addEmployeeDto, businessId = business.id) => {
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

    const fetchBusinessEmployees = async (businessId = business.id) => {
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

    const updateEmployee = async (employeeId, updateEmployeeDto, businessId = business.id) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}`;

        try {
            const response = await sendRequestWithToken(url, {
                method: 'PUT',
                body: JSON.stringify(updateEmployeeDto)
            }, refreshAccessToken);

            setEmployees(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === employeeId ? { 
                        ...employee,
                        name: updateEmployeeDto.name,
                        position: updateEmployeeDto.position,
                        email: updateEmployeeDto.email,
                        phone: updateEmployeeDto.phone
                    } : employee
                )
            );

            showNotification('Dane pracownika zaktualizowane', response.message, 'success');
            console.log('Employee successfully added.');
        } catch (error) {
            showNotification('Nie udało się zaktualizować dane pracownika', error.message, 'error');
        }
    };

    const deleteEmployee = async (employeeId, businessId = business.id) => {
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

    const uploadEmployeeAvatar = async (employeeId, formData, businessId = business.id) => {
        const url = `${apiUrl}/businesses/${businessId}/employees/${employeeId}/upload-avatar`;

        try {
            setLoading(true);
            console.log('Uploading employee avatar...');
            const response = await sendRequestWithToken(url, {
                method: 'POST',
                body: formData
            }, refreshAccessToken);

            showNotification('Udało się', response.message, 'success');
            
            setEmployees(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === employeeId ? { ...employee, avatarUrl: response.avatarUrl } : employee
                )
            );
        } catch (error) {
            showNotification('Nie udało się załadować awataru pracownika', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const updateEmployeeWorkingHours = async (employeeId, updateWorkingHoursDto, businessId = business.id) => {
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

    const getEmployeeWorkingHours = async (employeeId, businessId = business.id) => {
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
        <EmployeeContext.Provider value = {{ employees, loading, addEmployee, fetchBusinessEmployees, updateEmployee, deleteEmployee, uploadEmployeeAvatar, updateEmployeeWorkingHours, getEmployeeWorkingHours }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export const useEmployee = () => useContext(EmployeeContext);