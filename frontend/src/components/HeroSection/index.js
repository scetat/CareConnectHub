const HeroSection = ({ heroImage, heroText, opacity }) => {
  const overlayStyles = {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(/images/${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: opacity || 1.0,
    zIndex: 0,
  };

  return (
    <div className="hero-section">
      <div style={overlayStyles}></div>
      <h1>{heroText || ""}</h1>
    </div>
  );
};

export default HeroSection;
