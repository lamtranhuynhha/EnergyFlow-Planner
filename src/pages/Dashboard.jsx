import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Clock } from 'lucide-react';
import EnergyIndicator from '../components/EnergyIndicator';
import TaskBoard from '../components/TaskBoard';
import PomodoroTimer from '../components/PomodoroTimer';
import CountdownTimer from '../components/CountdownTimer';
import { loadTasks, saveTasks } from '../utils/localStorage';

/**
 * Dashboard Component - Classic TaskBoard
 * 
 * Main task management interface with:
 * - Manual task organization by energy zones
 * - Drag & drop functionality
 * - Real-time energy indicator
 */
function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(loadTasks());
  const [showTimers, setShowTimers] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <div className="min-h-screen p-8 md:p-12 transition-colors duration-300">
      {/* Main Container - spacious and airy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Back to Home Button */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-8 left-8 z-50 p-3 rounded-xl glass border border-white/[0.1]
                   hover:bg-white/[0.08] transition-all duration-200"
          aria-label="Back to home"
        >
          <Home className="text-accent-blue" size={20} strokeWidth={2} />
        </motion.button>

        {/* App Header - minimal and refined */}
        <motion.header
          initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <div className="text-center">
            <h1 
              className="text-5xl md:text-6xl text-text-primary tracking-wide mb-8" 
              style={{ fontFamily: 'Brillant, serif' }}
            >
              EnergyFlow Planner
            </h1>
            <p className="text-text-secondary text-lg font-normal tracking-wide max-w-2xl mx-auto">
              Match your tasks to your energy, not your energy to your tasks
            </p>
          </div>
        </motion.header>

        {/* Energy Indicator Section */}
        <EnergyIndicator />

        {/* Timer Toggle Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <motion.button
            onClick={() => setShowTimers(!showTimers)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl glass border border-white/[0.1] text-text-secondary
                     hover:bg-white/[0.08] hover:text-text-primary transition-all
                     flex items-center gap-2 font-semibold tracking-wide"
          >
            <Clock size={18} strokeWidth={2} />
            {showTimers ? 'Hide Timers' : 'Show Timers'}
          </motion.button>
        </motion.div>

        {/* Timers Section */}
        {showTimers && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <PomodoroTimer />
              <CountdownTimer />
            </div>
          </motion.div>
        )}

        {/* Task Board Section */}
        <TaskBoard tasks={tasks} setTasks={setTasks} />

        {/* Footer - minimal */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-text-tertiary text-sm font-normal tracking-wide">
              Auto-saved locally
            </p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default Dashboard;
