import React, { useState, useEffect } from "react";

import "./countdownTimer.css";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-01-05T00:00:00");
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = targetDate - now;

      if (timeDiff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="timer-container">
      <h1 className="timer-title">Time remaining</h1>
      <div className="timer-blocks">
        <div className="time-block">
          <div className="time-value">{timeLeft.days}</div>
          <div className="time-label">Days</div>
        </div>
        <div className="time-block">
          <div className="time-value">{timeLeft.hours}</div>
          <div className="time-label">Hours</div>
        </div>
        <div className="time-block">
          <div className="time-value">{timeLeft.minutes}</div>
          <div className="time-label">Minutes</div>
        </div>
        <div className="time-block">
          <div className="time-value">{timeLeft.seconds}</div>
          <div className="time-label">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
