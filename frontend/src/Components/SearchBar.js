import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Import the CSS file for additional styling

const SearchBar = ({ setProduct }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/products/search`, {
                params: { query: searchTerm }
            });
            setProduct(response.data); // Update the product list with search results
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar-form">
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

export default SearchBar;
