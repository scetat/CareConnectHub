const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Replace with your User model

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('Role').populate('Address'); // Fetch all users with populated fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
