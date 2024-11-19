const express = require("express");
const User = require("../models/User");
const Caregiver = require("../models/Caregiver");
const CaregiverAvailability = require("../models/CaregiverAvailability");
const CaregiverQualifications = require("../models/CaregiverQualifications");

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
      role: user.Role.name,
    };

    if (user.Role.name === "Caregiver") {
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

    res.json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile", async (req, res) => {
  const { userData, caregiverData } = req.body;

  try {
    const userId = req.session.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        Email: userData.email,
        Phone: userData.phone,
        Address: userData.address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUser.Role.name === "Caregiver" && caregiverData) {
      const updatedCaregiver = await Caregiver.findOneAndUpdate(
        { UserID: userId },
        {
          Experience: caregiverData.experience,
          HourlyRate: caregiverData.hourlyRate,
        },
        { new: true }
      );

      if (!updatedCaregiver) {
        return res.status(404).json({ message: "Caregiver details not found" });
      }

      await CaregiverAvailability.deleteMany({ CaregiverID: updatedCaregiver._id });
      const availabilityDocs = caregiverData.availability.map((day) => ({
        CaregiverID: updatedCaregiver._id,
        DayofWeek: day.dayOfWeek,
        StartTime: day.startTime,
        EndTime: day.endTime,
      }));
      await CaregiverAvailability.insertMany(availabilityDocs);

      await CaregiverQualifications.deleteMany({ CaregiverID: updatedCaregiver._id });
      const qualificationDocs = caregiverData.qualifications.map((qualification) => ({
        CaregiverID: updatedCaregiver._id,
        QualificationID: qualification, // Ensure qualification is sent as an ObjectID
      }));
      await CaregiverQualifications.insertMany(qualificationDocs);
    }

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
