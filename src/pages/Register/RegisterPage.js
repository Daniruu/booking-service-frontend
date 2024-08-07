import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import RegisterForm from './RegisterForm';
import './RegisterPage.css';

const RegisterPage = () => {
    return (
        <PageLayout>
            <div className='register-page'>
                <RegisterForm />
            </div>
        </PageLayout>
    );
};

export default RegisterPage;