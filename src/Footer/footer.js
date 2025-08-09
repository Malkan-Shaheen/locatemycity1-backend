import React from 'react';
import './footer.css';
import logo from './../images/Logoo.png'; // Replace with your actual logo path
import twitterIcon from './../images/prime_twitter.png'; // or x.png depending on your asset
const Footer = () => {
  return (
    <footer className="footer">
      {/* Eclipse Blur Effect */}
      <div className="footer-eclipse"></div>

      <div className="footer-content">
        <img src={logo} alt="Project Black Logo" className="footer-logo" />

        <div className="footer-bottom">
          <p className="footer-left">
            Project Black © 2025 Copyright. All rights reserved.
          </p>

          <div className="footer-links">
            <button className="footer-link" onClick={() => console.log('Privacy clicked')}>Privacy</button>
            <button className="footer-link" onClick={() => console.log('Terms clicked')}>Terms</button>
            <button className="footer-icon" onClick={() => console.log('Twitter clicked')}>
  <img src={twitterIcon} alt="Twitter" className="footer-icon" />
</button>
            <button className="footer-icon" onClick={() => console.log('Facebook clicked')}><i className="fab fa-facebook-f"></i></button>
            <button className="footer-icon" onClick={() => console.log('Instagram clicked')}><i className="fab fa-instagram"></i></button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
