import React, { useState } from 'react';
import { Button, Card, CardContent, CardHeader, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import AddServiceDialog from '../AddServiceDialog/AddServiceDialog';
import ServiceTable from '../ServiceTable/ServiceTable';

const ServicesCard = () => {
    const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);

    const handleAddServiceDialogOpen = () => {
        setAddServiceDialogOpen(true);
    };

    const handleAddServiceDialogClose = () => {
        setAddServiceDialogOpen(false);
    };

    return (
        <Card elevation={2} sx={{ minWidth: 600, width: '100%' }}>
            <CardHeader 
                avatar={<DesignServicesOutlinedIcon />} 
                title='Usługi' 
                subheader='Zarządzaj usługami'  
                action={
                    <Button 
                        sx={{ textTransform: 'none' }} 
                        variant='contained' 
                        onClick={handleAddServiceDialogOpen}
                        startIcon={<AddIcon />}
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
            <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
                <ServiceTable />
            </CardContent>

            <AddServiceDialog open={addServiceDialogOpen} onClose={handleAddServiceDialogClose} />
        </Card>
    );
};

export default ServicesCard;
