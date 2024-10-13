import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar, Box, Typography } from '@mui/material';

const AvatarSlider = ({ employees }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: false,
        variableWidth: true
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', padding: 0 }}>
            <Typography variant='body1' color='text.secondary'>Pracownicy</Typography>
            <Slider {...settings}>
                {employees.map((employee, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: '8px', 
                            margin: 0,
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <Avatar 
                            alt={employee.name} 
                            src={employee.avatarUrl} 
                            sx={{ width: 60, height: 60, marginBottom: 1 }} 
                        />
                        <Typography variant="body2" align="center" color='text.secondary'>
                            {employee.name}
                        </Typography>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default AvatarSlider;
