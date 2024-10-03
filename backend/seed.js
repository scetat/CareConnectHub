const mongoose = require('mongoose');
const Event = require('./models/event'); // Import your model

mongoose.connect('mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    return Event.insertMany([
      {
        name: 'Music Festival 2024',
        description: 'A vibrant celebration of music and culture.',
        imageUrl: 'https://example.com/musicfest.jpg'
      },
      {
        name: 'Tech Conference 2024',
        description: 'A global gathering for tech enthusiasts and professionals.',
        imageUrl: 'https://example.com/techconference.jpg'
      },
    ]);
  })
  .then(() => {
    console.log('Sample events inserted');
    mongoose.connection.close(); // Close the connection after seeding
  })
  .catch(err => console.error('Error inserting events:', err));
