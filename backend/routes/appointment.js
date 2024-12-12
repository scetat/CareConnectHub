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


router.get("/user/:userID", async (req, res) => {
  const { userID } = req.params;

  try {
    const appointments = await Appointment.find({ UserID: userID })
      .populate({
        path: "CaregiverID",
        populate: { path: "UserID", select: "FirstName LastName" },
      })
      .populate({
        path: "AddressID", 
        populate: { path: "State", select: "StateName" }, 
      });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: "No appointments found." });
    }

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve appointments.",
      error: error.message,
    });
  }
});


router.patch("/cancel/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    if (appointment.StatusID === "cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Appointment is already cancelled." });
    }

    appointment.StatusID = "cancelled";
    await appointment.save();

    res.status(200).json({ success: true, message: "Appointment cancelled successfully." });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel appointment.",
      error: error.message,
    });
  }
});


module.exports = router;
