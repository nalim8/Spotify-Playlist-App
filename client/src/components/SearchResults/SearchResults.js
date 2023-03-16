import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css'

export default function SearchResults({ searchResults, onAdd, onRemove }) {
    
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResults} onAdd={onAdd} onRemove={onRemove} isRemoval={false} /> 
    </div>
  );
};