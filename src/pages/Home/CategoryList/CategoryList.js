import React from 'react';
import { Box, Chip, List, ListItem, Typography } from '@mui/material';

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <Box p={2}>
            <Typography variant='h6' gutterBottom sx={{ color: 'text.primary' }}>Kategorie</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 1 }}>
                {categories.map((category) => (
                    <Chip  
                        key={category.id}
                        label={category.name} 
                        variant='outlined'
                        clickable
                        onClick={() => setSelectedCategory(category.name)}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default CategoryList;