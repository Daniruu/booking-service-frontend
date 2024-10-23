import React, { useEffect, useState } from 'react';
import { useBusiness } from '../../../context/BusinessContext';
import { Box, Typography } from '@mui/material';
import BusinessFilter from '../BusinessFilter/BusinessFilter';
import BusinessList from '../BusinessList/BusinessList';

const FilterableBusinessList = () => {
    const { businesses, pagination, fetchBusinesses, loading } = useBusiness();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchTerms, setSearchTerms] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const queryParams = {
            page: currentPage,
            limit: limit,
            category: selectedCategory,
            location: selectedLocation,
            searchTerms: searchTerms
        };
        fetchBusinesses(queryParams);
    }, [currentPage, limit, selectedCategory, selectedLocation, searchTerms]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
            <BusinessFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedLocation={setSelectedLocation}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
            />
            {pagination?.totalRecords > 0 && (
                <Typography variant='h5' mt={4} mb={1}>
                    {selectedCategory ? selectedCategory : 'Wszystkie Kategorie'}
                    {selectedLocation ? <>, {selectedLocation}</> : ''}
                    <> ( {pagination?.totalRecords} )</>
                </Typography>
            )}
            
            <BusinessList 
                businesses={businesses}
                pagination={pagination}
                loading={loading}
                page={currentPage}
                setPage={setCurrentPage}
            />
        </Box>
    );
}

export default FilterableBusinessList;