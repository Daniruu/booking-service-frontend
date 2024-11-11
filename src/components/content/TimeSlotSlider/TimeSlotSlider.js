import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import { useBooking } from '../../../context/BookingContext';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TimeSlotSlider = ({ serviceId, selectedDate, selectedSlot, onSlotClick }) => {
    const { getAvailableTimeSlots } = useBooking();
    const [slots, setSlots] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchAvailableTimeSlots = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching time slot in slider...');
                const data = await getAvailableTimeSlots(serviceId, selectedDate);
                setSlots(data);

                if (sliderRef.current) {
                    sliderRef.current.slickGoTo(0);
                }
            } catch (error) {
                setError(error.message);
                setSlots(null);
            } finally {
                setLoading(false);
            }
        };
        if (serviceId && selectedDate) {
            fetchAvailableTimeSlots();
        }
    }, [serviceId, selectedDate]);

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    display: 'flex',
                    position: 'absolute',
                    top: '50%',
                    right: -40,
                    height: '52px',
                    width: '52px',
                    transform: 'translateY(-50%)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    display: 'flex',
                    position: 'absolute',
                    top: '50%',
                    left: -40,
                    height: '52px',
                    width: '52px',
                    transform: 'translateY(-50%)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Box px={3} sx={{ maxWidth: '100%', paddingTop: 2, paddingBottom: 2, overflow: 'hidden' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant='body1' sx={{ color: 'red', textAlign: 'center' }}>
                    {error}
                </Typography>
            ) : (
                <Slider {...settings} ref={sliderRef}>
                    {slots?.map((slot, index) => (
                        <Button
                            key={index}
                            variant={slot === selectedSlot ? 'contained' : 'outlined'}
                            sx={{ fontSize: '12px', minWidth: '60px', borderRadius: 0 }}
                            size='small'
                            onClick={() => onSlotClick(slot)}
                        >
                            {dayjs(slot).format('HH:mm')}
                        </Button>
                    ))}
                </Slider>
            )}
        </Box>
    );
};

export default TimeSlotSlider;
