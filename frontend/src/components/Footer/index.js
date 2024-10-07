import React from 'react';
import '../../css/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <div className="footer__logo">
            <img src="/logo.png" alt="Care Connect Hub" />
            <p className="footer__text">Helping Hands for Every Step of the Journey...</p>
          </div>
          <div className="footer__nav">
            <a href="/home" className="footer__link">HOME</a>
            <a href="/events" className="footer__link">EVENT</a>
            <a href="/caregiver" className="footer__link">CAREGIVER</a>
            
            <a href="/about" className="footer__link">ABOUT US</a>
          </div>
        </div>
        <div className="footer__right">
          <div className="footer__social">
            <h4>Get in Touch</h4>
            <p>Facebook &nbsp; Instagram &nbsp; Twitter &nbsp; LinkedIn</p>
          </div>
          <div className="footer__subscribe">
            <input type="email" placeholder="Email" className="footer__input" />
            <button className="footer__button">Subscribe</button>
          </div>
        </div>
      </div>
      <p className="footer__copy"> 2024, Care Connect Hub, All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;