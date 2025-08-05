// CountdownClock.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css'; 

const AnimatedCard = ({ animation, digit }) => (
  <div className={`flipCard ${animation}`}>
    <span>{digit}</span>
  </div>
);

const StaticCard = ({ position, digit }) => (
  <div className={position}>
    <span>{digit}</span>
  </div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [shouldFlip, setShouldFlip] = useState(false);
  const [displayDigit, setDisplayDigit] = useState(digit);

  useEffect(() => {
    if (shuffle) {
      // First, set the previous digit to the current display digit
      setPreviousDigit(displayDigit);
      // Then immediately update the display digit and trigger flip
      setDisplayDigit(digit);
      setShouldFlip(true);
      
      const flipTimer = setTimeout(() => {
        setShouldFlip(false);
      }, 500); // Match this with your animation duration
      return () => clearTimeout(flipTimer);
    }
  }, [shuffle, digit]);

  let currentDigit = displayDigit;
  let prevDigit = previousDigit;

  // Format digits
  if (unit === 'seconds' || unit === 'minutes') {
    prevDigit = prevDigit > 59 ? 0 : prevDigit;
    currentDigit = currentDigit > 59 ? 0 : currentDigit;
  } else if (unit === 'hours') {
    prevDigit = prevDigit > 23 ? 0 : prevDigit;
    currentDigit = currentDigit > 23 ? 0 : currentDigit;
  }

  if (currentDigit < 10) currentDigit = `0${currentDigit}`;
  if (prevDigit < 10) prevDigit = `0${prevDigit}`;

  return (
    <div className="flipUnitContainer">
      <StaticCard position="upperCard" digit={currentDigit} />
      <StaticCard position="lowerCard" digit={shouldFlip ? prevDigit : currentDigit} />
      {shouldFlip && (
        <>
          <AnimatedCard digit={prevDigit} animation="fold" />
          <AnimatedCard digit={currentDigit} animation="unfold" />
        </>
      )}
    </div>
  );
};


const CountdownClock = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date('2025-12-31T23:59:59');
    const diff = target - now;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [shuffle, setShuffle] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      
      setShuffle({
        days: newTime.days !== timeLeft.days,
        hours: newTime.hours !== timeLeft.hours,
        minutes: newTime.minutes !== timeLeft.minutes,
        seconds: true // This will make it flip every second
      });

      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="flipClock">
      {[
        { unit: 'days', label: 'Days' },
        { unit: 'hours', label: 'Hours' },
        { unit: 'minutes', label: 'Minutes' },
        { unit: 'seconds', label: 'Seconds' },
      ].map(({ unit, label }, index, arr) => (
        <div key={unit} className="flipUnitWrapper">
          <FlipUnitContainer
            unit={unit}
            digit={timeLeft[unit]}
            shuffle={shuffle[unit]}
          />
          {index !== arr.length - 1 && <span className="colon">:</span>}
          <div className="unitLabel">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownClock;