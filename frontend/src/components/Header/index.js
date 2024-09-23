// Header.js
import React from 'react';
import '../../css/style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/logo.png" alt="Care Connect Hub" />
      </div>
      <nav className="header__nav">
        <a href="/home" className="header__link header__link--active">HOME</a>
        <a href="/events" className="header__link">EVENT</a>
        <a href="/caregiver" className="header__link">CAREGIVER</a>
        <a href="/booking" className="header__link">BOOKING</a>
        <a href="/about" className="header__link">ABOUT US</a>
      </nav>
      <button className="header__signup">Sign-up</button>
    </header>
  );
};

export default Header;
