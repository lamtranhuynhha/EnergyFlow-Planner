import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, Battery, Settings } from 'lucide-react';
import { loadEnergyProfile, generateEnergyCurve } from '../utils/energyScoring';

/**
 * ProfileResult Component
 * Hiển thị kết quả Energy Profile và biểu đồ năng lượng
 */
const ProfileResult = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [energyCurve, setEnergyCurve] = useState([]);

  useEffect(() => {
    const savedProfile = loadEnergyProfile();
    if (!savedProfile) {
      navigate('/quiz');
      return;
    }
    setProfile(savedProfile);
    setEnergyCurve(generateEnergyCurve(savedProfile));
  }, [navigate]);

  if (!profile) return null;

  const maxEnergy = Math.max(...energyCurve.map(p => p.energy));

  return (
    <div className="min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading text-text-primary tracking-wide mb-4">
            Your Energy Profile
          </h1>
          <p className="text-text-secondary text-lg tracking-wide">
            This is your natural energy rhythm in a day
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Chronotype */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent-blue/20">
                <Clock className="text-accent-blue" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
                  {profile.chronotype.label}
                </h3>
                <p className="text-sm text-text-tertiary tracking-wide">Biological clock</p>
              </div>
            </div>
            <p className="text-text-secondary tracking-wide">
              Peak energy: <span className="text-text-primary font-semibold">
                {profile.chronotype.peakStart}h - {profile.chronotype.peakEnd}h
              </span>
            </p>
          </motion.div>

          {/* Amplitude */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-accent-indigo/20">
                <Zap className="text-accent-indigo" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
                  {profile.amplitude.label}
                </h3>
                <p className="text-sm text-text-tertiary tracking-wide">Energy amplitude</p>
              </div>
            </div>
            <p className="text-text-secondary tracking-wide">
              The difference between peak and trough energy in a day
            </p>
          </motion.div>

          {/* Recovery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Battery className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
                  {profile.recovery.label}
                </h3>
                <p className="text-sm text-text-tertiary tracking-wide">Recovery</p>
              </div>
            </div>
            <p className="text-text-secondary tracking-wide">
              Need rest: <span className="text-text-primary font-semibold">
                ~{profile.recovery.breakTime} minutes
              </span> after every 90 minutes of focused work
            </p>
          </motion.div>

          {/* External */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <Settings className="text-orange-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-text-primary tracking-wide">
                  {profile.external.label}
                </h3>
                <p className="text-sm text-text-tertiary tracking-wide">External</p>
              </div>
            </div>
            <p className="text-text-secondary tracking-wide">
              Flexibility with the environment around you
            </p>
          </motion.div>
        </div>

        {/* Energy Curve Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <h3 className="text-xl font-display font-semibold text-text-primary tracking-wide mb-6">
            Energy Curve Visualization
          </h3>
          
          {/* Simple Bar Chart */}
          {energyCurve.length === 0 ? (
            <div className="text-center py-12 text-text-tertiary">
              Creating chart...
            </div>
          ) : (
            <div className="relative h-64 flex items-end justify-between gap-1">
              {energyCurve.map((point) => {
                const heightPercent = (point.energy / maxEnergy) * 100;
                const isPeak = point.hour >= profile.chronotype.peakStart && 
                               point.hour <= profile.chronotype.peakEnd;
                
                return (
                  <div
                    key={point.hour}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ delay: 0.6 + (point.hour * 0.02), duration: 0.3 }}
                      className={`
                        w-full rounded-t-sm min-h-[8px]
                        ${isPeak ? 'bg-accent-blue' : 'bg-text-tertiary/30'}
                      `}
                      title={`${point.hour}h: ${point.energy}%`}
                    />
                    {point.hour % 3 === 0 && (
                      <span className="text-xs text-text-tertiary">
                        {point.hour}h
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent-blue rounded" />
              <span className="text-sm text-text-secondary tracking-wide">Peak Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-text-tertiary/30 rounded" />
              <span className="text-sm text-text-secondary tracking-wide">Other Hours</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={() => navigate('/task-planner')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 rounded-xl bg-accent-blue text-white font-semibold text-lg tracking-wide
                     hover:bg-accent-blue/90 transition-all duration-200"
          >
            Tạo Task & Lên Lịch
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/quiz')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] text-text-secondary border border-white/[0.1]
                     hover:bg-white/[0.1] hover:text-text-primary font-semibold tracking-wide
                     transition-all duration-200"
          >
            Làm lại Test
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileResult;
