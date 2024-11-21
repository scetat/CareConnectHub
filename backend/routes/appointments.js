const express = require("express");
const Appointment = require("../models/Appointment");
const AppointmentStatus = require("../models/AppointmentStatus");
const Address = require("../models/Address");
const Client = require("../models/Client");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const caretakerId = req.session.user?.id; // Assuming session stores caretaker's user ID
    if (!caretakerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const appointments = await Appointment.find({ ClientID: caretakerId })
      .populate({
        path: "CaregiverID",
        populate: { path: "UserID", select: "FirstName LastName" },
      })
      .populate({
        path: "CaregiverID",
        select: "PhotoURL",
      })
      .populate("StatusID", "StatusName")
      .populate("AddressID");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/cancel", async (req, res) => {
  try {
    const caretakerId = req.session.user?.id;
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment || appointment.ClientID.toString() !== caretakerId) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const upcomingStatus = await AppointmentStatus.findOne({
      StatusName: "Upcoming",
    });
    if (!upcomingStatus || appointment.StatusID.toString() !== upcomingStatus._id.toString()) {
      return res.status(400).json({ message: "Only upcoming appointments can be cancelled" });
    }

    const cancelledStatus = await AppointmentStatus.findOne({
      StatusName: "Cancelled",
    });
    if (!cancelledStatus) {
      return res.status(500).json({ message: "Appointment status not configured" });
    }

    appointment.StatusID = cancelledStatus._id;
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/caregiver", async (req, res) => {
  try {
    const caregiverId = req.session.user?.id;
    if (!caregiverId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const appointments = await Appointment.find({ CaregiverID: caregiverId })
      .populate("ClientID", "FirstName LastName")
      .populate("StatusID", "StatusName")
      .populate("AddressID");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching caregiver appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
