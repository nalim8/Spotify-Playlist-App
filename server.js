if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTH_ENDPOINT = process.env.AUTH_ENDPOINT;
const RESPONSE_TYPE = "token";

const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-public`;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.get('/login', (req, res) => {
  res.redirect(LOGIN_URL);
});

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    return token;
  }
  return null;
}

app.get('/search', async (req, res) => {
  try {
    const { q, type } = req.query;
    const token = extractToken(req);
    console.log('token', token)
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});