
import React, { useState, useEffect, useRef } from 'react';

type TimerType = 'pomodoro' | 'meditation' | 'nap';

interface TimerModalProps {
  type: TimerType;
  isOpen: boolean;
  onClose: () => void;
}

const getDefaultTime = (type: TimerType): number => {
  switch (type) {
    case 'pomodoro': return 25 * 60; // 25 minutes
    case 'meditation': return 10 * 60; // 10 minutes
    case 'nap': return 20 * 60; // 20 minutes
    default: return 25 * 60;
  }
};

const getTitle = (type: TimerType): string => {
  switch (type) {
    case 'pomodoro': return 'Pomodoro Timer';
    case 'meditation': return 'Meditation Break';
    case 'nap': return 'Power Nap';
    default: return 'Timer';
  }
};

const getIcon = (type: TimerType): string => {
  switch (type) {
    case 'pomodoro': return '🍅';
    case 'meditation': return '🧘';
    case 'nap': return '😴';
    default: return '⏱️';
  }
};

const TimerModal: React.FC<TimerModalProps> = ({ type, isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(getDefaultTime(type));
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(getDefaultTime(type) / 60);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setTimeLeft(getDefaultTime(type));
    }
  }, [isOpen, type]);

  const toggleTimer = () => {
    if (isActive) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsActive(false);
            // Play a gentle sound or notification here
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setTimeLeft(customTime * 60);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomTime(value);
      if (!isActive) {
        setTimeLeft(value * 60);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const progress = (timeLeft / (customTime * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 overflow-hidden animate-grow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium flex items-center">
              <span className="mr-2">{getIcon(type)}</span>
              {getTitle(type)}
            </h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#e9ecef" 
                  strokeWidth="6"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transform="rotate(-90 50 50)"
                />
                <text 
                  x="50" 
                  y="50" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="16"
                  fontWeight="600"
                  fill="currentColor"
                >
                  {formatTime(timeLeft)}
                </text>
              </svg>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={toggleTimer}
                className={`btn-primary px-6 py-2 min-w-24 ${isActive ? 'bg-primary/90' : ''}`}
              >
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={resetTimer}
                className="btn-outline px-6 py-2 min-w-24"
              >
                Reset
              </button>
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-1">
                Custom Timer (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={customTime}
                onChange={handleCustomTimeChange}
                disabled={isActive}
                className="input-field"
              />
            </div>
            
            {type === 'pomodoro' && (
              <div className="mt-4 p-3 bg-calm-green-light/50 rounded-lg w-full">
                <p className="text-sm text-center">
                  Focus on your task for {customTime} minutes. A tree will grow with each completed session!
                </p>
              </div>
            )}
            
            {type === 'meditation' && (
              <div className="mt-4 p-3 bg-calm-blue-light/50 rounded-lg w-full">
                <p className="text-sm text-center">
                  Take deep breaths and clear your mind. This short break will help you regain focus.
                </p>
              </div>
            )}
            
            {type === 'nap' && (
              <div className="mt-4 p-3 bg-calm-brown-light/50 rounded-lg w-full">
                <p className="text-sm text-center">
                  A short power nap can boost creativity and productivity. Ensure you're in a comfortable position.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
