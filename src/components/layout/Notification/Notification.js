import React from 'react';
import { useNotification } from '../../../context/NotificationContext';
import { MdCheckCircle, MdError, MdInfo  } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './Notification.css';

const Notification = () => {
    const { notification, closeNotification } = useNotification();

    if (!notification) return null;

    return (
        <div className='notification'>
            <Alert severity={notification.type} onClose={() => closeNotification()}>
                <AlertTitle>{notification.header}</AlertTitle>
                {notification.message}
            </Alert>
        </div>
    );
};

export default Notification;