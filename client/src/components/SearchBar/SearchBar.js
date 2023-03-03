import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  function search() {
    onSearch(term);
  }

  function handleTermChange(e) {
    setTerm(e.target.value);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
      <button className="SearchButton">SEARCH</button>
    </div>
  );
};
    