/**
 * localStorage utilities for persisting tasks
 * 
 * Why we need this:
 * - Browser localStorage lets us save data that persists even after page refresh
 * - We wrap it in functions to handle errors gracefully and provide a clean API
 * - JSON.stringify converts JavaScript objects to strings (localStorage only stores strings)
 * - JSON.parse converts strings back to JavaScript objects
 */

const STORAGE_KEY = 'energyflow_tasks';

/**
 * Load tasks from localStorage
 * Returns the saved tasks or an empty object if nothing is saved
 */
export const loadTasks = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    // Default initial state with empty arrays for each energy level
    return {
      morning: [],
      afternoon: [],
      evening: []
    };
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return {
      morning: [],
      afternoon: [],
      evening: []
    };
  }
};

/**
 * Save tasks to localStorage
 * @param {Object} tasks - Object containing arrays of tasks for each energy level
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Get current energy zone based on system time
 * Morning: 5am-12pm, Afternoon: 12pm-6pm, Evening: 6pm-5am
 */
export const getCurrentEnergyZone = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return { zone: 'morning', emoji: '🌅', name: 'Morning Energy', description: 'Deep Work Mode' };
  } else if (hour >= 12 && hour < 18) {
    return { zone: 'afternoon', emoji: '🌤️', name: 'Afternoon Energy', description: 'Light Work Mode' };
  } else {
    return { zone: 'evening', emoji: '🌙', name: 'Evening Peak', description: 'Flow State Work' };
  }
};
