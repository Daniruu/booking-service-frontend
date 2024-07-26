import React from 'react';
import './LoginPage.css';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="wrap">
            <div className="page">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;