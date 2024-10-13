import React from 'react';
import { Stack, Switch } from '@mui/material';
import WorkingHoursCard from '../WorkingHoursCard/WorkingHoursCard';
import BusinessDetailsCard from '../BusinessDetailsCard/BusinessDetailsCard';
import BusinessGalleryCard from '../BusinessGalleryCard/BusinessGalleryCard';

const BusinessInfo = () => {

    return (
        <Stack direction='column' spacing={2}>
            <BusinessDetailsCard />
            <WorkingHoursCard />
            <BusinessGalleryCard />
        </Stack>
    );
}

export default BusinessInfo;