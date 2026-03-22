const express = require('express');
const app = express();

app.use(express.json());


app.get('/health', (req, res) => {
  res.send('API is running');
});

// Example GET
app.get('/episode', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

// Example POST
app.post('/show', (req, res) => {
  const user = req.body;
  res.json({ message: 'User created', user });
});

const PORT = 3759;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});