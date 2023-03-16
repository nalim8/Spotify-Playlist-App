import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import axios from 'axios';
import { SERVER_URL } from "../../config/config.js";

function App() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])
  
  function addTrack(track) {
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  }

  function removeTrack(track) {
    setPlaylistTracks(prevTracks => prevTracks.filter(prevTrack => prevTrack.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  async function getUserId() {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.id;
  }

  async function createPlaylist(userId, playlistName) {
    const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, { name: playlistName }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('response', response)
    return response.data.id;
  }

  async function addTracksToPlaylist(playlistId, trackUris) {
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { uris: trackUris }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
  }

  function savePlaylist() {
    const trackUris = playlistTracks.map(track => `spotify:track:${track.id}`);
    getUserId().then(userId => {
      createPlaylist(userId, playlistName).then(playlistId => {
        addTracksToPlaylist(playlistId, trackUris).then(() => {
          setPlaylistName('New Playlist');
          setPlaylistTracks([]);
        });
      });
    });
  }

  const searchSongs = async (e) => {
    const { data } = await axios.get(`${SERVER_URL}/search`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "track"
      }
    })
    setSearchResults(data.tracks.items)
    console.log(searchResults)
  }

  const login = async () => {
    window.location.href = `${SERVER_URL}/login`;
  }

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div>
      <div className="App-header">
        <h1 className="App-header-title">Ja<span className="highlight">mmm</span>ing</h1>
        {!token ? (
          <button className="auth-button" onClick={login}>
            LOGIN
          </button>
        ) : (
          <button className="auth-button" onClick={logout}>
            LOGOUT
          </button>
        )}
      </div>       

      <div className="App">
        <SearchBar onSearch={searchSongs} setSearchKey={setSearchKey} />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack}
            onRemove={removeTrack}
          />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
