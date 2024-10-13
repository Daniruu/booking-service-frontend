import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (header, message, type = 'success') => {
        setNotification({ header, message, type });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification, closeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);