import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import LoginForm from './LoginForm';
import './LoginPage.css';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    },[user]);

    return (
        <PageLayout>
            <div className='login-page'>
                <LoginForm />
            </div>
        </PageLayout>
    );
};

export default LoginPage;