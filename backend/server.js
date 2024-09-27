const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 


const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url} with body:`, req.body);
  next();
});

// MongoDB connection
mongoose.connect('mongodb+srv://atarsariya4295:Adarsh1202@cluster0.czaz8uw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
  });

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CareConnectHub API is running');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
