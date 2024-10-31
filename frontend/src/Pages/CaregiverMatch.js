import React from 'react';
import '../css/caregivermatch.css';
import { useNavigate } from 'react-router-dom';

const CaregiverMatch = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button click
  const handleMoreInfoClick = () => {
    navigate('/moreinfo'); // Navigate to the More Info page
  };
  return (
    <div className="caregiver-container">
      <header>
        <h1>Caregiver Match</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search Caregivers..." />
          <button className="search-btn">Search</button>
        </div>
      </header>

      <div className="filter-results-container">
        {/* Filter Section */}
        <div className="filter-section">
          <h2>Filter By</h2>
          <div className="filter-group">
            <label htmlFor="experience">Experience</label>
            <select id="experience">
              <option value="1-6">1-6 Years</option>
              <option value="6-10">6-10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" placeholder="Enter Zip Code" />
          </div>

          <div className="filter-group">
            <label htmlFor="rating">Rating</label>
            <select id="rating">
              <option value="4-star">4 Star</option>
              <option value="5-star">5 Star</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="availability">Availability</label>
            <select id="availability">
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h2>Results</h2>
          <div class="card-container">
          <div className="result-card">
            <div className="result-image"></div>
            <div className="result-info">
              <h3>John Doe</h3>
              <p><strong>Rating:</strong> ★★★★★</p>
              <p>Available: Weekdays</p>
              <button onClick={handleMoreInfoClick}>More info</button>
            </div>
          </div>
          <div className="result-card">
            <div className="result-image"></div>
            <div className="result-info">
              <h3>John Doe</h3>
              <p><strong>Rating:</strong> ★★★★★</p>
              <p>Available: Weekdays</p>
              <button onClick={handleMoreInfoClick}>More info</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverMatch;
