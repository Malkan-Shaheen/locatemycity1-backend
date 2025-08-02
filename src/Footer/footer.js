import React from 'react';
import './footer.css';
import logo from './../images/Logoo.png'; // Replace with your actual logo path

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
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-icon"><i className="fab fa-x-twitter"></i></a>
            <a href="#" className="footer-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="footer-icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
