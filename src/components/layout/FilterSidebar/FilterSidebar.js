import React, { useState } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange }) => {
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');

    const handleCityChange = (event) => {
        setCity(event.target.value);
        onFilterChange(event.target.value, category);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        onFilterChange(city, event.target.value);
    };

    return (
        <div className="filter-sidebar">
            <div className="filter-group">
                <label htmlFor="city">Miasto</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Wpisz miasto"
                />
            </div>
            <div className="filter-group">
                <label htmlFor="category">Kategoria</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    placeholder="Wpisz kategorie"
                />
            </div>
        </div>
    );
};

export default FilterSidebar;
