import React, { useState, useEffect } from "react";
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
    role: "",
  });
  const [caregiverData, setCaregiverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Error fetching profile data");
        }

        const data = await response.json();

        // Set user data and caregiver data (if available) in state
        setUserData({
          email: data.email,
          address: data.address,
          phone: data.phone,
          role: data.role,
        });

        if (data.role === "Caregiver") {
          setCaregiverData({
            experience: data.caregiverData.experience,
            hourlyRate: data.caregiverData.hourlyRate,
            qualifications: data.caregiverData.qualifications,
            availability: data.caregiverData.availability,
          });
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

      {/* Conditionally render the Caregiver Information section if the user is a caregiver */}
      {userData.role === "Caregiver" && caregiverData && (
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
              {caregiverData.availability.map((day) => (
                <DayAvailability
                  key={day.dayOfWeek}
                  day={day.dayOfWeek}
                  start={day.startTime}
                  end={day.endTime}
                  onStartChange={handleAvailabilityChange(day.dayOfWeek, "start")}
                  onEndChange={handleAvailabilityChange(day.dayOfWeek, "end")}
                />
              ))}
            </div>

            <button type="submit" className="submit-button">
              Update Caregiver Information
            </button>
          </form>
        </ProfileSection>
      )}
    </div>
  );
};

export default ManageProfile;
