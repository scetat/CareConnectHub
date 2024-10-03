import React, { useState } from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom'; // Use Link for routing

const Header = () => {
  const [activeLink, setActiveLink] = useState('home'); // Default active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close menu when a link is clicked
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
      <button className="header__signup">Sign-up</button>
      <button className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776; {/* Hamburger icon */}
      </button>
    </header>
  );
};

export default Header;