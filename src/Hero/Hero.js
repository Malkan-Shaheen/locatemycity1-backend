import React, { useState, useEffect } from 'react';
import './Hero.css';

const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  let currentDigit = digit;
  let previousDigit = digit - 1;

  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit;
  }

  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;

  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};

const FlipClock = () => {
  const [time, setTime] = useState({
    hours: 0,
    hoursShuffle: true,
    minutes: 0,
    minutesShuffle: true,
    seconds: 0,
    secondsShuffle: true,
  });

  useEffect(() => {
    const timerID = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      setTime(prevTime => ({
        hours,
        hoursShuffle: hours !== prevTime.hours ? !prevTime.hoursShuffle : prevTime.hoursShuffle,
        minutes,
        minutesShuffle: minutes !== prevTime.minutes ? !prevTime.minutesShuffle : prevTime.minutesShuffle,
        seconds,
        secondsShuffle: seconds !== prevTime.seconds ? !prevTime.secondsShuffle : prevTime.secondsShuffle,
      }));
    }, 50);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div className={'flipClock'}>
      <FlipUnitContainer unit={'hours'} digit={time.hours} shuffle={time.hoursShuffle} />
      <FlipUnitContainer unit={'minutes'} digit={time.minutes} shuffle={time.minutesShuffle} />
      <FlipUnitContainer unit={'seconds'} digit={time.seconds} shuffle={time.secondsShuffle} />
    </div>
  );
};

const ProjectBlackLanding = () => {
  return (
    <div className="hero-container">
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
          <p className="coming-soon">Coming Soon (30 August 2025)</p>
          <FlipClock />
        </div>
      </div>
   </div>
  );
};

export default ProjectBlackLanding;