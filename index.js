require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { getShowById, getEpisodeByYoutubeId, getAllShows, getAllEpisodes } = require('./dbHelper');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/health', (req, res) => {
  res.send('API is running');
});

// Get show by ID
app.get('/show/:id', async (req, res) => {
  console.log('Show route accessed with ID:', req.params.id);
  try {
    console.log('Route hit: GET /show/:id with params:', req.params);
    const show = await getShowById(req.params.id);
    console.log('Result from getShowById:', show);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.json(show);
  } catch (error) {
    console.error('Error in /show/:id route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get episode by youtubeId
app.get('/episode/:youtubeId', async (req, res) => {
  try {
    const episode = await getEpisodeByYoutubeId(req.params.youtubeId);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3759;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});