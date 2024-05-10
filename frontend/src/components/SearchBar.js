// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setParts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(`http://localhost:8070/parts?search=${searchTerm}`);
      setParts(response.data);
    } catch (error) {
      console.error('Error searching parts:', error);
    }
  };

  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
