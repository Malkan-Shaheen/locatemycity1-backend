// CountdownClock.jsx
import React, { useEffect, useState } from 'react';
import './Clockmain.css'; // Your CSS styles

const AnimatedCard1 = ({ animation, digit }) => (
  <div className={`flipCard1 ${animation}`}>
    <span>{digit}</span>
  </div>
);

const StaticCard1 = ({ position, digit }) => (
  <div className={position}>
    <span>{digit}</span>
  </div>
);

const FlipUnitContainer1 = ({ digit, shuffle, unit }) => {
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
  if (unit === 'seconds1' || unit === 'minutes1') {
    prevDigit = prevDigit > 59 ? 0 : prevDigit;
    currentDigit = currentDigit > 59 ? 0 : currentDigit;
  } else if (unit === 'hours1') {
    prevDigit = prevDigit > 23 ? 0 : prevDigit;
    currentDigit = currentDigit > 23 ? 0 : currentDigit;
  }

  if (currentDigit < 10) currentDigit = `0${currentDigit}`;
  if (prevDigit < 10) prevDigit = `0${prevDigit}`;

  return (
    <div className="flipUnitContainer1">
      <StaticCard1 position="upperCard1" digit={currentDigit} />
      <StaticCard1 position="lowerCard1" digit={shouldFlip ? prevDigit : currentDigit} />
      {shouldFlip && (
        <>
          <AnimatedCard1 digit={prevDigit} animation="fold1" />
          <AnimatedCard1 digit={currentDigit} animation="unfold1" />
        </>
      )}
    </div>
  );
};

const CountdownClock1 = () => {
  const calculateTimeLeft1 = () => {
    const now1 = new Date();
    const target1 = new Date('2025-12-31T23:59:59');
    const diff1 = target1 - now1;

    const totalSeconds1 = Math.floor(diff1 / 1000);
    const days1 = Math.floor(totalSeconds1 / (60 * 60 * 24));
    const hours1 = Math.floor((totalSeconds1 % (60 * 60 * 24)) / 3600);
    const minutes1 = Math.floor((totalSeconds1 % 3600) / 60);
    const seconds1 = totalSeconds1 % 60;

    return { days1, hours1, minutes1, seconds1 };
  };

  const [timeLeft1, setTimeLeft1] = useState(calculateTimeLeft1());
  const [shuffle1, setShuffle1] = useState({
    days1: false,
    hours1: false,
    minutes1: false,
    seconds1: false
  });

  useEffect(() => {
    const interval1 = setInterval(() => {
      const newTime1 = calculateTimeLeft1();
      
      setShuffle1({
        days1: newTime1.days1 !== timeLeft1.days1,
        hours1: newTime1.hours1 !== timeLeft1.hours1,
        minutes1: newTime1.minutes1 !== timeLeft1.minutes1,
        seconds1: true // This will make it flip every second
      });

      setTimeLeft1(newTime1);
    }, 1000);

    return () => clearInterval(interval1);
  }, [timeLeft1]);

  return (
    <div className="flipClock">
      {[
        { unit1: 'days1', label1: 'Days' },
        { unit1: 'hours1', label1: 'Hours' },
        { unit1: 'minutes1', label1: 'Minutes' },
        { unit1: 'seconds1', label1: 'Seconds' },
      ].map(({ unit1, label1 }, index1, arr1) => (
        <div key={unit1} className="flipUnitWrapper1">
          <FlipUnitContainer1
            unit={unit1}
            digit={timeLeft1[unit1]}
            shuffle={shuffle1[unit1]}
          />
          {index1 !== arr1.length - 1 && <span className="colon1">:</span>}
          <div className="unitLabel1">{label1}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownClock1;