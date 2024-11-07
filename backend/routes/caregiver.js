const express = require('express');
const router = express.Router();
const Caregiver = require('../models/Caregiver');

router.post('/seed', async (req, res) => {
    const caregivers = [
        { 
            UserID: "6727c10ca236b0424d47e12d", 
            Experience: 5.0,
            HourlyRate: 25.00,
            Rating: 4.0,
            PhotoURL: "photos/john_doe.jpg" 
        },
        { 
            UserID: "6727ba4da236b0424d47e125",  
            Experience: 4.0,
            HourlyRate: 20.00,
            Rating: 3.0,
            PhotoURL: "photos/john_doe.jpg"
        },
        { 
            UserID: "6727b92fa236b0424d47e11c",  
            Experience: 5.0,
            HourlyRate: 30.00,
            Rating: 5.0,
            PhotoURL: "photos/maria_garcia.jpg"
        },
        { 
            UserID: "66fc7b9afc93713b83a10dc3", 
            Experience: 4.0,
            HourlyRate: 18.50,
            Rating: 3.0,
            PhotoURL: "photos/michael_brown.jpg"
        },
    ];

    try {
        await Caregiver.insertMany(caregivers);
        res.status(200).send("Caregivers data added successfully!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/', async (req, res) => { 
    try {
        const { experience, hourlyRate, rating } = req.query;
        
        // Build filter object
        const filter = {};
        if (experience) {
            filter.Experience = experience;
        }
        if (hourlyRate) {
            filter.HourlyRate = { $lte: parseFloat(hourlyRate) };
        }
        if (rating) {
            filter.Rating = { $gte: parseFloat(rating) };
        }

        const caregivers = await Caregiver.find().populate('UserID');
        res.status(200).json({message:"caregivers data" ,data: caregivers});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
