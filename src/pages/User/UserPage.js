import React from 'react';
import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Sidebar from '../../components/layout/Sidebar';
import UserSidebar from './UserSidebar';
import './UserPage.css';

const UserPage = () => {
    const [selectedOption, setSelectedOption] = useState('Data');

    const renderContent = (option) => {
        switch (option) {
            case 'Data':
                return <h3>Dane personalne</h3>
            case 'Reservations':
                return <h3>Wizyty</h3>
            case 'Favourite':
                return <h3>Ulubione</h3>
            default:
                return <h3>Dane personalne</h3>
        }
    }

    return (
        <PageLayout>
            <div className='user-page'>
                <Sidebar>
                    <UserSidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                </Sidebar>

                <div className='main-content'>
                    {renderContent(selectedOption)}
                </div>
            </div>
        </PageLayout>
    );
};

export default UserPage;