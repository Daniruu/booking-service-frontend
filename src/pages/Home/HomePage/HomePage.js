import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../../../components/layout/Sidebar/Sidebar';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import BusinessList from '../BusinessList/BusinessList';
import WideContainer from '../../../components/layout/WideContainer/WideContainer';

const HomePage = () => {
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');

    const handleFilterChange = (newCity, newCategory) => {
        setLocation(newCity);
        setCategory(newCategory);
    };

    return (
        <WideContainer>
            <Toolbar />
            <Box sx={{ display: 'flex', mb: 8 }}>
                <Sidebar>
                    <FilterSidebar onFilterChange={handleFilterChange}/>
                </Sidebar>
                <Box sx={{ padding: 3, width: '100%' }}>
                    <BusinessList location={location} category={category} />
                </Box>
            </Box>
        </WideContainer>
    );
};

export default HomePage;