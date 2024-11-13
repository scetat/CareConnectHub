import React, { useState,useEffect } from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import LogoutButton from '../Logout/logout';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');

    const savedActiveLink = localStorage.getItem('activeLink') || 'home';
    setActiveLink(savedActiveLink);
  }, []);

  const handleLinkClick = (link) => {
    if (activeLink !== link) {
      setActiveLink(link);
      localStorage.setItem('activeLink', link);
      setIsMenuOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
  };

  const resetHeader = () => {
    setIsLoggedIn(false);
    setActiveLink('home');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('activeLink', 'home');
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
          onClick={() => handleLinkClick('Home')}
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
          to="/appointment"
          className={`header__link ${activeLink === 'appointment' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('appointment')}
        >
          APPOINTMENT
        </Link>
        <Link
          to="/booking"
          className={`header__link ${activeLink === 'booking' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('booking')}
        >
          BOOKING
        </Link>
        <Link
          to="/about"
          className={`header__link ${activeLink === 'about' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('about')}
        >
          ABOUT US
        </Link>
      </div>

      {/* Conditionally render the profile button with dropdown */}
      {isLoggedIn ? (
        <div className="header__profile-container">
          <button className="header__profile" onClick={toggleDropdown}>P</button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/manage" className="dropdown-item">Profile</Link>
              <LogoutButton resetHeader={resetHeader} />
            </div>
          )}
        </div>
      ) : (
        <Link to="/signup">
          <button className="header__signup">Sign-up</button>
        </Link>
      )}

      <button className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776; {/* Hamburger icon */}
      </button>
    </header>
  );
};

export default Header;