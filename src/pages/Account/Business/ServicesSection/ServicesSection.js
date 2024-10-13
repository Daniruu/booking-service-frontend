import React from 'react';
import { Stack } from '@mui/material';
import ServicesCard from '../ServicesCard/ServicesCard';


const ServicesSection = () => {

    return (
        <Stack direction='column' spacing={2}>
            <ServicesCard />
        </Stack>
    );
}

export default ServicesSection;