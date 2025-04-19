import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizQuestions, calculateVibeType } from '../data/quizData';
import { storeQuizResults } from '../utils/anonymousId';

function Quiz({ userId, setHasCompletedQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (optionId) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Add answer to the array
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    // Check if quiz is complete
    if (currentQuestion < quizQuestions.length - 1) {
      // Move to next question with animation
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      }, 500);
    } else {
      // Quiz completed
      const vibeType = calculateVibeType(newAnswers);
      storeQuizResults(vibeType, newAnswers);
      setHasCompletedQuiz(true);
      
      // Navigate to results page
      setTimeout(() => {
        navigate('/quiz-result');
      }, 800);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-['Pacifico'] text-[#9d4edd] text-center mb-8">
        Prom Vibe Check Quiz
      </h1>
      
      {/* Progress bar */}
      <div className="w-full bg-white bg-opacity-50 rounded-full h-4 mb-8">
        <div 
          className="bg-[#9d4edd] h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={`bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <h2 className="text-xl md:text-2xl font-semibold text-[#240046] mb-6">
          Question {currentQuestion + 1}: {question.question}
        </h2>
        
        <div className="grid gap-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              className="text-left p-4 rounded-lg border border-[#e0aaff] bg-white hover:bg-[#e0aaff]/10 transition-colors"
              onClick={() => handleAnswer(option.id)}
            >
              <span className="font-semibold text-[#9d4edd]">{option.id.toUpperCase()}.</span> {option.text}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-[#240046] mt-8 text-center">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>
      </div>
      
      <p className="text-center mt-8 text-[#240046]">
        Your answers will help determine your prom vibe type and compatibility with others!
      </p>
    </div>
  );
}

export default Quiz;
