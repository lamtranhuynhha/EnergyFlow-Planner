import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

// Pages
import LandingPage from './pages/LandingPage';
import EnergyQuiz from './pages/EnergyQuiz';
import ProfileResult from './pages/ProfileResult';
import TaskPlanner from './pages/TaskPlanner';
import Dashboard from './pages/Dashboard';

/**
 * Root App Component with Routing
 * Manages theme and navigation between pages
 */
function App() {
  // Theme state - default dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      {/* Global Theme Toggle Button */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 z-50 p-3 rounded-xl glass border border-white/[0.1]
                 hover:bg-white/[0.08] transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="text-yellow-300" size={20} strokeWidth={2} />
        ) : (
          <Moon className="text-blue-950" size={20} strokeWidth={2} />
        )}
      </motion.button>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<EnergyQuiz />} />
        <Route path="/profile-result" element={<ProfileResult />} />
        <Route path="/task-planner" element={<TaskPlanner />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
