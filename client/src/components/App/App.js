import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import axios from 'axios'

function App() {

  const CLIENT_ID = "b900ca51fa2741cca79701385f8c471f"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = Window.location.hashlet
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      const token = hash.substring(1).split({separator: "&"}).find(elem => elem.startsWith("access_token")).split({separator: "="})[1]
  
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])

  
  
  const [searchResults, setSearchResults] = useState([{name: 'By the Way', artist: 'Red Hot Chili Peppers', album: 'By the Way', id: 1}]);
  const [playlistName, setPlaylistName] = useState('Milans favorite songs');
  const [playlistTracks, setPlaylistTracks] = useState([{name: 'Hurricane', artist: 'Bob Dylan', album: 'Hurricane Album', id: 2}, {name: 'Gangstas Paradise', artist: 'Coolio', album: 'Gangstas Paradise', id: 3}]);
  

  
  function addTrack(track) {
    setPlaylistTracks(prevTracks => [...prevTracks, track]);
  }

  function removeTrack(track) {
    setPlaylistTracks(prevTracks => prevTracks.filter(prevTrack => prevTrack.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    // save playlist logic
    const trackURIs = playlistTracks;
  }

  const searchArtists = async (e) => {
    const {data} = await axios.get("http://api.spotify.com/v1/search", {
      headers: {
        Athorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  const logout = () => {
    setToken("")
    window.localStorage.removeitem("token")
  }

  return (
    <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a>
        : <button>Logout</button>}

        {token ? 
          <form onSubmit={searchArtists}>
            <input type="text" onhange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
          : <h2>Please login</h2>
        }

        <div className="App">
          <SearchBar onSearch={searchArtists} />
          <div className="App-playlist">
            <SearchResults 
              searchResult={searchResults} 
              onAdd={addTrack}
            />
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
            />
          </div>
        </div>
    </div>
  );
};

export default App;
