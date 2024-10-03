const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/eventRoutes');
const path = require('path');

const app = express();

// Middleware to handle JSON requests
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); 

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url} with body:`, req.body);
  next();
});

// MongoDB connection (using the second file's URI)
mongoose.connect('mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

// Serve React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback route to serve the React app for all other paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.send('CareConnectHub API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
