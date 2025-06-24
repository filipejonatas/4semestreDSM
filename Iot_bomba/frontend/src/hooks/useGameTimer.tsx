import { useState, useEffect, useCallback } from 'react';

export const useGameTimer = (initialTime: number = 120) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setIsExpired(false);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback((newTime?: number) => {
    setTimeRemaining(newTime || initialTime);
    setIsActive(false);
    setIsExpired(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsExpired(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    isActive,
    isExpired,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime: () => formatTime(timeRemaining),
  };
};