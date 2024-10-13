import React, { useState } from 'react';
import { Box, TextField, List, ListItem, Typography, Stack } from '@mui/material';
import categories from '../../../data/BusinessCategories.json';

const FilterSidebar = ({ onFilterChange }) => {
    const [location, setLocation] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        onFilterChange(event.target.value, selectedCategory?.name || '');
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onFilterChange(location, category?.name || ''); // Учитываем пустую категорию при сбросе
    };

    return (
        <Box sx={{ padding: '16px', width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack spacing={4} mt={2}>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Lokalizacja
                    </Typography>
                    <TextField
                        id='city'
                        label='Miasto'
                        value={location}
                        onChange={handleLocationChange}
                        placeholder='Wpisz miasto'
                        variant='standard'
                        fullWidth
                    />
                </Box>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Kategoria
                    </Typography>
                    <List sx={{ maxHeight: 500, overflowY: 'auto', padding: 0 }}>
                        {/* Добавляем элемент для сброса категории */}
                        <ListItem 
                            button 
                            onClick={() => handleCategoryClick(null)} 
                            sx={{ 
                                padding: '8px 0',
                                borderRadius: 1,
                                color: selectedCategory === null ? 'primary.main' : 'inherit',
                                fontWeight: selectedCategory === null ? 'bold' : 'normal',
                                cursor: 'pointer'
                            }}
                        >
                            <Typography variant="body1" sx={{ px: 1 }}>
                                Wszystkie
                            </Typography>
                        </ListItem>
                        {categories.map((category) => (
                            <ListItem 
                                key={category.id} 
                                button 
                                onClick={() => handleCategoryClick(category)} 
                                sx={{ 
                                    padding: '8px 0',
                                    borderRadius: 1,
                                    color: category === selectedCategory ? 'primary.main' : 'inherit',
                                    fontWeight: category === selectedCategory ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                            >
                                <Typography variant="body1" sx={{ px: 1 }}>
                                    {category.name}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Stack>
        </Box>
    );
};

export default FilterSidebar;
