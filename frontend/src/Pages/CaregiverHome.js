import React from "react";
import "../css/home.css";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";

const CaregiverHome = () => {
  return (
    <div className="home">
      <HeroSection heroImage={"caregiver.png"} />

      <main className="main-content">
        <div className="feature-container">
          <FeatureCard
            imageSrc="medical.png"
            imageAlt="Caregivers"
            title="Find Care Opportunities"
            description="Discover caregiving opportunities that match your skills and schedule. Whether you're seeking full-time, part-time, or occasional work, we connect you with families who need your support and expertise, ensuring a fulfilling caregiving experience."
          />
          <FeatureCard
            imageSrc="caregiver-career.png"
            imageAlt="Care support"
            title="Build Your Caregiver Profile"
            description="Showcase your experience and qualifications by building a professional profile. Highlight your skills, availability, and areas of expertise to attract the right clients, and let families know how you can provide exceptional care."
          />
        </div>
      </main>
    </div>
  );
};

export default CaregiverHome;
