import React from 'react';
import './directory.css';
import seedImage from './../../images/child.png'; // Adjust path as needed
import { FaInstagram, FaTwitter, FaFacebookF, FaLink } from 'react-icons/fa';

const Directory = () => {
  return (
    <div className="directory-section">
      {/* Top Centered Heading */}
      <div className="directory-heading">
        <h1>Join the movement</h1>
        <h3>Fueling the Future of Black Innovation</h3>
      </div>

      {/* Left Side */}
      <div className="directory-left">
        <div className="side-icons">
          <div className="icon"><FaInstagram /></div>
          <div className="icon"><FaTwitter /></div>
          <div className="icon"><FaFacebookF /></div>
          <div className="icon"><FaLink /></div>
        </div>
        <div className="directory-content">
          <h2 className="directory-title">The Seed : Planted in the Directory</h2>
          <p className="directory-text">
            Your First Step into the Ecosystem <br />
            The Seed helps you begin your place in the culture. <br />
            Whether you're a brand, creator, or supporter, this entry-level listing gives you visibility, access, and community.
          </p>
          <p className="directory-text">
            What You Get: <br />
            • Verified spot in the ProjectBlack Directory (The Black Book) <br />
            • Access to culture-driven guidance <br />
            • Early supporter recognition (Digital badge for social media) <br />
            • Member-only updates, events and opportunities
          </p>
          <button className="join-btn">Join Now</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="directory-right">
        <img src={seedImage} alt="Child planting seed" className="directory-image" />
      </div>
    </div>
  );
};

export default Directory;
