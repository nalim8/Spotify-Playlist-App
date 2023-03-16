# Spotify-Playlist-App

with this React-App you can search for songs and add it to a public Spotify-Playlist.


## Running the app

1. This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

2. Run `npm install` in the server directory to install the server dependencies.

3. Run `npm start` in the server directory to start the server.

4. Run `npm install` in the client directory to install the client dependencies.

5. Run `npm start` in the client directory to start the client.

6. Start the app by starting both the server and the client. For development run `npm run dev` in the root directory.

7. Once the app is running locally, you can access it in a browser at `http://localhost:<your-port>`


## Dependencies

Server dependencies:
- express: 4.18.2
- dotenv: 16.0.3
- cors: 2.8.5
- axios: 1.2.2

Client dependencies:
- axios: 1.2.2
- react: 18.2.0
- react-dom: 18.2.0
