import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useBusiness } from '../../../context/BusinessContext';
import { useUser } from '../../../context/UserContext';
import { Box, Grid2, Skeleton, Typography, Card, CardContent, Divider, Breadcrumbs, Link, Toolbar, List, ListItem, Stack, Container, IconButton } from '@mui/material';
import { formatPhoneNumber } from '../../../utils/formatPhone';
import ImageSlider from '../../../components/content/ImageSlider/ImageSlider';
import ServicesByGroup from '../ServicesByGroup/ServicesByGroup';
import WorkingHours from '../../../components/content/WorkingHours/WorkingHours';
import AvatarSlider from '../../../components/content/AvatarSlider/AvatarSlider';
import BookingModal from '../../../components/modals/BookingModal/BookingModal';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReviewList from '../ReviewList/ReviewList';
import AddReviewForm from '../AddReviewForm/AddReviewForm';

const BusinessPage = () => {
    const { businessId } = useParams();
    const [searchParams] = useSearchParams();
    const serviceIdFromURL = searchParams.get('serviceId');
    const { user } = useUser();
    const { businessDetails, fetchBusinessDetails, loading, isFavorite, checkFavoriteStatus, toggleFavorite, fetchBusinessReviews, hasReviewed, checkReviewStatus, hasAccessToReview, checkAccessToReview } = useBusiness();
    const [openModal, setOpenModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBusinessDetails(businessId);
        fetchBusinessReviews(businessId);
        if (user) {
            checkFavoriteStatus(businessId);
            checkReviewStatus(businessId);
            checkAccessToReview(businessId);
        }
    }, [businessId]);

    useEffect(() => {
        if (businessDetails && serviceIdFromURL) {
            const service = businessDetails.services.find(service => service.id === Number(serviceIdFromURL));
            if (service) {
                handleOpenModal(service);
            }
        }
    }, [businessDetails, serviceIdFromURL])

    const toggleShowDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleOpenModal = (service) => {
        if (!user) {
            navigate('/login');
        }

        const employee = businessDetails.employees.find(employee => employee.id === Number(service.employeeId));

        setSelectedService({ ...service, employee});
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedService(null);
    };

    if (!businessDetails && !loading) {
        return <Container sx={{ minHeight: '100vh' }}/>
    };

    return (
        <Container sx={{ minHeight: '100vh' }}>
            <Toolbar />
            <Breadcrumbs sx={{ px: 4, pt: 4 }} separator={<NavigateNextIcon fontSize='small' />}>
                <Link underline='hover' color='inherit' href='/'>
                    BookItEasy
                </Link>
                <Typography sx={{ color: 'text.primary' }}>{businessDetails?.name}</Typography>
            </Breadcrumbs>

            <Grid2 container spacing={4} sx={{ padding: 4 }}>
                <Grid2 item size={{ xs: 12, md: 8 }}>
                    <Stack spacing={4}>
                        {!loading ? (
                            <Box sx={{ position: 'relative', height: 300 }}>
                                <ImageSlider images={businessDetails?.images} />
                                {businessDetails.averageRating > 0 && (
                                    <Box 
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            right: 0, 
                                            bgcolor: 'rgba(0, 0, 0, 0.6)', 
                                            color: '#fff', 
                                            borderBottomLeftRadius: 6,
                                            borderTopRightRadius: 6,
                                            px: 2, 
                                            py: 0.5, 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            justifyContent: 'center' 
                                        }}
                                    >
                                        <Typography variant='h6' fontWeight={600}>{businessDetails.averageRating.toFixed(1)}</Typography>
                                        <Typography variant='body2' fontSize={12} noWrap>{businessDetails.reviewCount} opinii</Typography>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Skeleton animation='wave' variant='rounded' height={300} width='100%' />
                        )}
                        
                        <Box mt={2} mb={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start' }}>
                            <Box>
                                <Typography variant='h4' gutterBottom>
                                    {!loading ? businessDetails?.name : <Skeleton animation='wave' variant='rounded' height={32} width={360} />}
                                </Typography>
                                
                                <Typography variant='body2' color='text.secondary'>
                                    {!loading ? (
                                        <>
                                            {businessDetails?.address.street} {businessDetails?.address.buildingNumber}
                                            {businessDetails?.address.roomNumber ? `/${businessDetails?.address.roomNumber},` : ', '}
                                            {businessDetails?.address.postalCode} {businessDetails?.address.city}
                                        </>
                                    ) : (
                                        <Skeleton animation='wave' variant='rounded' height={16} width={320} />
                                    )} 
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => toggleFavorite(businessId)} size='large'>
                                    {isFavorite ? (
                                        <FavoriteIcon fontSize='inherit' />
                                    ) : (
                                        <FavoriteBorderIcon fontSize='inherit' />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                        {!loading ? (
                            <ServicesByGroup services={businessDetails?.services} onServiceClick={handleOpenModal} />
                        ) : (
                            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                                <Skeleton animation='wave' variant='rounded' height={32} width={160} />
                                <Divider />
                                {Array.from(new Array(8)).map((_, index) => (
                                    <ListItem key={index} sx={{ display: 'block', p: 0, mb: 1 }}>
                                        <Skeleton animation='wave' variant='rounded' height={18} width={120} sx={{ mb: 2 }}/>
                                        <Skeleton animation='wave' variant='rounded' height={36} width='100%' />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        
                        {(user && hasAccessToReview) && (
                            hasReviewed ? (
                                <Typography>**TO DO Edit review **</Typography>
                            ) : (
                                <AddReviewForm businessId={businessId} />
                            )
                        )}
                        <ReviewList />
                    </Stack>
                </Grid2>

                <Grid2 item size={{ xs: 12, md: 4 }}>
                    <Box sx={{ position: 'sticky', top: '80px' }}>
                        <Card sx={{ mb: 4 }} elevation={2}>
                            <CardContent sx={{ paddingTop: '24px' }}>
                                    {!loading ? (
                                        <>
                                        <Box px={0.5}>
                                            <Typography variant='body1' color='text.primary' gutterBottom>Opis</Typography>
                                            <Typography 
                                                variant='body2' 
                                                color='text.secondary'
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: showFullDescription ? 'none' : 4,
                                                }}
                                            >
                                                {businessDetails?.description}
                                            </Typography>
                                            {businessDetails?.description.length > 180 && (
                                                <Link
                                                    align='right'
                                                    component='button'
                                                    variant='body2'
                                                    onClick={toggleShowDescription}
                                                    sx={{ mt: 1, width: '100%', color: 'text.secondary', textDecoration: 'none' }}
                                                >{showFullDescription ? 'Pokaż mniej' : 'Pokaż więcej'}</Link>
                                            )}
                                        </Box>
                                        <Divider sx={{ my: 2}}/>
                                        <Box px={0.5}>
                                            {businessDetails?.employees && (
                                                <AvatarSlider employees={businessDetails?.employees} />
                                            )}
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }} py={2} px={0.5}>
                                            <Typography variant='body1' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}} mb={1}>
                                                <PhoneIcon sx={{ height: '20px', marginRight: 1 }} /> {formatPhoneNumber(businessDetails?.phone)}
                                            </Typography>
                                            <Typography variant='body1' color='text.secondary' sx={{ display: 'flex', alignItems: 'center'}}>
                                                <EmailIcon sx={{ height: '20px', marginRight: 1 }} /> {businessDetails?.email}
                                            </Typography>
                                        </Box>
                                        <Divider />
                                        <Box px={0.5}>
                                            {businessDetails?.workingHours && (
                                                <WorkingHours workingHours={businessDetails?.workingHours} />
                                            )}
                                        </Box>
                                        </>
                                    ) : (
                                        <Stack>
                                            <Skeleton animation='wave' sx={{ mb: 2 }} width='40%'/>
                                            <Skeleton animation='wave' />
                                            <Skeleton animation='wave' />
                                            <Skeleton animation='wave' />
                                            <Divider sx={{ my: 2}}/>
                                            <Skeleton animation='wave' width='60%' />
                                            <List sx={{ display: 'flex' }}>
                                                {Array.from(new Array(4)).map((_, index) => (
                                                    <ListItem key={index} sx={{ display: 'block', p: 0, mb: 1 }}>
                                                        <Skeleton animation='wave' variant='circular' width={60} height={60} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Divider sx={{ my: 2}}/>
                                            <Skeleton animation='wave' width='80%' />
                                            <Skeleton animation='wave' width='80%' />
                                            <Divider sx={{ my: 2}}/>
                                            <Skeleton animation='wave' width='60%' />
                                            <List>
                                                {Array.from(new Array(7)).map((_, index) => (
                                                    <ListItem key={index} sx={{ display: 'flex', p: 0, gap: 1 }}>
                                                        <Skeleton animation='wave' width='70%' />
                                                        <Skeleton animation='wave' width='30%' />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Stack>
                                    )}
                                    
                                
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
        </Container>
    );
}

export default BusinessPage;