import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './SearchResults.css'

export default function SearchResults() {
    
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} /> 
    </div>
  );
};