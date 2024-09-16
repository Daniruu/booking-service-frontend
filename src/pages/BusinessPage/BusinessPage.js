import React, { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import { AiOutlineLike } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import BusinessServiceList from './BusinessServiceList/BusinessServiceList';
import './BusinessPage.css';
import PrimaryButton from '../../components/buttons/PrimaryButton/PrimaryButton';
import BookServiceModal from '../../components/modals/BookServiceModal/BookServiceModal';

const fetchBusinessDetails = async (businessId) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await fetch(`https://localhost:7217/business/${businessId}?timeZone=${encodeURIComponent(timeZone)}`);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return await response.json();
};

const BusinessPage = () => {
    const { user } = useContext(AuthContext);
    const { businessId } = useParams();
    const [searchParams] = useSearchParams();
    const serviceIdFromURL = searchParams.get('serviceId');
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const getBusinessDetails = async () => {
            try {
                setLoading(true);
                const json = await fetchBusinessDetails(businessId);
                setBusiness(json);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getBusinessDetails();
    }, [businessId]);

    useEffect(() => {
        if (business && serviceIdFromURL) {
            const service = business.services.find(service => service.id === Number(serviceIdFromURL));
            if (service) {
                openModal(service);
            }
        }
    }, [business, serviceIdFromURL]);

    const openModal = (service) => {
        if (!user) {
            navigate('/user');
        }

        const selectedEmployee = business.employees.find(employee => employee.id === service.employeeId);

        setSelectedService(service);
        setSelectedEmployee(selectedEmployee);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedService(null);
        setIsModalOpen(false);
    };

    const handleServiceClick = (service) => {
        openModal(service);
    };

    const dayNames = [
        "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"
    ];

    if (loading) {
        return (
            <div className="spinner-container">
                <ClipLoader color={"#007bff"} loading={loading} size={50} />
            </div>
        );
    }

    return (
        <PageLayout>
            {business && (
                <div className='business-page'>
                    <div className='business-page-content'>
                        {/*<img src={businessImage} alt='Zdjęcie przedsiębiorstwa'></img>*/}
                        <img src="https://placeholder.apptor.studio/420/360/product1.png" alt="" />
                        <div className='business-page-header'>
                            <div className='business-page-header-content'>
                                <h1>{business.name}</h1>
                                <p>
                                    {business.address.street} {business.address.buildingNumber} 
                                    {business.address.roomNumber ? `/${business.address.roomNumber}` : ''}, {business.address.postalCode} {business.address.city}
                                </p>
                            </div>
                            <div className='business-page-header-buttons'>
                                <button>
                                    <AiOutlineLike />
                                </button>
                                <button>
                                    <BsShare />
                                </button>
                            </div>
                        </div>
                        <div className='business-page-content-container'>
                            <BusinessServiceList
                                services={business.services}
                                handleServiceClick={handleServiceClick}
                            />
                        </div>
                    </div>
                    <div className='business-page-sidebar'>
                        <div className='business-page-side-bar-element'>
                            <h3>O nas</h3>
                            <p>Zapomiałem dodać pole O NAS do biznesu więc napiszę tu jakiś tekst...</p>
                        </div>
                        <div className='business-page-side-bar-element'>
                            <h3>Kontakt</h3>
                            <p>{business.phoneNumber}</p>
                            <p>{business.email}</p>
                        </div>
                        <div className='business-page-side-bar-element'>
                            <h3>Godziny pracy</h3>
                            {dayNames.map((dayName, index) => {
                                const day = business.weeklyWorkingHours.find(d => d.day === index + 1);

                                return (
                                    <div key={index}>
                                        {dayName}: {day ? (
                                            `${day.startTime} - ${day.endTime}`
                                        ) : (
                                            'Dzień wolny'
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <PrimaryButton>
                            Umów wizytę
                        </PrimaryButton>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <BookServiceModal
                    service={selectedService}
                    employee={selectedEmployee}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </PageLayout>
    );
}

export default BusinessPage;