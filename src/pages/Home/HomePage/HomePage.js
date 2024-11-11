import React from 'react';
import { Container, Stack, Toolbar } from '@mui/material';
import FilterableBusinessList from '../FilterableBusinessList/FilterableBusinessList';

const HomePage = () => {
    return (
        <Container sx={{ minHeight: '100vh' }}>
            <Toolbar />
            <Stack p={4}>
                <FilterableBusinessList />
            </Stack>
        </Container>
    );
};

export default HomePage;