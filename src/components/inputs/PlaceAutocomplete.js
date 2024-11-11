import React, { useEffect, useRef } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const PlaceAutocomplete = ({ onPlaceSelected, setSelectedLocation }) => {
    const inputRef = useRef(null);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY;

    const handleClearSelect =() => {
        setSelectedLocation('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    useEffect(() => {
        if (!apiKey) {
            console.error('API Key is missing');
            return;
        }

        const initAutocomplete = () => {
            if (window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                    types: ['(cities)'],
                    componentRestrictions: { country: 'pl' }
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place && place.geometry) {
                        onPlaceSelected(place);
                    }
                });
            }
        };

        if (!window.googleMapsScriptLoadingPromise) {
            window.googleMapsScriptLoadingPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=pl`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    resolve();
                    initAutocomplete();
                };
                script.onerror = (error) => reject(error);
                document.body.appendChild(script);
            });
        } else {
            window.googleMapsScriptLoadingPromise.then(initAutocomplete).catch((error) => {
                console.error("Failed to load Google Maps API:", error);
            });
        }
    }, []);

    return (
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <FmdGoodOutlinedIcon sx={{ color: 'text.secondary' }} />
            <InputBase
                inputRef={inputRef}
                label='Lokalizacja'
                variant='standard'
                sx={{ ml: 1, flexGrow: 1 }} 
            />
            <IconButton size='small' onClick={handleClearSelect}>
                <ClearIcon />
            </IconButton>
        </Box>
    );
}

export default PlaceAutocomplete;