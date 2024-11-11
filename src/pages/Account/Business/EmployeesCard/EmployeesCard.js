import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useEmployee } from '../../../../context/EmployeeContext';
import { useBusinessAccount } from '../../../../context/BusinessAccountContext';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmployeesTable from '../EmployeesTable/EmployeesTable';
import AddEmployeeDialog from '../AddEmployeeDialog/AddEmployeeDialog';

const EmployeeCard = () => {
    const { business } = useBusinessAccount();
    const { fetchBusinessEmployees } = useEmployee();
    const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);

    useEffect(() => {
        if (business) {
            fetchBusinessEmployees(business.id);
        }
    }, [business]);

    const handleAddEmployeeDialogOpen = () => {
        setAddEmployeeDialogOpen(true);
    };

    const handleAddEmployeeDialogClose = () => {
        setAddEmployeeDialogOpen(false);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader
                avatar={<GroupOutlinedIcon />}
                title='Pracownicy'
                subheader='Zarządzaj pracownikami'
                action={
                    <Button 
                        sx={{ textTransform: 'none' }} 
                        variant='contained' 
                        onClick={handleAddEmployeeDialogOpen}
                        startIcon={<PersonAddIcon />}
                    >
                        Dodaj
                    </Button>
                }
                sx={{ 
                    '& .MuiCardHeader-action': {
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        alignSelf: 'center'
                    }
                }}
            />
            <Divider />
            <CardContent sx={{  '&:last-child': { paddingBottom: 0 } }}>
                <EmployeesTable />
            </CardContent>
            
            <AddEmployeeDialog open={addEmployeeDialogOpen} onClose={handleAddEmployeeDialogClose} />
        </Card>
    );
}

export default EmployeeCard;