import React from "react";
import "../css/home.css";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  return (
    <div className="home">
      <HeroSection
        heroImage={"client-home.png"}
        heroText={"Helping Hands for Every Step of the Journey..."}
      />

      <main className="main-content">
        <div className="feature-container">
          <FeatureCard
            imageSrc="care.png"
            imageAlt="Caregivers"
            title="Expert Caregivers"
            description="Our experienced caregivers provide compassionate, personalized care tailored to each individual's needs. Trust us to deliver reliable support that enhances well-being, ensuring comfort and peace of mind for your loved ones."
          />
          <FeatureCard
            imageSrc="care-support.png"
            imageAlt="Care support"
            title="Supportive Care"
            description="Our supportive care services offer compassionate, tailored assistance to enhance the quality of life for seniors. We provide emotional and practical support, ensuring comfort, dignity, and peace of mind for families and their loved ones."
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
