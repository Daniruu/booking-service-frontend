import React from 'react';
import Slider from "react-slick";
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageSlider = ({ images }) => {
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton 
                onClick={onClick} 
                sx={{ 
                    display: 'flex', 
                    position: 'absolute', 
                    top: '50%', 
                    right: 1, 
                    height: '52px', 
                    width: '52px', 
                    transform: 'translateY(-50%)', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 1
                }}>
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
                    left: 1, 
                    height: '52px', 
                    width: '52px', 
                    transform: 'translateY(-50%)', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 1
                }}>
                <ArrowBackIosNewIcon />
            </IconButton>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    

    return (
        <Card sx={{ height: '400px' }} elevation={2}>
            <Slider {...settings}>
                {images?.map((image, index) => (
                        <CardMedia 
                            key={index} 
                            component='img'
                            src={image.imageUrl}
                            alt={`Business ${index}`}
                            sx={{ width: '100%', height: '400px', objectFit: 'conver', position: 'relative' }}
                        />
                ))}
            </Slider>
        </Card>
    );
};

export default ImageSlider;
