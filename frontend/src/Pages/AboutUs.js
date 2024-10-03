import React from 'react';
import '../css/about.css';
import aboutImage1 from '../Assests/images/aboutus_1.jpg'; 
//aboutus_1(Seniors connecting):-https://www.istockphoto.com/signature/photo/two-senior-men-discussing-on-park-bench-gm1289142883-384904012
import aboutImage2 from '../Assests/images/aboutus_2.jpg'; 
//aboutus_2(Seniors enjoying):- https://www.istockphoto.com/photo/theres-nothing-better-than-enjoying-a-bike-ride-together-gm684059538-125611075
import aboutImage3 from '../Assests/images/aboutus_3.jpg'; 
// aboutus_3(Caregiver working):- https://www.istockphoto.com/photo/mature-man-looking-at-a-digital-tablet-that-a-colleague-is-showing-at-work-gm1356386941-430573310

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <h2>About Us</h2>
        <div className="about-content">
          <img src={aboutImage1} alt="Seniors connecting" className="about-image" />
          <p>Connecting seniors with compassionate care and dedicated support, ensuring they live with dignity and joy.</p>
        </div>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <div className="vision-content">
          <p>We envision a world where seniors receive personalized care tailored to their unique needs, creating a supportive community that values independence and connection.</p>
          <img src={aboutImage2} alt="Seniors enjoying" className="about-image2" />
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How IT Works</h2>
        <div className="how-it-works-content">
          <img src={aboutImage3} alt="Caregiver working" className="about-image3" />
          <ul>
            <li>Sign Up: Register as a user or caregiver.</li>
            <li>Find a Caregiver: Browse and filter caregivers based on your needs.</li>
            <li>Book Appointments: Schedule care or volunteer services.</li>
            <li>Join Events: RSVP to local senior events and workshops.</li>
            <li>Manage Care: Track your appointments and update your profile.</li>
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="map-container">
          <iframe
            title="Store Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091466!2d144.95373631568158!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0d7f7339%3A0xf42a3da3ef134ee5!2s123%20Caregiver%20St.%2C%20City%2C%20Country!5e0!3m2!1sen!2sus!4v1632538496152!5m2!1sen!2sus"
            width="355"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <p>Email: support@.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Office Address: 123 Caregiver St., City, Country</p>
      </section>
    </div>
  );
};

export default About;