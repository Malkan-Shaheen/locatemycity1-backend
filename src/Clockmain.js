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
  const [disableFlip1, setDisableFlip1] = useState(false);

  useEffect(() => {
    if (shuffle && !disableFlip1) {
      setDisableFlip1(true);
      const timeout1 = setTimeout(() => {
        setDisableFlip1(false);
      }, 1000); // prevent flip for 1 sec
      return () => clearTimeout(timeout1);
    }
  }, [shuffle]);

  let currentDigit1 = digit;
  let previousDigit1 = digit + 1;

  if (unit === 'seconds' || unit === 'minutes') {
    previousDigit1 = previousDigit1 > 59 ? 0 : previousDigit1;
  } else if (unit === 'hours') {
    previousDigit1 = previousDigit1 > 23 ? 0 : previousDigit1;
  }

  if (currentDigit1 < 10) currentDigit1 = `0${currentDigit1}`;
  if (previousDigit1 < 10) previousDigit1 = `0${previousDigit1}`;

  const digit11 = shuffle ? previousDigit1 : currentDigit1;
  const digit21 = !shuffle ? previousDigit1 : currentDigit1;
  const animation11 = shuffle ? 'fold1' : 'unfold1';
  const animation21 = !shuffle ? 'fold1' : 'unfold1';

  return (
    <div className="flipUnitContainer1">
      <StaticCard1 position="upperCard1" digit={currentDigit1} />
      <StaticCard1 position="lowerCard1" digit={previousDigit1} />
      <div className={disableFlip1 ? 'no-flip1' : ''}>
        <AnimatedCard1 digit={digit11} animation={animation11} />
        <AnimatedCard1 digit={digit21} animation={animation21} />
      </div>
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
    days1: true,
    hours1: true,
    minutes1: true,
    seconds1: true,
  });

  useEffect(() => {
    const interval1 = setInterval(() => {
      const newTime1 = calculateTimeLeft1();

      setShuffle1(prev1 => ({
        days1: newTime1.days1 !== timeLeft1.days1,
        hours1: newTime1.hours1 !== timeLeft1.hours1,
        minutes1: newTime1.minutes1 !== timeLeft1.minutes1,
        seconds1: !prev1.seconds1,
      }));

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