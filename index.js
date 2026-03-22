require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/health', (req, res) => {
  res.send('API is running');
});

// Example GET
app.get('/episode', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

const PORT = process.env.PORT || 3759;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});