import React from 'react';
import { Stack } from '@mui/material';
import EmployeeCard from '../EmployeesCard/EmployeesCard';


const EmployeesSection = () => {

    return (
        <Stack direction='column' spacing={2}>
            <EmployeeCard />
        </Stack>
    );
}

export default EmployeesSection;