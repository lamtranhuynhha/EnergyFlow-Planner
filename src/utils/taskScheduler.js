/**
 * Auto-Scheduler Algorithm
 * Tự động sắp xếp tasks dựa trên Energy Profile
 */

import { loadEnergyProfile } from './energyScoring';

/**
 * Calculate energy level at a specific hour
 */
const getEnergyAtHour = (hour, profile) => {
  const { peakStart, peakEnd } = profile.chronotype;
  const amplitude = profile.amplitude.score / 3; // normalize to 0-1
  
  // Before peak
  if (hour < peakStart) {
    return 40 + ((hour / peakStart) * 30);
  }
  // During peak
  else if (hour >= peakStart && hour <= peakEnd) {
    const peakProgress = (hour - peakStart) / (peakEnd - peakStart);
    return 70 + (amplitude * 30) * Math.sin(peakProgress * Math.PI);
  }
  // After peak
  else {
    const declineProgress = (hour - peakEnd) / (24 - peakEnd);
    return 70 - (declineProgress * 50);
  }
};

/**
 * Match task to best time slot
 * @param {Object} task - {name, energyConsumption, duration, priority}
 * @param {Array} availableSlots - Array of {start, end, date}
 * @param {Object} profile - Energy profile
 */
const findBestSlot = (task, availableSlots, profile) => {
  let bestSlot = null;
  let bestScore = -Infinity;

  for (const slot of availableSlots) {
    const slotStartHour = parseInt(slot.start.split(':')[0]);
    const energy = getEnergyAtHour(slotStartHour, profile);
    
    // Score calculation:
    // - High energy tasks -> prefer high energy times
    // - Priority multiplier
    // - Avoid overloading peak hours with low-priority tasks
    const energyMatch = task.energyConsumption === 'high' 
      ? energy 
      : task.energyConsumption === 'medium'
      ? Math.abs(energy - 60) // prefer medium energy times
      : 100 - energy; // low energy tasks prefer low energy times
    
    const priorityBonus = task.priority === 'high' ? 20 : task.priority === 'medium' ? 10 : 0;
    const score = energyMatch + priorityBonus;

    if (score > bestScore) {
      bestScore = score;
      bestSlot = slot;
    }
  }

  return bestSlot;
};

/**
 * Generate time slots for a given time range
 */
const generateTimeSlots = (startHour, endHour, date, slotDuration = 1) => {
  const slots = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration * 60) {
      const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endMinute = minute + (slotDuration * 60);
      const endHour = hour + Math.floor(endMinute / 60);
      const endMin = endMinute % 60;
      const end = `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
      
      slots.push({ start, end, date, available: true });
    }
  }
  
  return slots;
};

/**
 * Main scheduling function
 * @param {Array} tasks - Array of task objects
 * @param {Object} timeConstraints - {startHour, endHour, date}
 * @returns {Array} Scheduled tasks with assigned time slots
 */
export const scheduleTasks = (tasks, timeConstraints = {}) => {
  const profile = loadEnergyProfile();
  if (!profile) {
    throw new Error('Energy profile not found. Please complete the quiz first.');
  }

  const { startHour = 6, endHour = 22, date = new Date().toISOString().split('T')[0] } = timeConstraints;

  // Sort tasks by priority (high -> medium -> low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  // Generate available time slots
  let availableSlots = generateTimeSlots(startHour, endHour, date);

  const scheduledTasks = [];

  for (const task of sortedTasks) {
    const duration = parseFloat(task.duration);
    
    // Find slots that can fit this task
    const suitableSlots = availableSlots.filter(slot => {
      const slotHour = parseInt(slot.start.split(':')[0]);
      const slotMinute = parseInt(slot.start.split(':')[1]);
      const totalMinutes = slotHour * 60 + slotMinute;
      const endMinutes = totalMinutes + (duration * 60);
      const endHour = Math.floor(endMinutes / 60);
      return endHour <= timeConstraints.endHour && slot.available;
    });

    if (suitableSlots.length === 0) {
      // No slot available, add to unscheduled
      scheduledTasks.push({
        ...task,
        scheduled: false,
        reason: 'No available time slot'
      });
      continue;
    }

    // Find best slot based on energy profile
    const bestSlot = findBestSlot(task, suitableSlots, profile);

    if (bestSlot) {
      const startHour = parseInt(bestSlot.start.split(':')[0]);
      const startMinute = parseInt(bestSlot.start.split(':')[1]);
      const totalMinutes = startHour * 60 + startMinute + (duration * 60);
      const endHour = Math.floor(totalMinutes / 60);
      const endMinute = totalMinutes % 60;
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

      scheduledTasks.push({
        ...task,
        scheduled: true,
        startTime: bestSlot.start,
        endTime: endTime,
        date: bestSlot.date,
        energyLevel: Math.round(getEnergyAtHour(startHour, profile))
      });

      // Mark used slots as unavailable
      availableSlots = availableSlots.map(slot => {
        const slotHour = parseInt(slot.start.split(':')[0]);
        const slotMinute = parseInt(slot.start.split(':')[1]);
        const slotTime = slotHour * 60 + slotMinute;
        const taskStart = startHour * 60 + startMinute;
        const taskEnd = totalMinutes;

        if (slotTime >= taskStart && slotTime < taskEnd) {
          return { ...slot, available: false };
        }
        return slot;
      });

      // Add break time if needed
      const breakDuration = profile.recovery.breakTime;
      if (breakDuration > 0 && scheduledTasks.length > 0) {
        const breakEnd = totalMinutes + breakDuration;
        availableSlots = availableSlots.map(slot => {
          const slotHour = parseInt(slot.start.split(':')[0]);
          const slotMinute = parseInt(slot.start.split(':')[1]);
          const slotTime = slotHour * 60 + slotMinute;

          if (slotTime >= totalMinutes && slotTime < breakEnd) {
            return { ...slot, available: false };
          }
          return slot;
        });
      }
    }
  }

  return scheduledTasks;
};

/**
 * Convert scheduled tasks to TaskBoard format
 */
export const convertToTaskBoard = (scheduledTasks) => {
  const tasks = {
    morning: [],
    afternoon: [],
    evening: []
  };

  scheduledTasks.forEach(task => {
    if (!task.scheduled) return;

    const hour = parseInt(task.startTime.split(':')[0]);
    
    const taskObj = {
      id: Date.now() + Math.random(),
      text: `${task.name} (${task.startTime}-${task.endTime})`,
      completed: false,
      energyLevel: task.energyLevel,
      originalTask: task
    };

    if (hour >= 5 && hour < 12) {
      tasks.morning.push(taskObj);
    } else if (hour >= 12 && hour < 18) {
      tasks.afternoon.push(taskObj);
    } else {
      tasks.evening.push(taskObj);
    }
  });

  return tasks;
};
