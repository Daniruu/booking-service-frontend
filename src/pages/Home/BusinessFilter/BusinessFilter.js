import React, { useState } from 'react';
import { Box, Divider, Paper, Stack } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import PlaceAutocomplete from '../../../components/inputs/PlaceAutocomplete';
import CategoryList from '../CategoryList/CategoryList';
import categories from '../../../data/BusinessCategories.json';

const BusinessFilter = ({ selectedCategory, setSelectedCategory, setSelectedLocation, searchTerms, setSearchTerms }) => {
    
    const handlePlaceSelected = (place) => {
        const cityComponent = place.address_components.find(componetn => componetn.types.includes('locality'));

        const city = cityComponent ? cityComponent.long_name : place.name;

        setSelectedLocation(city);
    }; 

    return (
        <Paper elevation={2} sx={{ width: '100%' }}>
            <Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <SearchBar 
                        searchTerms={searchTerms}
                        setSearchTerms={setSearchTerms}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
                    <PlaceAutocomplete onPlaceSelected={handlePlaceSelected} setSelectedLocation={setSelectedLocation} />
                </Box>
                <Divider />
                <CategoryList 
                    categories={categories} 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </Stack>
        </Paper>
    );
}

export default BusinessFilter;