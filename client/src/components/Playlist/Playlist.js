import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

export default function Playlist({ playlistTracks, onRemove, onNameChange, onSave }) {
    
  function handleNameChange(e) {
    e.onNameChange();
  }

  return (
    <div className="Playlist">
      <input defaultValue={'New Playlist'} onChange={handleNameChange} />
      <TrackList 
        tracks={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  )
}