import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

/**
 * Countdown Timer Component
 * Customizable countdown timer
 */
const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(10);
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
  }, [isActive, minutes, seconds]);

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltrzxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHAU2jdXz0H4wBSF1xe/glEIKElyy6OyrWBUIQ5zd8sFuJAUuhM/z14c2Bhxqvu7mnEoODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYecMLu45ZFCw5YruXutV0aB0CY2/PBcSYEKILM8dmLOQcZZr3s6aFOEQtJoODxuWYdBTSL1vLPfjAFI3PD7+KVQgsUXLDn7qxaFgdBmtvyw3ElBSt/zvLZiz0IHGe+7OecTQ4QU6jj8LJfGgU7k9bzzHksBSp7y/HajD4IF2W86+mjUBELSqPh8btoHgU1jNTy0H4wBSJxwu/jl0YMD1ap5O6vWxkHQJXY88FwJAQogM3y2Ys6CBllveznnU4QDlKo5PCxXhoGOpPX88t3LAUqesvy2o4/CBdinOvqpFIQC0qj4PG9aR4FNYvU8tGAMgYib8Lu45dHDRBVqeTrr1saBkCU2PPDcSYEKH7N8tmLOggZZLzs56RPEA1Sp+Twr1waBy==');
    audio.play().catch(() => {});
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  const adjustTime = (amount) => {
    if (!isActive) {
      const newMinutes = Math.max(1, Math.min(60, initialMinutes + amount));
      setInitialMinutes(newMinutes);
      setMinutes(newMinutes);
      setSeconds(0);
    }
  };

  const totalSeconds = initialMinutes * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
          Countdown Timer
        </h3>
        {!isActive && (
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => adjustTime(-5)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg bg-white/[0.05] text-text-secondary hover:bg-white/[0.1] hover:text-text-primary transition-all"
            >
              <Minus size={14} />
            </motion.button>
            <span className="text-sm text-text-tertiary min-w-[60px] text-center">
              {initialMinutes} min
            </span>
            <motion.button
              onClick={() => adjustTime(5)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg bg-white/[0.05] text-text-secondary hover:bg-white/[0.1] hover:text-text-primary transition-all"
            >
              <Plus size={14} />
            </motion.button>
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
            stroke="#A7B8FF"
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
              {remainingSeconds === 0 ? 'Time\'s up!' : 'Remaining'}
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
          className="flex-1 py-3 rounded-xl bg-accent-indigo text-white font-semibold tracking-wide
                   hover:bg-accent-indigo/90 transition-all flex items-center justify-center gap-2"
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
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
