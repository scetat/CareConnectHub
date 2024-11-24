const express = require('express');
const Appointment = require('../models/Appointment');
const Address = require('../models/Address');
const State = require('../models/State');  
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const {
      UserID,
      CaregiverID,
      Date,
      Time,
      houseNo,
      street,
      city,
      zipCode,
      stateName,  
      Note = ''
    } = req.body;

    // Find the State document by its name
    const state = await State.findOne({ StateName: stateName });

    if (!state) {
      return res.status(400).json({
        success: false,
        message: 'State not found.'
      });
    }

    // Save the address first
    const newAddress = new Address({
      houseNo,
      Street: street,
      City: city,
      ZipCode: zipCode,
      State: state._id  
    });

    const savedAddress = await newAddress.save();

    // Create the appointment
    const newAppointment = new Appointment({
      UserID,
      CaregiverID,
      Date,
      Time,
      StatusID: "pending",
      Note,
      AddressID: savedAddress._id
    });

    const savedAppointment = await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: 'Appointment created successfully!',
      data: savedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment.',
      error: error.message
    });
  }
});

module.exports = router;
