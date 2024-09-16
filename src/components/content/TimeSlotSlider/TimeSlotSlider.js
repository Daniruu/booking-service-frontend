import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TimeSlotSlider.css';

const formatTimeSlot = (slot) => {
    const date = new Date(slot);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const TimeSlotSlider = ({ timeSlots, selectedSlot, onTimeSlotClick }) => {
    const settings = {
        className: 'time-slot-slider',
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleTimeSlotClick = (slot) => {
        onTimeSlotClick(slot)
    }

    return (
        <Slider {...settings}>
            {timeSlots.map((slot) => (
                <div key={slot} className={`time-slot-item ${selectedSlot === slot ? 'selected' : ''}`} onClick={() => handleTimeSlotClick(slot)}>
                    <div className="time-slot">{formatTimeSlot(slot)}</div>
                </div>
            ))}
        </Slider>
    );
};

export default TimeSlotSlider;
