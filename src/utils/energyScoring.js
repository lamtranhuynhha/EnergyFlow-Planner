/**
 * Energy Profile Scoring Algorithm
 * Tính toán profile từ quiz answers
 */

import { profileMappings } from './energyQuizData';

/**
 * Calculate average weight for a category
 */
const calculateCategoryScore = (answers, category) => {
  const categoryAnswers = answers.filter(a => a.category === category);
  if (categoryAnswers.length === 0) return 0;
  
  const sum = categoryAnswers.reduce((acc, answer) => acc + answer.weight, 0);
  return sum / categoryAnswers.length;
};

/**
 * Map score to profile attribute
 */
const mapScoreToProfile = (score, category) => {
  const mapping = profileMappings[category];
  if (!mapping || !mapping.ranges) return null;
  
  for (const range of mapping.ranges) {
    if (score >= range.min && score <= range.max) {
      return range;
    }
  }
  return mapping.ranges[mapping.ranges.length - 1]; // fallback to last range
};

/**
 * Main scoring function
 * @param {Array} answers - Array of {questionId, category, weight}
 * @returns {Object} energyProfile
 */
export const calculateEnergyProfile = (answers) => {
  // Calculate scores for each category
  const chronotypeScore = calculateCategoryScore(answers, 'chronotype');
  const peakScore = calculateCategoryScore(answers, 'peak');
  const recoveryScore = calculateCategoryScore(answers, 'recovery');
  const externalScore = calculateCategoryScore(answers, 'external');

  // Map to profile attributes
  const chronotypeProfile = mapScoreToProfile(chronotypeScore, 'chronotype');
  const peakProfile = mapScoreToProfile(peakScore, 'peak');
  const recoveryProfile = mapScoreToProfile(recoveryScore, 'recovery');
  const externalProfile = mapScoreToProfile(externalScore, 'external');

  // Build energy profile object
  const profile = {
    chronotype: {
      type: chronotypeProfile.value,
      label: chronotypeProfile.label,
      peakStart: chronotypeProfile.peakStart,
      peakEnd: chronotypeProfile.peakEnd,
      score: chronotypeScore
    },
    amplitude: {
      level: peakProfile.value,
      label: peakProfile.label,
      score: peakScore
    },
    recovery: {
      speed: recoveryProfile.value,
      label: recoveryProfile.label,
      breakTime: recoveryProfile.breakTime,
      score: recoveryScore
    },
    external: {
      flexibility: externalProfile.value,
      label: externalProfile.label,
      score: externalScore
    },
    timestamp: new Date().toISOString()
  };

  return profile;
};

/**
 * Save profile to localStorage
 */
export const saveEnergyProfile = (profile) => {
  localStorage.setItem('energyProfile', JSON.stringify(profile));
};

/**
 * Load profile from localStorage
 */
export const loadEnergyProfile = () => {
  const stored = localStorage.getItem('energyProfile');
  return stored ? JSON.parse(stored) : null;
};

/**
 * Generate energy curve data for visualization
 * Returns array of {hour, energy} for 24 hours
 */
export const generateEnergyCurve = (profile) => {
  const { peakStart, peakEnd } = profile.chronotype;
  const amplitude = profile.amplitude.score;
  
  const curve = [];
  
  for (let hour = 0; hour < 24; hour++) {
    let energy;
    
    // Morning rise
    if (hour < peakStart) {
      energy = 30 + ((hour / peakStart) * 40);
    }
    // Peak period
    else if (hour >= peakStart && hour <= peakEnd) {
      const peakProgress = (hour - peakStart) / (peakEnd - peakStart);
      energy = 70 + (amplitude * 30) * Math.sin(peakProgress * Math.PI);
    }
    // Evening decline
    else {
      const declineProgress = (hour - peakEnd) / (24 - peakEnd);
      energy = 70 - (declineProgress * 50);
    }
    
    // Add some variation
    energy = Math.max(10, Math.min(100, energy + (Math.random() * 10 - 5)));
    
    curve.push({ hour, energy: Math.round(energy) });
  }
  
  return curve;
};
