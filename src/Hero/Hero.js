import React from 'react';
import './Hero.css';
import FlipClock from './CountdownClock';

const ProjectBlackLanding = () => {
  return (
    <div className="hero-container">
      <div className="section-container">
        <div className="overlay" />
        <div className="content">
          <div className="heading-container">
            <h1 className="heading">Project BLACK</h1>
            <img className='img-frame' src="/images/frame-hero.png" alt="Frame" />
          </div>

          <p className="subtitle">BE A PART OF THE MOVEMENT</p>
          <p className="description">
            A Movement Dedicated To Elevating Black Excellence And Success.<br />
            We Reshape Narratives, Fund Innovation, And Create Opportunities For Lasting Legacies.
          </p>
          <button className="cta-button">Get Updates</button>

          <div className="countdown-wrapper">
            <p className="coming-soon">Coming Soon (31 December 2025)</p>
            <FlipClock /> {/* ✅ Inserted here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBlackLanding;
