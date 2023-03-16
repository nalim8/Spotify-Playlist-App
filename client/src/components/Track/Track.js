import React from 'react';
import './Track.css';

export default function Track({ track, onAdd, onRemove, isRemoval }) {

  function addTrack() {
    onAdd(track);
  }
  
  function removeTrack() {
    onRemove(track);
  }
  
  function renderAction() {
    if (isRemoval) {
      return <button className="Track-action" onClick={removeTrack}>-</button>;
    } else {
      return <button className="Track-action" onClick={addTrack}>+</button>;
    }
  }
  
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
          <p>{track.artists[0].name} | {track.album.name}</p>
      </div>
      {renderAction()}
    </div>
  );
}