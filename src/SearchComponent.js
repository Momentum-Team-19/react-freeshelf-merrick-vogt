import React from 'react';

const SearchComponent = ({ searchQuery, setSearchQuery, sortOption, setSortOption }) => {
  return (
    <div className="container my-4 text-center">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control shadow-sm search-input animate__animated animate__fadeIn search-bar"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{border: "2px solid #7a3300", padding: "10px", borderRadius: "5px"}}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select shadow-sm animate__animated animate__fadeIn dropdown-filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{border: "2px solid #7a3300", padding: "10px", borderRadius: "5px"}}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
