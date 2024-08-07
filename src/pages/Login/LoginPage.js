import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import LoginForm from './LoginForm';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <PageLayout>
            <div className='login-page'>
                <LoginForm />
            </div>
        </PageLayout>
    );
};

export default LoginPage;