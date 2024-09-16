import React from 'react';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import PageLayout from '../../../components/layout/PageLayout';
import Sidebar from '../../../components/layout/Sidebar';
import FilterSidebar from '../../../components/layout/FilterSidebar/FilterSidebar';
import BusinessList from '../../../components/content/BusinessList/BusinessList';
import './HomePage.css';

const fetchBusinesses = async (city = '', category = '', page = 1, pageSize = 10) => {
    const queryParams = new URLSearchParams({
        city: city,
        category: category,
        page: page,
        pageSize: pageSize
    });

    const response = await fetch(`https://localhost:7217/business?${queryParams}`, {
        method: 'GET'
    });


    if (!response.ok) {
        if (response.status === 404) {
            return [];
        }

        const errorMessage = await response.text();
        throw new Error('Failed fetching data', errorMessage);
    }

    const json = await response.json();
    return json;
};

const HomePage = () => {
    const [businesses, setBusinesses] = useState([]);
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalBusinesses, setTotalBusinesses] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBusinesses = async () => {
            setIsLoading(true);
            try {
                const result = await fetchBusinesses(city, category, page);

                setBusinesses(result.data);
                setTotalBusinesses(result.totalBusinesses);
            } catch (error) {
                console.error('Failed fetching businesses data', error);
            } finally {
                setIsLoading(false);
            }
        };

        getBusinesses();
    },[city, category, page]);

    const handleFilterChange = (newCity, newCategory) => {
        setCity(newCity);
        setCategory(newCategory);
        setPage(1);
    };

    return (
        <PageLayout>
            <div className='home-page'>
                <Sidebar>
                    <FilterSidebar onFilterChange={handleFilterChange}/>
                </Sidebar>
                <div className='home-page-content'>
                    {isLoading ? (
                        <div className="spinner-container">
                            <ClipLoader color={"#007bff"} loading={isLoading} size={50} />
                        </div>
                    ) : (
                        <>
                            {businesses ? (
                                <>
                                    <BusinessList businesses={businesses}/>
                                    <div className='pagination'>
                                        {Array.from({ length: Math.ceil(totalBusinesses / 10) }, (_, i) => (   
                                            <button
                                                key={i + 1}
                                                onClick={() => setPage(i + 1)}
                                                disabled={page === i + 1}
                                                className={page === i + 1 ? 'active' : ''}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <h3>Nie znaleziono żadnych przedsiębiorstw</h3>
                            )}
                            
                        </>
                    )}
                </div>
                
            </div>
            
        </PageLayout>
    );
};

export default HomePage;