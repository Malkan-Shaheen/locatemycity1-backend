// CountdownClock.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css'; // Your CSS styles

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
  // Remove the disableFlip logic entirely for seconds
  const [disableFlip, setDisableFlip] = useState(false);

  useEffect(() => {
    if (shuffle && !disableFlip && unit !== 'seconds') {
      setDisableFlip(true);
      const timeout = setTimeout(() => {
        setDisableFlip(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [shuffle, unit]);

  let currentDigit = digit;
  let previousDigit = digit + 1;

  if (unit === 'seconds' || unit === 'minutes') {
    previousDigit = previousDigit > 59 ? 0 : previousDigit;
  } else if (unit === 'hours') {
    previousDigit = previousDigit > 23 ? 0 : previousDigit;
  }

  if (currentDigit < 10) currentDigit = `0${currentDigit}`;
  if (previousDigit < 10) previousDigit = `0${previousDigit}`;

  const digit1 = shuffle ? previousDigit : currentDigit;
  const digit2 = !shuffle ? previousDigit : currentDigit;
  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div className="flipUnitContainer">
      <StaticCard position="upperCard" digit={currentDigit} />
      <StaticCard position="lowerCard" digit={previousDigit} />
      <div className={disableFlip && unit !== 'seconds' ? 'no-flip' : ''}>
        <AnimatedCard digit={digit1} animation={animation1} />
        <AnimatedCard digit={digit2} animation={animation2} />
      </div>
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
    days: true,
    hours: true,
    minutes: true,
    seconds: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      setShuffle({
        days: newTime.days !== timeLeft.days,
        hours: newTime.hours !== timeLeft.hours,
        minutes: newTime.minutes !== timeLeft.minutes,
        seconds: true, // Force seconds to flip every second
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