import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useBusiness } from '../../../context/BusinessContext';
import { useUser } from '../../../context/UserContext';
import { Box, Grid2, Skeleton, Typography, Card, CardContent, Divider, Breadcrumbs, Link, Toolbar } from '@mui/material';
import { formatPhoneNumber } from '../../../utils/formatPhone';
import WideContainer from '../../../components/layout/WideContainer/WideContainer';
import ImageSlider from '../../../components/content/ImageSlider/ImageSlider';
import ServicesByGroup from '../ServicesByGroup/ServicesByGroup';
import WorkingHours from '../../../components/content/WorkingHours/WorkingHours';
import AvatarSlider from '../../../components/content/AvatarSlider/AvatarSlider';
import BookingModal from '../../../components/modals/BookingModal/BookingModal';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BusinessPage = () => {
    const { businessId } = useParams();
    const [searchParams] = useSearchParams();
    const serviceIdFromURL = searchParams.get('serviceId');
    const { user } = useUser();
    const { getBusinessById } = useBusiness();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                setLoading(true);
                const data = await getBusinessById(businessId);
                setBusiness(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [businessId, getBusinessById]);

    useEffect(() => {
        if (business && serviceIdFromURL) {
            const service = business.services.find(service => service.id === Number(serviceIdFromURL));
            if (service) {
                handleOpenModal(service);
            }
        }
    }, [business, serviceIdFromURL])

    const handleOpenModal = (service) => {
        if (!user) {
            navigate('/login');
        }

        const employee = business.employees.find(employee => employee.id === Number(service.employeeId));

        setSelectedService({ ...service, employee});
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedService(null);
    };

    if (!business) {
        return <Typography variant='h5'></Typography>
    };

    return (
        <WideContainer>
            <Toolbar />
            <Breadcrumbs sx={{ px: 4, pt: 4 }} separator={<NavigateNextIcon fontSize='small' />}>
                <Link underline='hover' color='inherit' href='/'>
                    BookItEasy
                </Link>
                <Typography sx={{ color: 'text.primary' }}>{business.name}</Typography>
            </Breadcrumbs>

            <Grid2 container spacing={4} sx={{ padding: 4 }}>
                <Grid2 item size={{ xs: 12, md: 8.5 }}>
                    <ImageSlider images={business.images} />

                    <Box mt={2} mb={4}>
                        <Typography variant='h4' gutterBottom>
                            {business.name ? business.name : <Skeleton animation='wave' />}
                        </Typography>
                        
                        <Typography variant='body2' color='text.secondary'>
                            {business.address ? (
                                <>
                                    {business.address.street} {business.address.buildingNumber}
                                    {business.address.roomNumber ? `/${business.address.roomNumber},` : ', '}
                                    {business.address.postalCode} {business.address.city}
                                </>
                            ) : (
                                <Skeleton animation='wave' />
                            )} 
                        </Typography>
                    </Box>
                    
                    <ServicesByGroup services={business.services} onServiceClick={handleOpenModal} />
                </Grid2>

                <Grid2 item size={{ xs: 12, md: 3.5 }}>
                    <Box sx={{ position: 'sticky', top: '80px' }}>
                        <Card sx={{ mb: 4 }} elevation={2}>
                            <CardContent sx={{ paddingTop: '24px' }}>
                                <Box>
                                    <AvatarSlider employees={business.employees} />
                                </Box>
                                <Divider />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }} py={2}>
                                    <Typography variant='body1' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}} mb={1}>
                                        <PhoneIcon sx={{ height: '20px', marginRight: 1 }} /> {formatPhoneNumber(business.phone)}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}}>
                                        <EmailIcon sx={{ height: '20px', marginRight: 1 }} /> {business.email}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box>
                                    <WorkingHours workingHours={business.workingHours} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid2>
            </Grid2>
            {openModal && (
                <BookingModal 
                    open={openModal}
                    onClose={handleCloseModal}
                    service={selectedService}
                    employee={selectedService.employee}
                />
            )}
        </WideContainer>
    );
}

export default BusinessPage;