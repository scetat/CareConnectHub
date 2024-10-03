const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // If CORS is still needed
const eventRoutes = require('./routes/eventRoutes'); // Import event routes

const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// Use CORS if your frontend and backend are on different ports
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error:', error));

// API Routes
app.use('/api', eventRoutes); // Use the event routes under '/api' path

// Serve React app (assuming you're using the same server for frontend)
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback route to serve the React app for all other paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
