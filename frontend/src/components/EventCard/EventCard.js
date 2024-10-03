import React from 'react';
import '../../css/card.css'; // Assuming you have a CSS file for styling

const Card = () => {
  return (
    <div className="card">
      <div className="image-placeholder"></div>
      <h2>Event Name </h2>
      <div className="rating">
      <p> this is the event where all can partciante.</p>
      </div>
      <p>Available: Weekdays</p>
      <button>More info</button>
    </div>
  );
};

export default Card;
