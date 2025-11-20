import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { loadEnergyProfile } from '../utils/energyScoring';

/**
 * Landing Page
 * Entry point - choose between taking quiz or going to planner/taskboard
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const hasProfile = loadEnergyProfile() !== null;

  const steps = [
    {
      number: '01',
      title: 'Discover Your Energy Profile',
      description: 'Take a 2-3 minute quiz to understand your natural energy rhythm',
      action: hasProfile ? 'Already completed ✓' : 'Start Quiz',
      path: '/quiz',
      completed: hasProfile
    },
    {
      number: '02',
      title: 'Smart Task Scheduling',
      description: 'AI automatically schedules tasks when you have the right energy',
      action: 'Plan Your Tasks',
      path: '/task-planner',
      completed: false
    },
    {
      number: '03',
      title: 'Your Workspace',
      description: 'Manage and track your optimized task schedule',
      action: 'Go to Dashboard',
      path: '/dashboard',
      completed: false
    }
  ];

  return (
    <div className="min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-heading text-text-primary tracking-wide mb-6">
            EnergyFlow Planner
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary tracking-wide max-w-3xl mx-auto leading-relaxed">
            Match your tasks to your energy,<br />not your energy to your tasks
          </p>
        </motion.div>

        {/* How It Works - 3 Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-text-primary tracking-wide text-center mb-12">
            How It Works
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className={`glass rounded-2xl p-6 md:p-8 ${
                  step.completed ? 'border-2 border-green-500/30' : ''
                }`}
              >
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-display text-2xl font-bold ${
                    step.completed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-accent-blue/20 text-accent-blue'
                  }`}>
                    {step.completed ? '✓' : step.number}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary tracking-wide leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    <motion.button
                      onClick={() => navigate(step.path)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold tracking-wide transition-all ${
                        step.completed
                          ? 'bg-white/[0.05] text-text-secondary border border-white/[0.1] hover:bg-white/[0.1]'
                          : index === 0 && !hasProfile
                          ? 'bg-accent-blue text-white hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20'
                          : 'bg-white/[0.05] text-text-secondary border border-white/[0.1] hover:bg-white/[0.1] hover:text-text-primary'
                      }`}
                    >
                      {step.action}
                      <ChevronRight size={18} strokeWidth={2} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Access Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-text-tertiary text-sm tracking-wide">
            {hasProfile ? (
              <>
                <span className="text-green-400">✓</span> Energy Profile completed • 
                <button 
                  onClick={() => navigate('/profile-result')}
                  className="text-accent-blue hover:underline ml-1"
                >
                  View your profile
                </button>
              </>
            ) : (
              'Start with Step 1 to unlock smart scheduling'
            )}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
