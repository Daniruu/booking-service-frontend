import React from 'react';
import './RegisterPage.css';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="wrap">
            <div className="page">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;