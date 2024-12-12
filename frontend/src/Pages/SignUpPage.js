import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    houseNo: "",
    street: "",
    city: "",
    zipCode: "",
    province: "",
    stateName: "",
    countryName: "",
    roleName: "Caretaker",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch("https://careconnecthub-backend.onrender.com/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        alert("User registered successfully!");
        //Redirection for future use.
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          houseNo: "",
          street: "",
          city: "",
          zipCode: "",
          province: "",
          stateName: "",
          countryName: "",
          roleName: "Caretaker",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message || "An error occurred during signup");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sign-up-container">
      <h1>
        <div className="form__logo">
          <img src="/logo.png" alt="Care Connect Hub" />
        </div>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Example@xyz.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123 456 7890"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="houseNo">House No.</label>
            <input
              type="text"
              id="houseNo"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
              placeholder="42"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Name</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Main St"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Cambridge"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Postal Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="N3E 1V9"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="ON"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stateName">State</label>
            <input
              type="text"
              id="stateName"
              name="stateName"
              value={formData.stateName}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="countryName">Country</label>
            <input
              type="text"
              id="countryName"
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              placeholder="Canada"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="roleName">Role Name</label>
            <select id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} required>
              <option value="Caretaker">Caretaker</option>
              <option value="Caregiver">Caregiver</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
      </form>
      <p className="login-link">
        Already Have an Account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
