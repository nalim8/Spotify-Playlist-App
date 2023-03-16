import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js'

export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  
  return (
    <div className="TrackList">
      <ul>
        {tracks && tracks.map(track => (
          <Track
            track={track}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        ))}
      </ul>
    </div>
  );
};
