import React, { useState, useEffect } from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom'; // Use Link for routing
import LogoutButton from '../Logout/logout';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility

  // Check login status from localStorage when component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');

    // Get the active link from localStorage
    const savedActiveLink = localStorage.getItem('activeLink') || 'home'; // Default to 'home' if not found
    setActiveLink(savedActiveLink);
  }, []); // Runs once when the component mounts

  const handleLinkClick = (link) => {
    if (activeLink !== link) {
      setActiveLink(link);
      localStorage.setItem('activeLink', link); // Save the active link to localStorage
      setIsMenuOpen(false); // Close menu on link click
    }
  };

  // Function to reset the header after logout
  const resetHeader = () => {
    setIsLoggedIn(false);
    setActiveLink('home'); // Reset active link to home
    localStorage.setItem('isLoggedIn', 'false'); // Update localStorage
    localStorage.setItem('activeLink', 'home'); // Update localStorage
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/logo.png" alt="Care Connect Hub" />
      </div>
      <div className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
        <Link
          to="/home"
          className={`header__link ${activeLink === 'home' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('home')}
        >
          HOME
        </Link>
        <Link
          to="/events"
          className={`header__link ${activeLink === 'events' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('events')}
        >
          EVENT
        </Link>
        <Link
          to="/caregiver"
          className={`header__link ${activeLink === 'caregiver' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('caregiver')}
        >
          CAREGIVER
        </Link>
        <Link
          to="/about"
          className={`header__link ${activeLink === 'about' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('about')}
        >
          ABOUT US
        </Link>
      </div>

      {/* Conditionally render the profile button or sign-up button based on login status */}
      {isLoggedIn ? (
        <>
          <div className="header__profile" onClick={toggleDropdown}>
            P
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                Profile
              </Link>
              <LogoutButton resetHeader={resetHeader} /> {/* Pass the resetHeader function */}
            </div>
          )}
        </>
      ) : (
        <Link to="/signup">
          <button className="header__signup">Sign-up</button>
        </Link>
      )}

      <button className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </button>
    </header>
  );
};

export default Header;
