import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemIcon, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@mui/material';
import { useService } from '../../../../context/ServiceContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditServiceDialog from '../EditServiceDialog/EditServiceDialog';
import DeleteServiceDialog from '../DeleteServiceDialog/DeleteServiceDialog';
import ServiceTableRow from '../ServiceTableRow/ServiceTableRow';

const ServiceTable = () => {
    const { services, fetchServices } = useService();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [editServiceDialogOpen, setEditServiceDialogOpen] = useState(false);
    const [deleteServiceDialogOpen, setDeleteServiceDialogOpen] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const groupedServices = services ? services.reduce((acc, service) => {
        const group = service.group || 'Inne usługi';
        if(!acc[group]){
            acc[group] = [];
        }
        acc[group].push(service);
        return acc;
    }, {}) : {};

    const sortedGroupedServices = Object.entries(groupedServices).reduce((acc, [group, services]) => {
        acc[group] = services.sort((a, b) => a.orderIndex - b.orderIndex);
        return acc;
    }, {});

    const handleMenuClick = (e, service) => {
        setAnchorEl(e.currentTarget);
        setSelectedService(service);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditServiceDialogOpen = () => {
        setEditServiceDialogOpen(true);
        handleMenuClose();
    };

    const handleEditServiceDialogClose = () => {
        setEditServiceDialogOpen(false);
    };

    const handleDeleteserviceDialogOpen = () => {
        setDeleteServiceDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteServiceDialogClose = () => {
        setDeleteServiceDialogOpen(false);
    };

    if (!services) {
        return (
            <Typography variant='body1' p={2}>Brak usług</Typography>
        );
    };

    return (
        <Paper>
            <List>
                {Object.entries(sortedGroupedServices).map(([group, services]) => (
                    <ListItem key={group}>
                        <Accordion defaultExpanded disableGutters elevation={0} sx={{ flex: 1, '&:before': { display: 'none' } }}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: '#f5f7fa',
                                }}>
                                <Typography variant='body1' fontWeight={500}>{group}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0 }}>
                                <TableContainer>
                                    <Table size='small'>
                                        <TableHead>
                                            <TableCell sx={{ color: 'text.secondary', textWrap: 'nowrap', pl: 1 }}>Nazwa usługi</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', textWrap: 'nowrap' }}>Opis</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', textWrap: 'nowrap' }}>Pracowik</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', textWrap: 'nowrap' }} align='right'>Czas trwania</TableCell>
                                            <TableCell sx={{ color: 'text.secondary', textWrap: 'nowrap' }} align='right'>Cena</TableCell>
                                            <TableCell></TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {services.map((service) => (
                                                <ServiceTableRow key={service.id} service={service} onMenuClick={handleMenuClick} />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))}
            </List>
            

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditServiceDialogOpen}>
                    <ListItemIcon>
                        <EditIcon fontSize='small' />
                    </ListItemIcon>
                    Edytuj
                </MenuItem>
                <MenuItem onClick={handleDeleteserviceDialogOpen}>
                    <ListItemIcon>
                        <DeleteIcon fontSize='small' />
                    </ListItemIcon>
                    Usuń
                </MenuItem>
            </Menu>

            <EditServiceDialog open={editServiceDialogOpen} onClose={handleEditServiceDialogClose} service={selectedService} />
            <DeleteServiceDialog open={deleteServiceDialogOpen} onClose={handleDeleteServiceDialogClose} service={selectedService} />
        </Paper>
    );
}

export default ServiceTable;