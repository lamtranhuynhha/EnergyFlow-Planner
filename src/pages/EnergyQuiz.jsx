import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { quizQuestions } from '../utils/energyQuizData';
import { calculateEnergyProfile, saveEnergyProfile } from '../utils/energyScoring';
import { useNavigate } from 'react-router-dom';

/**
 * EnergyQuiz Component
 * 12-question quiz to determine user's energy profile
 */
const EnergyQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    // Save answer
    const answer = {
      questionId: question.id,
      category: question.category,
      weight: question.options[selectedOption].weight
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Move to next question or finish
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate and save profile
      const profile = calculateEnergyProfile(newAnswers);
      saveEnergyProfile(profile);
      navigate('/profile-result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption(null);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back to Home Button */}
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-8 left-8 z-50 p-3 rounded-xl glass border border-white/[0.1]
                   hover:bg-white/[0.08] transition-all duration-200"
          aria-label="Back to home"
        >
          <Home className="text-accent-blue" size={20} strokeWidth={2} />
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading text-text-primary tracking-wide mb-4">
            Energy Profile Quiz
          </h1>
          <p className="text-text-secondary text-lg tracking-wide">
            Discover your natural energy rhythm
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-tertiary tracking-wide">
              Câu {currentQuestion + 1} / {quizQuestions.length}
            </span>
            <span className="text-sm text-text-tertiary tracking-wide">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            {/* Question Text */}
            <h2 className="text-xl md:text-2xl font-display text-text-primary tracking-wide mb-8">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSelectOption(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-200
                    border tracking-wide
                    ${
                      selectedOption === index
                        ? 'bg-accent-blue/20 border-accent-blue text-text-primary'
                        : 'bg-white/[0.03] border-white/[0.08] text-text-secondary hover:bg-white/[0.08] hover:border-white/[0.15]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                      w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all
                      ${
                        selectedOption === index
                          ? 'border-accent-blue bg-accent-blue'
                          : 'border-white/[0.3]'
                      }
                    `}
                    >
                      {selectedOption === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-full h-full rounded-full bg-white scale-50"
                        />
                      )}
                    </div>
                    <span className="text-base">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <motion.button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            whileHover={{ scale: currentQuestion === 0 ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl flex items-center gap-2 font-semibold tracking-wide
               transition-all duration-200
               ${
                 currentQuestion === 0
                   ? 'bg-white/[0.03] text-text-tertiary border border-white/[0.08] cursor-not-allowed'
                   : 'bg-white/[0.05] text-text-secondary border border-white/[0.1] hover:bg-white/[0.1]'
               }"
          >
            <ChevronLeft size={20} strokeWidth={2} />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={selectedOption === null}
            whileHover={{ scale: selectedOption === null ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              px-6 py-3 rounded-xl flex items-center gap-2 font-semibold tracking-wide
              transition-all duration-200
              ${
                selectedOption === null
                  ? 'bg-white/[0.05] text-text-tertiary border border-white/[0.08] cursor-not-allowed'
                  : 'bg-accent-blue text-white hover:bg-accent-blue/90'
              }
            `}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight size={20} strokeWidth={2} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EnergyQuiz;
