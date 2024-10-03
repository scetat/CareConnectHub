import React, { useState, useEffect } from "react";
import "../css/home.css";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      const cachedContent = localStorage.getItem("homeContent");
      const cachedTimestamp = localStorage.getItem("homeContentTimestamp");

      //cache homepage for one hour
      if (cachedContent && cachedTimestamp && Date.now() - cachedTimestamp < 3600000) {
        setHomeContent(JSON.parse(cachedContent));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/home");
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }
        const data = await response.json();
        setHomeContent(data);
        localStorage.setItem("homeContent", JSON.stringify(data));
        localStorage.setItem("homeContentTimestamp", Date.now().toString());
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      <HeroSection heroImage={homeContent.heroImage} heroText={homeContent.heroText} />

      <main className="main-content">
        <div className="feature-container">
          <FeatureCard
            imageSrc={homeContent.iconA}
            imageAlt="Feature A"
            title={homeContent.headerA}
            description={homeContent.paragraphA}
          />
          <FeatureCard
            imageSrc={homeContent.iconB}
            imageAlt="Feature B"
            title={homeContent.headerB}
            description={homeContent.paragraphB}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
