import React, { useState, useEffect } from "react";
import "../css/manageProfile.css";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://careconnecthub-backend.onrender.com/api/profile", {
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
        console.log("data: ", data);

        const user = JSON.parse(localStorage.getItem("user") || "{}");

        // Set user data and caregiver data (if available) in state
        setUserData({
          email: data.email,
          address: data.address,
          phone: data.phone,
          role: user.role,
        });

        if (user.role === "Caregiver" && data.caregiverData) {
          setCaregiverData({
            experience: data.caregiverData.experience || "",
            hourlyRate: data.caregiverData.hourlyRate.$numberDecimal || "",
            qualifications: data.caregiverData.qualifications || "",
            availability: data.caregiverData.availability || {},
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

  // Handler for updating personal information
  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    try {
      const response = await fetch("https://careconnecthub-backend.onrender.com/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error updating personal information");
      }

      const resData = await response.json();
      alert(resData.message || "Personal information updated successfully");
      return;
    } catch (err) {
      alert(err.message);
    }
  };

  // Handler for updating caregiver information
  const handleCaregiverInfoSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    if (userData.role !== "Caregiver") {
      setError("Only caregivers can update caregiver information.");
      return;
    }

    try {
      const response = await fetch("https://careconnecthub-backend.onrender.com/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caregiverData,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error updating caregiver information");
      }

      const resData = await response.json();
      alert(resData.message || "Caregiver information updated successfully");
      return;
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  // Display both success and error messages
  return (
    <div className="manage-profile">
      <h1>Manage Profile</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Personal Information Form */}
      <form onSubmit={handlePersonalInfoSubmit}>
        <ProfileSection title="Personal Information">
          <InputField
            label="Email"
            type="email"
            value={userData.email}
            onChange={handleUserDataChange("email")}
            required
          />
          <InputField
            label="Address"
            type="text"
            disabled={true}
            value={userData.address}
            onChange={handleUserDataChange("address")}
            required
          />
          <InputField
            label="Phone"
            type="tel"
            value={userData.phone}
            onChange={handleUserDataChange("phone")}
            required
          />
          <button type="submit" className="submit-button">
            Update Personal Information
          </button>
        </ProfileSection>
      </form>

      {/* Conditionally render the Caregiver Information section if the user is a caregiver */}
      {userData.role === "Caregiver" && caregiverData && (
        <form onSubmit={handleCaregiverInfoSubmit}>
          <ProfileSection title="Caregiver Information">
            <InputField
              label="Experience (years)"
              type="number"
              value={caregiverData.experience}
              onChange={handleCaregiverDataChange("experience")}
              required
            />
            <InputField
              label="Hourly Rate ($)"
              type="number"
              value={caregiverData.hourlyRate}
              onChange={handleCaregiverDataChange("hourlyRate")}
              required
            />
            <SelectField
              label="Qualifications"
              options={qualificationOptions}
              value={caregiverData.qualifications}
              onChange={handleCaregiverDataChange("qualifications")}
              required
            />
            <button type="submit" className="submit-button">
              Update Caregiver Information
            </button>
          </ProfileSection>
        </form>
      )}
    </div>
  );
};

export default ManageProfile;
