const FeatureCard = ({ imageSrc, imageAlt, title, description }) => (
  <div className="feature-card">
    <img src={`images/${imageSrc}`} alt={imageAlt}></img>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default FeatureCard;
