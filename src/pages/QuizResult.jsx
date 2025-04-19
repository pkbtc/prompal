import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizResults } from '../utils/anonymousId';
import { vibeTypes } from '../data/quizData';

function QuizResult({ userId }) {
  const [vibeType, setVibeType] = useState('');
  const [vibeData, setVibeData] = useState(null);
  
  useEffect(() => {
    const { vibeType: storedVibeType } = getQuizResults();
    setVibeType(storedVibeType);
    
    if (storedVibeType && vibeTypes[storedVibeType]) {
      setVibeData(vibeTypes[storedVibeType]);
    }
  }, []);

  if (!vibeData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-['Pacifico'] text-[#9d4edd] mb-6">
          No Quiz Results Found
        </h1>
        <p className="text-lg text-[#240046] mb-8">
          You haven't taken the vibe check quiz yet!
        </p>
        <Link to="/quiz" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
          Take the Quiz Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-['Pacifico'] text-[#9d4edd] text-center mb-8">
        Your Prom Vibe Result
      </h1>
      
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border text-center mb-8" style={{ borderColor: vibeData.color }}>
        <div className="text-5xl mb-4 animate-[float_6s_ease-in-out_infinite]">{vibeData.emoji}</div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: vibeData.color }}>
          {vibeData.title}
        </h2>
        
        <p className="text-lg text-[#240046] mb-6">
          {vibeData.description}
        </p>
        
        <div className="bg-white bg-opacity-50 rounded-lg p-4 inline-block">
          <p className="font-semibold text-[#240046]">Your Anonymous ID:</p>
          <p className="text-xl font-mono mt-1">{userId}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff]">
          <h3 className="text-xl font-semibold text-[#9d4edd] mb-4">
            Most Compatible With
          </h3>
          <ul className="space-y-2">
            {vibeData.compatibleWith.map((compatType) => (
              <li key={compatType} className="flex items-center">
                <span className="text-lg mr-2">{vibeTypes[compatType].emoji}</span>
                <span className="text-[#240046]">{vibeTypes[compatType].title}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff]">
          <h3 className="text-xl font-semibold text-[#9d4edd] mb-4">
            What's Next?
          </h3>
          <p className="text-[#240046] mb-4">
            Share your anonymous ID with friends to check your compatibility!
          </p>
          <Link to="/compatibility" className="bg-[#c77dff] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300 block text-center">
            Check Compatibility
          </Link>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] mt-6 text-center">
        <h3 className="text-xl font-semibold text-[#9d4edd] mb-4">
          Create a Magical Promposal
        </h3>
        <p className="text-[#240046] mb-4">
          Ready to ask someone to prom? Create a personalized promposal with your vibe!
        </p>
        <Link to="/create-promposal" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
          Create Promposal
        </Link>
      </div>
    </div>
  );
}

export default QuizResult;
