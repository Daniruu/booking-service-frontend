import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/layout/PageLayout';
import AddBusinessForm from '../AddBusinessForm/AddBusinessForm';
import { AuthContext } from '../../../context/AuthContext';
import './AddBusinessPage.css';

const AddBusiness = async (token, businessData) => {
    const response = await fetch('https://localhost:7217/business', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(businessData)
    });

    return response;
}

const AddBusinessPage = () => {
    const { refreshAccessToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitSuccess = async (businessData) => {
        const token = localStorage.getItem('accessToken');

        try {
            setLoading(true);
            console.log('Sending business data:', businessData);

            const response = await AddBusiness(token, businessData);

            if (response.ok) {
                navigate('/business');
            } else if (response.status === 401) {
                await refreshAccessToken();
                const newToken = localStorage.getItem('accessToken');
                
                const retryResponse = await AddBusiness(newToken, businessData);

                if (!retryResponse.ok) {
                    const errorMessage = await retryResponse.text();
                    throw new Error(errorMessage);
                }
                navigate('/business');
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <div className='add-business-page'>
                {loading ? (
                    <p>Loading...</p>
                ): (
                    <AddBusinessForm onSubmitSuccess={handleSubmitSuccess}/>
                )}
            </div>
        </PageLayout>
    );
};

export default AddBusinessPage;