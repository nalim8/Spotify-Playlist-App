import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('YOUR_ACCESS_TOKEN');

spotifyApi.searchTracks('SEARCH_TERM').then((response) => {
  console.log(response.tracks.items);
});

