import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import PageLayout from '../../../components/layout/PageLayout';
import Sidebar from '../../../components/layout/Sidebar';
import UserSidebar from '../UserSidebar/UserSidebar';
import UserReservationList from '../UserReservationList/UserReservationList';
import ReservationModal from '../../../components/modals/ReservitionModal/ReservationModal';
import './UserPage.css';

const UserPage = () => {
    const { user, refreshAccessToken } = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState('Data');
    const [businessExists, setBusinessExists] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            checkBusinessExists();
            getUserReservations();
        }
    }, [user]);

    const checkBusinessExists = async () => {
        const url = 'https://localhost:7217/business/exists';
        const token = localStorage.getItem('accessToken');
    
        try {
            setLoading(true);
            console.log('Verification of business existence');
    
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.ok) {
                const json = await response.json();
                setBusinessExists(json.exists);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
    
                const retryResponse = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                });
    
                if (retryResponse.ok) {
                    const json = await retryResponse.json();
                    setBusinessExists(json.exists);
                } else {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Business Validation Error', error);
        } finally {
            setLoading(false);
        }
    };

    const getUserReservations = async () => {
        const token = localStorage.getItem('accessToken');

        try {
            setLoading(true);
            console.log('Sending get reservations request...');
            const response = await fetch('https://localhost:7217/reservation', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            })

            if (response.ok) {
                const json = await response.json();
                setReservations(json);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
                
                const retryResponse = await fetch('https://localhost:7217/reservation', {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${newToken}`}
                })

                if (retryResponse.ok) {
                    const json = await retryResponse.json();
                    setReservations(json);
                } else {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteReservation = async (reservationId) => {
        const token = localStorage.getItem('accessToken');

        const url = `https://localhost:7217/reservation/${reservationId}`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Usługa została pomyślnie usunięta');
                await getUserReservations();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
                const retryResponse = await fetch(url, {
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (retryResponse.ok) {
                    alert('Usługa została pomyślnie usunięta');
                    await getUserReservations();
                } else {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReservationClick = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderContent = (option) => {
        switch (option) {
            case 'Data':
                return <h2>Dane personalne</h2>
            case 'Reservations':
                return (
                    <div className='reservations-container'>
                        <h2>Rezerwacje</h2>
                        <UserReservationList reservations={reservations} onReservationClick={handleReservationClick}/>
                    </div>
                );
            case 'Favourite':
                return <h2>Ulubione</h2>
            default:
                return <h2>Dane personalne</h2>
        }
    }

    return (
        <PageLayout>
            <div className='user-page'>
                <Sidebar>
                    <UserSidebar 
                        selectedOption={selectedOption} 
                        setSelectedOption={setSelectedOption}
                        businessExists={businessExists}
                        />
                </Sidebar>

                <div className='main-content'>
                    {renderContent(selectedOption)}
                </div>

                {isModalOpen && selectedReservation && (
                    <ReservationModal 
                        reservation={selectedReservation}
                        isOpen={isModalOpen} 
                        onClose={closeModal} 
                        onDelete={deleteReservation}
                    />
                )}
            </div>
        </PageLayout>
    );
};

export default UserPage;