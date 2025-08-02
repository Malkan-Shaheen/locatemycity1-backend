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
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
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
    days:true,
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
        seconds: newTime.seconds !== timeLeft.seconds,
      });
      setTimeLeft(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="flipClock">
      <FlipUnitContainer unit="days" digit={timeLeft.days} shuffle={shuffle.days} />
      <FlipUnitContainer unit="hours" digit={timeLeft.hours} shuffle={shuffle.hours} />
      <FlipUnitContainer unit="minutes" digit={timeLeft.minutes} shuffle={shuffle.minutes} />
      <FlipUnitContainer unit="seconds" digit={timeLeft.seconds} shuffle={shuffle.seconds} />
    </div>
  );
};

export default CountdownClock;
