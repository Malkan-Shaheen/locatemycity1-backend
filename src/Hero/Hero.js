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

  if (unit !== 'days') {
    previousDigit = previousDigit === -1 ? (unit === 'hours' ? 23 : 59) : previousDigit;
  } else {
    previousDigit = previousDigit === -1 ? 364 : previousDigit;
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
      <div className="number-rectangle"></div>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
      {unit !== 'seconds' && (
        <div className="colon-container">
          <div className="colon-dot top"></div>
          <div className="colon-dot bottom"></div>
          <div className="colon-line"></div>
          <div className="colon-circle left"></div>
          <div className="colon-circle right"></div>
        </div>
      )}
    </div>
  );
};

const FlipClock = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    daysShuffle: true,
    hours: 0,
    hoursShuffle: true,
    minutes: 0,
    minutesShuffle: true,
    seconds: 0,
    secondsShuffle: true,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date('December 31, 2025 23:59:59');
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const updateTimer = () => {
      const { days, hours, minutes, seconds } = calculateTimeLeft();

      setTimeLeft(prevTime => ({
        days,
        daysShuffle: days !== prevTime.days ? !prevTime.daysShuffle : prevTime.daysShuffle,
        hours,
        hoursShuffle: hours !== prevTime.hours ? !prevTime.hoursShuffle : prevTime.hoursShuffle,
        minutes,
        minutesShuffle: minutes !== prevTime.minutes ? !prevTime.minutesShuffle : prevTime.minutesShuffle,
        seconds,
        secondsShuffle: seconds !== prevTime.seconds ? !prevTime.secondsShuffle : prevTime.secondsShuffle,
      }));
    };

    updateTimer();
    const timerID = setInterval(updateTimer, 1000);

    return () => clearInterval(timerID);
  }, []);

  return (
    <div className={'flipClock'}>
      <FlipUnitContainer unit={'days'} digit={timeLeft.days} shuffle={timeLeft.daysShuffle} />
      <FlipUnitContainer unit={'hours'} digit={timeLeft.hours} shuffle={timeLeft.hoursShuffle} />
      <FlipUnitContainer unit={'minutes'} digit={timeLeft.minutes} shuffle={timeLeft.minutesShuffle} />
      <FlipUnitContainer unit={'seconds'} digit={timeLeft.seconds} shuffle={timeLeft.secondsShuffle} />
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
          <p className="coming-soon">Coming Soon (31 December 2025)</p>
          <FlipClock />
        </div>
      </div>
   </div>
  );
};

export default ProjectBlackLanding;