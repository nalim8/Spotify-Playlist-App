import React from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, setSearchKey }) {

  function handleSearchKeyChange(e) {
    setSearchKey(e.target.value)
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchKeyChange}/>
      <button className="SearchButton" onClick={onSearch}>SEARCH</button>
    </div>
  );
};
    