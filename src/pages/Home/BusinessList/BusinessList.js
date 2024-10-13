import React, { useState, useEffect } from 'react';
import { useBusiness } from '../../../context/BusinessContext';
import { useNotification } from '../../../context/NotificationContext';
import { Box, ListItem, Pagination, Typography, List } from '@mui/material';
import BusinessCard from '../BusnessCard/BusinessCard';

const BusinessList = ({ location, category }) => {
    const { getBusinesses } = useBusiness();
    const [businesses, setBusinesses] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchBusinessList = async () => {
            try {
                setLoading(true);
                const queryParams = {
                    page: page,
                    limit: limit,
                    category: category,
                    location: location
                };
                const data = await getBusinesses(queryParams);
                setBusinesses(data.businesses);
                setPagination(data.pagination);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessList();
    }, [location, category, page, limit, getBusinesses]);

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {!loading && businesses.length === 0 && (
                <Typography variant='h6' align='center'>
                    Brak biznesów
                </Typography>
            )}
            
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '850px' }}>
                {businesses?.map((business) => (
                    <ListItem key={business.id} sx={{ display: 'block', padding: 0 }}>
                        <BusinessCard business={business}/>
                    </ListItem>
                ))}
            </List>
            {pagination.totalPages > 1 && (
                <Box>
                    <Pagination 
                        count={pagination.totalPages} 
                        page={page}
                        variant='outlined' 
                        shape='rounded' 
                        onChange={(e) => handlePageChange(e.target.value)}
                    />
                </Box>
            )}
        </Box>
    );
}

export default BusinessList;