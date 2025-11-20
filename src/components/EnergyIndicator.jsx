import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getCurrentEnergyZone } from '../utils/localStorage';
import { getRandomQuote } from '../utils/quotes';

/**
 * EnergyIndicator Component - Premium Dark Mode Edition
 * 
 * Displays current energy zone with:
 * - Minimal, clean design
 * - Refined typography with tight tracking
 * - Subtle animations (fade-in, blur-to-clear)
 * - Premium color accents
 * 
 * Technical details:
 * - useState manages the current energy zone and quote
 * - useEffect handles initialization and periodic updates
 * - Follows Apple × Linear × Notion aesthetic
 */
const EnergyIndicator = () => {
  const [energyZone, setEnergyZone] = useState(getCurrentEnergyZone());
  const [quote, setQuote] = useState(getRandomQuote());

  // Update energy zone and quote on mount
  useEffect(() => {
    setEnergyZone(getCurrentEnergyZone());
    setQuote(getRandomQuote());

    // Update energy zone every minute to catch time changes
    const interval = setInterval(() => {
      setEnergyZone(getCurrentEnergyZone());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Minimal color mapping for each energy zone
  const zoneColors = {
    morning: 'text-orange-400',
    afternoon: 'text-accent-blue',
    evening: 'text-accent-indigo'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="mb-10"
    >
      {/* Current Energy Zone Display - minimal card */}
      <div className="glass rounded-2xl p-8 mb-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-5xl opacity-90"
          >
            {energyZone.emoji}
          </motion.div>
          
          <div>
            <h3 className="text-xl font-display font-semibold text-text-primary tracking-wide mb-1.5">
              {energyZone.name}
            </h3>
            <p className="text-text-secondary text-base font-normal tracking-wide">
              {energyZone.description}
            </p>
          </div>
        </div>
      </div>

      {/* Motivational Quote - minimal design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-text-secondary text-base font-normal leading-relaxed tracking-wide italic">
              {quote}
            </p>
          </div>
          <motion.button
            onClick={() => setQuote(getRandomQuote())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text-tertiary
                     hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-accent-indigo
                     transition-all duration-200 flex-shrink-0"
            aria-label="Get new quote"
          >
            <Sparkles size={16} strokeWidth={2} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnergyIndicator;
