import React, { useEffect, useState } from 'react';
import './Hero.css'; // Import the CSS

const ProjectBlackLanding = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-08-30T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

 const timerArray = Object.entries(timeLeft);

const timerComponents = timerArray.map(([unit, value], index) => (
  <React.Fragment key={index}>
    <div className="timer-unit">
      <div className="timer-box">
        <span className="timer-value">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="timer-label">{unit}</span>
    </div>
    {/* Add colon except after the last item */}
    {index < timerArray.length - 1 && (
      <span className="timer-colon">:</span>
    )}
  </React.Fragment>
));


  return (
    <div className="hero-container">
      <div className="overlay" />

      <div className="content">
       <img src="/heading.png" alt="Project Black Logo" className="heading-image" />

        <p className="subtitle">BE A PART OF THE MOVEMENT</p>
        <p className="description">
          A Movement Dedicated To Elevating Black Excellence And Success.<br />
          We Reshape Narratives, Fund Innovation, And Create Opportunities For Lasting Legacies.
        </p>
        <button className="cta-button">Get Updates</button>
        <div className="countdown-wrapper">
          <p className="coming-soon">Coming Soon (30 August 2025)</p>
         
          <div className="countdown"><div className="countdown-line" />{timerComponents}</div>
           
        </div>
      </div>
    </div>
  );
};

export default ProjectBlackLanding;