import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button, Skeleton, Divider } from '@mui/material';

const ServicesByGroup = ({ services, onServiceClick }) => {
    const featuredServices = services.filter(service => service.isFeatured);
    
    const groupedServices = services.reduce((acc, service) => {
        const group = service.group || 'Pozostałe';
        if (!acc[group]) acc[group] = [];
        acc[group].push(service);
        return acc;
    }, {});

    return (
        <Box>
            <Typography variant='h5' fontWeight={500} gutterBottom>Usługi</Typography>

            {featuredServices.length > 0 && (
                <Box mb={2}>
                    <Divider />
                    <Typography variant='h6' mt={1}>Poplarne Usługi</Typography>
                    <List>
                        {featuredServices.map((service, index) => (
                            <ListItem key={index} sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                                <ListItemText
                                    primary={service.name}
                                    secondary={service.description}
                                />
                                <ListItemText
                                    primary={`${service.price} zł`}
                                    secondary={`${service.duration} min`}
                                    primaryTypographyProps={{ textAlign: 'right' }}
                                    secondaryTypographyProps={{ textAlign: 'right' }}
                                />
                                <Button 
                                        variant='contained' 
                                        size='small' 
                                        sx={{ marginLeft: 2 }} 
                                        onClick={() => onServiceClick(service)}
                                    >
                                        Umów</Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
            

            {Object.keys(groupedServices).length > 0 ? (
                Object.keys(groupedServices).map((group, index) => (
                    <Box key={index} mb={2}>
                        <Divider />
                        <Typography variant='h6' mt={1}>{group}</Typography>
                        
                        <List>
                            {groupedServices[group].map((service, serviceIndex) => (
                                <ListItem key={serviceIndex} sx={{ justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                                    <ListItemText
                                        primary={service.name}
                                        secondary={service.description}
                                    />
                                    <ListItemText
                                        primary={`${service.price} zł`}
                                        secondary={`${service.duration} min`}
                                        primaryTypographyProps={{ textAlign: 'right' }}
                                        secondaryTypographyProps={{ textAlign: 'right' }}
                                    />
                                    <Button 
                                        variant='contained' 
                                        size='small' 
                                        sx={{ marginLeft: 2 }} 
                                        onClick={() => onServiceClick(service)}
                                    >
                                        Umów</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ))
            ) : (
                [...Array(3)].map((_, index) => (
                    <ListItem key={index} sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
                        <ListItemText
                            primary={<Skeleton variant="text" width={150} />}
                            secondary={<Skeleton variant="text" width={200} />}
                        />
                        <ListItemText
                            primary={<Skeleton variant="text" width={50} />}
                            secondary={<Skeleton variant="text" width={70} />}
                            primaryTypographyProps={{ textAlign: 'right' }}
                            secondaryTypographyProps={{ textAlign: 'right' }}
                        />
                        <Skeleton variant="rectangular" width={80} height={36} sx={{ marginLeft: 2 }} />
                    </ListItem>
                ))
            )}
        </Box>
    );
};

export default ServicesByGroup;
