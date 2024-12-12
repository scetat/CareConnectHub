const express = require("express");
const Appointment = require("../models/Appointment");
const Caregiver = require("../models/Caregiver");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.session.user?.id;
    const caregiver = await Caregiver.findOne({ UserID: userId });
    if (!caregiver) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const caregiverId = caregiver._id;

    const appointments = await Appointment.find({ CaregiverID: caregiverId, StatusID: "pending" })
      .populate("UserID", "FirstName LastName")
      .populate("StatusID", "StatusName")
      .populate("AddressID");

    console.log(appointments);

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching caregiver appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/cancel", async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    if (appointment.StatusID === "cancelled") {
      return res.status(400).json({ success: false, message: "Appointment is already cancelled." });
    }

    appointment.StatusID = "cancelled";
    await appointment.save();

    res.status(200).json({ success: true, message: "Appointment cancelled successfully." });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
