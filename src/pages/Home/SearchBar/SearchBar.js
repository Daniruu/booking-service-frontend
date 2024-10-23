import React from 'react';
import { Box, Chip, Divider, Icon, InputBase, Paper } from '@mui/material';
import PlaceAutocomplete from '../../../components/inputs/PlaceAutocomplete';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchTerms, setSearchTerms, selectedCategory, setSelectedCategory }) => {
    return (
        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            
            {selectedCategory ? (
                <Chip
                    label={selectedCategory}
                    onDelete={() => setSelectedCategory('')}
                    sx={{ mr: 1 }}
                />
            ) : (
                <SearchIcon sx={{ color: 'text.secondary' }} />
            )}
            <InputBase 
                sx={{ ml: 1, flexGrow: 1 }} 
                placeholder='Wpisz nazwę firmy lub kategorię'
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
            />
        </Box>
    );
}

export default SearchBar;