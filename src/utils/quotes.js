/**
 * Motivational quotes generator
 * A fun collection of energy and productivity themed quotes
 */

const quotes = [
  "Your energy introduces you before you even speak. ✨",
  "Match your tasks to your energy, not your energy to your tasks.",
  "Work with your rhythm, not against it. 🌊",
  "Peak energy = Peak performance.",
  "Listen to your body, honor your energy. 💫",
  "Small progress is still progress. 🌱",
  "Your vibe attracts your tribe... and your productivity!",
  "Energy management > Time management. ",
  "Flow state activated. Let's go! ",
  "Deep work requires deep energy. 🧘",
  "Rest is productive too. 😴",
  "Align your tasks with your natural rhythms. 🌙",
  "You're doing amazing! Keep the momentum going.",
  "Energy flows where attention goes. 🌟",
  "Work smarter, not harder. Match the task to the energy.",
  "Sometimes, existing is good enough.",
  "Small steps, dramatic results. Trust the math.",
  "Today's vibe: get my life together (again).",
  "I’m tired but I want a good life, so let’s grind respectfully.",
  "Rest, but don’t rot.",
  "Being exhausted is temporary, regret is forever.",
  "It’s okay to be tired. It’s not okay to give up on yourself.",
  "Low energy doesn’t mean low potential.",
  "My coping mechanism is making aesthetic apps about my problems.",

];

/**
 * Get a random motivational quote
 * @returns {string} A random quote from the collection
 */
export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
