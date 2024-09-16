import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import PageLayout from '../../../components/layout/PageLayout';
import Sidebar from '../../../components/layout/Sidebar';
import BusinessSidebar from '../BusinessSidebar/BusinessSidebar';
import { ClipLoader } from 'react-spinners';
import EmployeeList from '../EmployeeList/EmployeeList';
import AddEmployeeButton from '../AddEmployeeButton/AddEmployeeButton';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';
import EditEmployeeForm from '../EditEmployeeForm/EditEmployeeForm';
import ServiceList from '../ServiceList/ServiceList';
import SidePanel from '../BusinessSidePanel/SidePanel';
import AddServiceButton from '../AddServiceButton/AddServiceButton';
import AddServiceForm from '../AddServiceForm/AddServiceForm';
import { MdDeleteOutline } from "react-icons/md";
import EditServiceForm from '../EditServiceForm/EditServiceForm';
import BusinessDataForm from '../BusinessDataForm/BusinessDataForm';
import BusinessWorkingHoursForm from '../BusinessWorkingHoursForm/BusinessWorkingHours';
import ReservationCalendar from '../ReservationCalendar/ReservationCalendar';
import './BusinessManagementPage.css';

const BusinessPage = () => {
    const { refreshAccessToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Dashboard');
    const [business, setBusiness] = useState(null);
    const [activeForm, setActiveForm] = useState(null);

    useEffect(() => {
        getBusinessData();
    },[]);

    const getBusinessData = async () => {
        const token = localStorage.getItem('accessToken');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const url = `https://localhost:7217/business/my-business?timeZone=${encodeURIComponent(timeZone)}`;

        try {
            setLoading(true);
            console.log('Fetching business data...');

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const json = await response.json();
                setBusiness(json);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${newToken}` }
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }

                const json = await retryResponse.json();
                setBusiness(json);
            } else {
                const responseMessage = await response.text();
                throw new Error(`Response status: ${response.status}, responseMessage: ${responseMessage}`);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateBusinessData = async (businessData) => {
        const token = localStorage.getItem('accessToken');
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const url = `https://localhost:7217/business?timeZone=${encodeURIComponent(timeZone)}`;

        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(businessData)
            });

            if (response.ok) {
                const json = await response.json();
                setBusiness(json);
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`,
                    },
                    body: JSON.stringify(businessData)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }

                const json = await retryResponse.json();
                setBusiness(json);
            } else {
                const responseMessage = await response.text();
                throw new Error(`Response status: ${response.status}, responseMessage: ${responseMessage}`);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addEmployee = async (employeeData) => {
        const url = `https://localhost:7217/employee/${business.id}`;
        const token = localStorage.getItem('accessToken');

        try {
            console.log('Sending employee data', employeeData);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(employeeData)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const updateEmployee = async (employeeId, employeeData) => {
        const url = `https://localhost:7217/employee/${employeeId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(employeeData)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const deleteEmployee = async (employeeId) => {
        const url = `https://localhost:7217/employee/${employeeId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const addService = async (serviceData) => {
        const url = `https://localhost:7217/service/${business.id}`;
        const token = localStorage.getItem('accessToken');

        try {
            console.log('Sending employee data', serviceData);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serviceData)
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(serviceData)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const updateService = async (serviceId, serviceData) => {
        const url = `https://localhost:7217/service/${serviceId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serviceData)
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(serviceData)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const deleteService = async (serviceId) => {
        const url = `https://localhost:7217/service/${serviceId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setActiveForm(null);
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                setActiveForm(null);
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const addWorkingHours = async (workingHoursDto) => {
        const url = `https://localhost:7217/workinghours/${business.id}`;
        const token = localStorage.getItem('accessToken');

        try {
            console.log('Sending working hours data', workingHoursDto, business.id);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(workingHoursDto)
            });

            if (response.ok) {
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(workingHoursDto)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const updateWorkingHours = async (workingHoursDto) => {
        const url = `https://localhost:7217/workinghours/${business.id}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(workingHoursDto)
            });

            if (response.ok) {
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify(workingHoursDto)
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const deleteWorkingHours = async (workingHoursId) => {
        const url = `https://localhost:7217/workinghours/${workingHoursId}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    const handleSelectOption = (option) => {
        setActiveForm(null);
        setSelectedOption(option);
    }

    const handleAddEmployeeClick = () => {
        setActiveForm('addEmployee');
    };

    const handleEditEmployeeClick = (employee) => {
        setActiveForm({ type: 'editEmployee', employee });
    };
    
    const handleAddServiceClick = () => {
        setActiveForm('addService');
    };
    
    const handleEditServiceClick = (service) => {
        setActiveForm({ type: 'editService', service });
    };

    const handleToggleFeaturedServiceClick = async (service) => {
        const url = `https://localhost:7217/service/toggle-featured-status/${service.id}`;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                getBusinessData();
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');

                const retryResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error (errorMessage);
                }
                getBusinessData();
            } else {
                const errorMessage = await response.text();
                throw new Error (errorMessage);
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };
    
    const handleCloseForm = () => {
        setActiveForm(null);
    };

    const renderContent = (option) => {
        switch (option) {
            case 'Dashboard':
                return (
                    <div className='dashboard-container'>
                        <h2>Pulpit</h2>
                        <BusinessDataForm 
                            business={business}
                            onSubmit={updateBusinessData}
                        />
                        <BusinessWorkingHoursForm
                            weeklyWorkingHours={business.weeklyWorkingHours}
                            onAdd={addWorkingHours}
                            onSave={updateWorkingHours}
                            onDelete={deleteWorkingHours}
                        />
                    </div>
                );
            case 'Employees':
                return (
                    <div className='employee-container'>
                        <h2>Pracownicy</h2>
                        {(business.employees.length > 0) ? (
                            <EmployeeList 
                                employees={business.employees}
                                handleEmployeeClick={handleEditEmployeeClick} 
                            />
                        ) : (
                            <p>Nie masz jeszcze dodanych pracowników</p>
                        )}
                        <AddEmployeeButton onClick={handleAddEmployeeClick}/>
                    </div>
                );
            case 'Services':
                return (
                    <div className='service-container'>
                        <h2>Usługi</h2>
                        {business.services.length > 0 ? (
                            <ServiceList
                                services={business.services}
                                onServiceClick={handleEditServiceClick}
                                onFeatureClick={handleToggleFeaturedServiceClick}
                            />
                        ) : (
                            <p>Nie masz jeszcze dodanych usług</p>
                        )}
                        <AddServiceButton onClick={handleAddServiceClick}/>
                    </div>
                );
            case 'Calendar':
                return (
                    <div className='calendar-container'>
                        <h2>Kaledarz</h2>
                        <ReservationCalendar business={business} />
                    </div>
                );
            default:
                return <h2>Panel biznesu</h2>
        }
    };

    const renderFormContent = () => {
        switch (activeForm?.type || activeForm) {
            case 'addEmployee':
                return <AddEmployeeForm onSubmit={addEmployee}/>
            case 'editEmployee':
                return (
                    <>
                        <EditEmployeeForm
                            employee={activeForm.employee}
                            onSubmit={updateEmployee}
                        />
                        <button className='trash-button' onClick={() => deleteEmployee(activeForm.employee.id)}>
                            <MdDeleteOutline />
                        </button>
                    </>
                );
            case 'addService':
                return <AddServiceForm 
                    employees={business.employees}
                    onSubmit={addService}
                />
            case 'editService':
                return (
                    <>
                        <EditServiceForm
                            service={activeForm.service}
                            employees={business.employees}
                            onSubmit={updateService}
                        />
                        <button className='trash-button' onClick={() => deleteService(activeForm.service.id)}>
                            <MdDeleteOutline />
                        </button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <PageLayout>
            <div className='business-management-page'>
                <Sidebar>
                    <BusinessSidebar selectedOption={selectedOption} setSelectedOption={handleSelectOption} />
                </Sidebar>

                {loading ? (
                    <div className="spinner-container">
                        <ClipLoader color={"#007bff"} loading={loading} size={50} />
                    </div>
                ) : (
                    business ? (
                        <div className='business-content'>
                            {renderContent(selectedOption)}
                        </div>
                    ) : (
                        <h3>Business data not available</h3>
                    )
                )}

                <SidePanel
                    isVisible={!!activeForm}
                    onClose={handleCloseForm}
                >
                    {renderFormContent()}
                </SidePanel>
            </div>
        </PageLayout>
    );
}

export default BusinessPage;