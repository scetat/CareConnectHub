import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/caregivermatch.css';

const CaregiverMatch = () => {
  const [allCaregivers, setAllCaregivers] = useState([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [hourlyRateFilter, setHourlyRateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/caregiver');
        const data = await response.json();
        const caregivers = data.data.map(caregiver => ({
          ...caregiver,
          Experience: parseFloat(caregiver.Experience.$numberDecimal || caregiver.Experience),
          HourlyRate: parseFloat(caregiver.HourlyRate.$numberDecimal || caregiver.HourlyRate),
          Rating: parseFloat(caregiver.Rating.$numberDecimal || caregiver.Rating),
        }));

        setAllCaregivers(caregivers);
        setFilteredCaregivers(caregivers);
      } catch (error) {
        console.error("Error fetching caregiver data:", error);
      }
    };

    fetchCaregivers();
  }, []);

  useEffect(() => {
    let result = allCaregivers;

    if (experienceFilter) {
      result = result.filter(caregiver => parseFloat(caregiver.Experience) >= parseFloat(experienceFilter));
    }
    if (ratingFilter) {
      result = result.filter(caregiver => parseFloat(caregiver.Rating) >= parseFloat(ratingFilter));
    }
    if (hourlyRateFilter) {
      result = result.filter(caregiver => parseFloat(caregiver.HourlyRate) <= parseFloat(hourlyRateFilter));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(caregiver =>
        caregiver.UserID.FirstName.toLowerCase().includes(query) ||
        caregiver.UserID.LastName.toLowerCase().includes(query)
      );
    }

    setFilteredCaregivers(result);
  }, [experienceFilter, ratingFilter, hourlyRateFilter, searchQuery, allCaregivers]);

  const handleMoreInfoClick = (caregiver) => {
    navigate('/moreinfo', { state: { caregiver } });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="caregiver-container">
      <header>
        <h1>Caregiver Match</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Caregivers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
        <button className="search-btn" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <div className="filter-results-container">
        <div className="filter-section">
          <h2>Filter By</h2>
          <div className="filter-group">
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="4">4+ Years</option>
              <option value="5">5+ Years</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="4">4+ Stars</option>
              <option value="5">5+ Stars</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="hourlyRate">Hourly Rate (Max)</label>
            <input
              type="number"
              id="hourlyRate"
              value={hourlyRateFilter}
              placeholder="e.g., 25"
              onChange={(e) => setHourlyRateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="results-section">
          <h2>Results</h2>
          <div className="card-container">
            {filteredCaregivers.map(caregiver => (
              <div key={caregiver.UserID._id} className="result-card">
                <div className="result-info">
                  <h3>{caregiver.UserID.FirstName} {caregiver.UserID.LastName}</h3>
                  <p><strong>Experience:</strong> {caregiver.Experience} years</p>
                  <p><strong>Rating:</strong> {caregiver.Rating} ★</p>
                  <p><strong>Hourly Rate:</strong> ${caregiver.HourlyRate}</p>
                  <button onClick={() => handleMoreInfoClick(caregiver)}>More info</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverMatch;
