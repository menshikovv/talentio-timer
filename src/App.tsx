import { useState, useEffect } from 'react';
import './App.css';
import { Background } from './Background/Background';
import { facts } from './constants/constants';

function App() {
  const [timeString, setTimeString] = useState("00:00:00:00");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Таймер для обратного отсчета
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(4);
    targetDate.setDate(1);
    targetDate.setHours(15, 0, 0, 0);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeString("00:00:00:00");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const format = (num: number) => num.toString().padStart(2, '0');
      setTimeString(`${format(days)}:${format(hours)}:${format(minutes)}:${format(seconds)}`);
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Таймер для смены фактов
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper">
      <Background />
      <div className='content'>
        <div className="countdown-section">
          <h1>До запуска Talentio осталось:</h1>
          <div className="timer-compact">
            {timeString}
          </div>
        </div>
        <div className='facts-container'>
          <div className='facts'>
            <h3>ИНТЕРЕСНЫЕ ФАКТЫ:</h3>
            <h4 className={`fact-text ${fade ? 'fade-in' : 'fade-out'}`}>
              {facts[currentFactIndex]}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;