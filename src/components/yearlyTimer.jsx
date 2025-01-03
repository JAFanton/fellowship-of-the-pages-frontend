import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 365,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const totalSeconds =
            prevTime.days * 86400 + prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;

          if (totalSeconds <= 0) {
            clearInterval(timerRef.current);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }

          const updatedTotal = totalSeconds - 1;
          const days = Math.floor(updatedTotal / 86400);
          const hours = Math.floor((updatedTotal % 86400) / 3600);
          const minutes = Math.floor((updatedTotal % 3600) / 60);
          const seconds = updatedTotal % 60;

          return { days, hours, minutes, seconds };
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft({ days: 365, hours: 0, minutes: 0, seconds: 0 });
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Yearly Countdown Timer</h1>
      <div style={{ fontSize: "2rem", margin: "20px 0" }}>
        {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
      </div>
      <button onClick={startTimer} style={{ margin: "5px", padding: "10px 20px", fontSize: "1rem" }}>
        Start
      </button>
      <button onClick={resetTimer} style={{ margin: "5px", padding: "10px 20px", fontSize: "1rem" }}>
        Reset
      </button>
    </div>
  );
};

export default CountdownTimer;
