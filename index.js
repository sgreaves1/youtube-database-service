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

// List all collections
app.get('/collections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ collections: collections.map(c => c.name) });
  } catch (error) {
    console.error('Error listing collections:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Show collection stats
app.get('/stats', async (req, res) => {
  console.log('Stats endpoint accessed');
  try {
    const db = mongoose.connection.db;
    const showCount = await db.collection('youtubeShow').countDocuments();
    const episodeCount = await db.collection('youtubeEpisode').countDocuments();
    
    console.log('Document counts - Shows:', showCount, 'Episodes:', episodeCount);
    
    res.json({
      database: db.databaseName,
      youtubeShow: { count: showCount },
      youtubeEpisode: { count: episodeCount }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
app.get('/episode/youtube/:youtubeId', async (req, res) => {
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

// Get all shows
app.get('/shows', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const shows = await getAllShows({ limit, skip });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all episodes
app.get('/episodes', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const episodes = await getAllEpisodes({ limit, skip });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example GET
app.get('/episode', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

const PORT = process.env.PORT || 3759;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});