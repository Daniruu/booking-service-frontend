import React from 'react';
import { Box, ListItem, Pagination, Typography, List, Skeleton } from '@mui/material';
import BusinessCard from '../BusnessCard/BusinessCard';

const BusinessList = ({ businesses, pagination, loading, page, setPage }) => {

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box>
            {loading && (
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                    {Array.from(new Array(5)).map((_, index) => (
                        <ListItem key={index} sx={{ display: 'block', p: 0 }}>
                            <Skeleton variant='rectangular' height={200} sx={{ borderRadius: 2 }} />
                        </ListItem>
                    ))}
                </List>
            )}

            {!loading && businesses?.length === 0 && (
                <>
                <Typography variant='h6' align='center' color='text.secondary' mt={4}>
                    Nie znaleźliśmy nic zgodnego z twoim zapytaniem 
                </Typography>
                <Typography variant='h6' align='center' color='text.secondary' mt={1}>
                    (╥﹏╥)
                </Typography>
                </>
            )}
            
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {businesses?.map((business) => (
                    <ListItem key={business.id} sx={{ display: 'block', p: 0 }}>
                        <BusinessCard business={business}/>
                    </ListItem>
                ))}
            </List>

            {pagination?.totalPages > 1 && (
                <Pagination
                    count={pagination.totalPages} 
                    page={page}
                    variant='outlined' 
                    shape='rounded' 
                    onChange={handlePageChange}
                />
            )}
        </Box>
    );
}

export default BusinessList;