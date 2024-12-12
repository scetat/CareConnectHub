const express = require("express");
const User = require("../models/User");
const Caregiver = require("../models/Caregiver");
const CaregiverAvailability = require("../models/CaregiverAvailability");
const CaregiverQualifications = require("../models/CaregiverQualifications");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.session.user.id;

    // Fetch user data
    const user = await User.findById(userId).populate("Role").populate("Address");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressObj = user.Address;
    const address = `${addressObj.houseNo} ${addressObj.Street}, ${addressObj.City}, ${addressObj.ZipCode}`;

    const profileData = {
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      phone: user.Phone,
      address: address,
      role: user.Role.RoleName,
    };

    if (user.Role.RoleName === "Caregiver") {
      const caregiver = await Caregiver.findOne({ UserID: userId });
      if (!caregiver) {
        return res.status(404).json({ message: "Caregiver details not found" });
      }

      // Fetch caregiver availability
      const availability = await CaregiverAvailability.find({ CaregiverID: caregiver._id });

      const qualifications = await CaregiverQualifications.find({ CaregiverID: caregiver._id })
        .populate("QualificationID")
        .select("QualificationID");

      profileData.caregiverData = {
        experience: caregiver.Experience,
        hourlyRate: caregiver.HourlyRate,
        rating: caregiver.Rating,
        photoURL: caregiver.PhotoURL,
        availability: availability.map((item) => ({
          dayOfWeek: item.DayofWeek,
          startTime: item.StartTime,
          endTime: item.EndTime,
        })),
        qualifications: qualifications.map((qual) => qual.QualificationID.name),
      };
    }

    res.status(200).json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", async (req, res) => {
  const { userData, caregiverData } = req.body;

  try {
    const userId = req.session.user.id;

    const user = await User.findById(userId).populate("Role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data if provided
    if (userData) {
      user.Email = userData.email;
      user.Phone = userData.phone;

      await user.save();
    }

    if (caregiverData && user.Role.RoleName === "Caregiver") {
      const caregiver = await Caregiver.findOne({ UserID: userId });
      if (!caregiver) {
        return res.status(404).json({ message: "Caregiver details not found" });
      }

      if (caregiverData.experience !== undefined) caregiver.Experience = caregiverData.experience;
      if (caregiverData.hourlyRate !== undefined)
        caregiver.HourlyRate = mongoose.Types.Decimal128.fromString(caregiverData.hourlyRate);

      await caregiver.save();

      // Update Availability
      // if (caregiverData.availability) {
      //   // Delete existing availability
      //   await CaregiverAvailability.deleteMany({ CaregiverID: caregiver._id });

      //   // Insert new availability
      //   const availabilityDocs = Object.keys(caregiverData.availability).map((day) => ({
      //     CaregiverID: caregiver._id,
      //     DayofWeek: day,
      //     StartTime: caregiverData.availability[day].start || "",
      //     EndTime: caregiverData.availability[day].end || "",
      //   }));
      //   await CaregiverAvailability.insertMany(availabilityDocs);
      // }

      // Update Qualifications
      // if (caregiverData.qualifications) {
      //   // Delete existing qualifications
      //   await CaregiverQualifications.deleteMany({ CaregiverID: caregiver._id });

      //   // Insert new qualifications
      //   // Assuming qualifications are sent as an array of qualification names
      //   // You need to convert them to ObjectIDs based on your Qualification model
      //   // Here's a simplified approach:

      //   // First, find all Qualification IDs based on names
      //   const Qualification = require("../models/Qualification"); // Adjust the path as necessary
      //   const qualifications = await Qualification.find({
      //     name: { $in: caregiverData.qualifications },
      //   });

      //   const qualificationDocs = qualifications.map((qual) => ({
      //     CaregiverID: caregiver._id,
      //     QualificationID: qual._id,
      //   }));

      //   await CaregiverQualifications.insertMany(qualificationDocs);
      // }
    }

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
