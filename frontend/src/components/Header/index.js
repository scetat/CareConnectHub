import React, { useState } from 'react';
import '../../css/style.css';

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
        <a
          href="/home"
          className={`header__link ${activeLink === 'home' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('home')}
        >
          HOME
        </a>
        <a
          href="/events"
          className={`header__link ${activeLink === 'events' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('events')}
        >
          EVENT
        </a>
        <a
          href="/caregiver"
          className={`header__link ${activeLink === 'caregiver' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('caregiver')}
        >
          CAREGIVER
        </a>
        <a
          href="/booking"
          className={`header__link ${activeLink === 'booking' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('booking')}
        >
          BOOKING
        </a>
        <a
          href="/about"
          className={`header__link ${activeLink === 'about' ? 'header__link--active' : ''}`}
          onClick={() => handleLinkClick('about')}
        >
          ABOUT US
        </a>
      </div>
      <button className="header__signup">Sign-up</button>
      <button className="header__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776; {/* Hamburger icon */}
      </button>
    </header>
  );
};

export default Header;
