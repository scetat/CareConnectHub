import React, { useState } from "react";
import "../css/manageProfile.css";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import DayAvailability from "../components/DayAvailability";

const ProfileSection = ({ title, children }) => (
  <section className="profile-section">
    <h2>{title}</h2>
    {children}
  </section>
);

const ManageProfile = () => {
  const [userData, setUserData] = useState({
    email: "",
    address: "",
    phone: "",
  });

  const [caregiverData, setCaregiverData] = useState({
    experience: "",
    hourlyRate: "",
    qualifications: "",
    availability: {
      Monday: { start: "", end: "" },
      Tuesday: { start: "", end: "" },
      Wednesday: { start: "", end: "" },
      Thursday: { start: "", end: "" },
      Friday: { start: "", end: "" },
      Saturday: { start: "", end: "" },
      Sunday: { start: "", end: "" },
    },
  });

  const handleUserDataChange = (field) => (e) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleCaregiverDataChange = (field) => (e) => {
    setCaregiverData({ ...caregiverData, [field]: e.target.value });
  };

  const handleAvailabilityChange = (day, type) => (e) => {
    setCaregiverData({
      ...caregiverData,
      availability: {
        ...caregiverData.availability,
        [day]: { ...caregiverData.availability[day], [type]: e.target.value },
      },
    });
  };

  const qualificationOptions = ["CNA", "LPN", "RN", "Home Health Aide", "Personal Care Assistant"];

  return (
    <div className="manage-profile">
      <h1>Manage Profile</h1>

      <ProfileSection title="Personal Information">
        <form>
          <InputField
            label="Email"
            type="email"
            value={userData.email}
            onChange={handleUserDataChange("email")}
          />
          <InputField
            label="Address"
            type="text"
            value={userData.address}
            onChange={handleUserDataChange("address")}
          />
          <InputField
            label="Phone"
            type="tel"
            value={userData.phone}
            onChange={handleUserDataChange("phone")}
          />
          <button type="submit" className="submit-button">
            Update Personal Information
          </button>
        </form>
      </ProfileSection>

      <ProfileSection title="Caregiver Information">
        <form>
          <InputField
            label="Experience (years)"
            type="number"
            value={caregiverData.experience}
            onChange={handleCaregiverDataChange("experience")}
          />
          <InputField
            label="Hourly Rate ($)"
            type="number"
            value={caregiverData.hourlyRate}
            onChange={handleCaregiverDataChange("hourlyRate")}
          />
          <SelectField
            label="Qualifications"
            options={qualificationOptions}
            value={caregiverData.qualifications}
            onChange={handleCaregiverDataChange("qualifications")}
          />

          <div className="availability-section">
            <h3>Availability</h3>
            {Object.entries(caregiverData.availability).map(([day, times]) => (
              <DayAvailability
                key={day}
                day={day}
                start={times.start}
                end={times.end}
                onStartChange={handleAvailabilityChange(day, "start")}
                onEndChange={handleAvailabilityChange(day, "end")}
              />
            ))}
          </div>

          <button type="submit" className="submit-button">
            Update Caregiver Information
          </button>
        </form>
      </ProfileSection>
    </div>
  );
};

export default ManageProfile;
