import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

/**
 * Pomodoro Timer Component
 * 25 min work / 5 min break cycle
 */
const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsActive(false);
            playNotificationSound();
            
            // Switch between work and break
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, isBreak]);

  const playNotificationSound = () => {
    // Simple audio notification
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltrzxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHAU2jdXz0H4wBSF1xe/glEIKElyy6OyrWBUIQ5zd8sFuJAUuhM/z14c2Bhxqvu7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYecMLu45ZFCw5YruXutV0aB0CY2/PBcSYEKILM8dmLOQcZZr3s6aFOEQtJoODxuWYdBTSL1vLPfjAFI3PD7+KVQgsUXLDn7qxaFgdBmtvyw3ElBSt/zvLZiz0IHGe+7OecTQ4QU6jj8LJfGgU7k9bzzHksBSp7y/HajD4IF2W86+mjUBELSqPh8btoHgU1jNTy0H4wBSJxwu/jl0YMD1ap5O6vWxkHQJXY88FwJAQogM3y2Ys6CBllveznnU4QDlKo5PCxXhoGOpPX88t3LAUqesvy2o4/CBdinOvqpFIQC0qj4PG9aR4FNYvU8tGAMgYib8Lu45dHDRBVqeTrr1saBkCU2PPDcSYEKH7N8tmLOggZZLzs56RPEA1Sp+Twr1waBy==');
    audio.play().catch(() => {});
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  const skipBreak = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const progress = isBreak
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
          Pomodoro Timer
        </h3>
        {isBreak && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
            <Coffee size={14} />
            <span>Break Time</span>
          </div>
        )}
      </div>

      {/* Timer Display */}
      <div className="relative mb-6">
        {/* Progress Ring */}
        <svg className="w-full h-48" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={isBreak ? '#10b981' : '#4A90E2'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="565.48"
            strokeDashoffset={565.48 - (565.48 * progress) / 100}
            initial={{ strokeDashoffset: 565.48 }}
            animate={{ strokeDashoffset: 565.48 - (565.48 * progress) / 100 }}
            transition={{ duration: 0.5 }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>

        {/* Time Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-display font-bold text-text-primary">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-text-tertiary mt-2">
              {isBreak ? 'Take a break' : 'Focus time'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <motion.button
          onClick={toggleTimer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-3 rounded-xl bg-accent-blue text-white font-semibold tracking-wide
                   hover:bg-accent-blue/90 transition-all flex items-center justify-center gap-2"
        >
          {isActive ? <Pause size={18} /> : <Play size={18} />}
          {isActive ? 'Pause' : 'Start'}
        </motion.button>

        <motion.button
          onClick={resetTimer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-3 rounded-xl bg-white/[0.05] text-text-secondary border border-white/[0.1]
                   hover:bg-white/[0.1] hover:text-text-primary transition-all"
        >
          <RotateCcw size={18} />
        </motion.button>

        {isBreak && (
          <motion.button
            onClick={skipBreak}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 rounded-xl bg-white/[0.05] text-text-secondary border border-white/[0.1]
                     hover:bg-white/[0.1] hover:text-text-primary transition-all text-sm"
          >
            Skip
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PomodoroTimer;
