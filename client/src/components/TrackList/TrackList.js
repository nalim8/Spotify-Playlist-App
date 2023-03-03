import React, { useState } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js'

export default function TrackList(props) {
  
  const tracks = props.tracks.map(track => (
    <Track
      track={track}
      key={track.id}
      onAdd={props.onAdd}
      onRemove={props.onRemove}
      isRemoval={props.isRemoval}
    />
  ));

  return (
    <div className="TrackList">
      <ul>{tracks}</ul>
    </div>
  );
};
