import React from 'react';

const SearchComponent = ({ searchQuery, setSearchQuery, sortOption, setSortOption }) => {
  return (
    <div>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search..."
      />

      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="oldest">Sort by Oldest Publication</option>
        <option value="newest">Sort by Newest Publication</option>
      </select>
    </div>
  );
};

export default SearchComponent;
