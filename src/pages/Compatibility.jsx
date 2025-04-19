import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getQuizResults, calculateCompatibility } from '../utils/anonymousId';
import { vibeTypes } from '../data/quizData';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import VipUsersSection from '../components/VipUsersSection';
import BuildProfileCard from '../components/BuildProfileCard';
import AnonymousIdsList from '../components/AnonymousIdsList';

function Compatibility({ userId }) {
  const [otherUserId, setOtherUserId] = useState('');
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userVibeType, setUserVibeType] = useState('');
  const location = useLocation();
  
  // Create a ref for the compatibility section
  const compatibilityRef = useRef(null);
  
  useEffect(() => {
    const { vibeType } = getQuizResults();
    setUserVibeType(vibeType);
    
    if (!vibeType) {
      setError('You need to take the quiz first to check compatibility!');
      return;
    }
    
    // Check if there's an ID in the URL query params
    const queryParams = new URLSearchParams(location.search);
    const idFromUrl = queryParams.get('id');
    
    if (idFromUrl) {
      setOtherUserId(idFromUrl);
      // Auto-check compatibility if ID is provided in URL
      checkCompatibility(idFromUrl, vibeType);
      
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.search]);

  const checkCompatibility = async (targetId, userVibeTypeParam) => {
    const targetUserId = targetId || otherUserId;
    
    if (!targetUserId.trim()) {
      setError('Please enter a valid user ID');
      return;
    }
    
    if (targetUserId === userId) {
      setError('You cannot check compatibility with yourself!');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Get the current user's quiz answers
      const { answers: userAnswers, vibeType: currentVibeType } = getQuizResults();
      const effectiveVibeType = userVibeTypeParam || currentVibeType;
      
      if (!userAnswers || !userAnswers.length) {
        setError('You need to take the quiz first!');
        setLoading(false);
        return;
      }
      
      // In a real app, we would fetch the other user's answers from Firebase
      // For now, we'll simulate by generating random answers
      
      // This is a placeholder - in a real implementation, you would query Firestore
      // const usersRef = collection(db, 'users');
      // const q = query(usersRef, where('anonymousId', '==', targetUserId));
      // const querySnapshot = await getDocs(q);
      
      // Simulate other user's data for demo purposes
      const otherUserVibeType = Object.keys(vibeTypes)[Math.floor(Math.random() * Object.keys(vibeTypes).length)];
      const otherUserAnswers = userAnswers.map(() => 
        ['a', 'b', 'c', 'd'][Math.floor(Math.random() * 4)]
      );
      
      // Calculate compatibility percentage
      const compatibilityPercentage = calculateCompatibility(userAnswers, otherUserAnswers);
      
      // Determine compatibility level
      let compatibilityLevel;
      if (compatibilityPercentage >= 80) {
        compatibilityLevel = 'Perfect Match!';
      } else if (compatibilityPercentage >= 60) {
        compatibilityLevel = 'Great Match!';
      } else if (compatibilityPercentage >= 40) {
        compatibilityLevel = 'Good Match';
      } else {
        compatibilityLevel = 'Interesting Match';
      }
      
      // Check if vibe types are compatible
      const isVibeCompatible = vibeTypes[effectiveVibeType].compatibleWith.includes(otherUserVibeType);
      
      setCompatibilityResult({
        percentage: compatibilityPercentage,
        level: compatibilityLevel,
        otherUserVibeType,
        isVibeCompatible,
        otherUserId: targetUserId
      });
      
    } catch (error) {
      console.error('Error checking compatibility:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckCompatibility = () => {
    checkCompatibility();
  };

  return (
    <div className="w-full">
      <div ref={compatibilityRef} className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-['Pacifico'] text-[#9d4edd] text-center mb-8 animate-[float_6s_ease-in-out_infinite]">
          Prom Compatibility Check
        </h1>
        
        {!userVibeType ? (
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] text-center">
            <h2 className="text-xl font-semibold text-[#240046] mb-4">
              Take the Quiz First
            </h2>
            <p className="text-[#240046] mb-6">
              You need to take the vibe check quiz before checking compatibility!
            </p>
            <Link to="/quiz" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
              Take the Quiz Now
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] mb-8">
              <h2 className="text-xl font-semibold text-[#240046] mb-4">
                Enter Someone's Anonymous ID
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={otherUserId}
                  onChange={(e) => setOtherUserId(e.target.value)}
                  placeholder="e.g., CosmicTiger42"
                  className="flex-grow p-3 border border-[#e0aaff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d4edd]"
                />
                
                <button
                  onClick={handleCheckCompatibility}
                  disabled={loading}
                  className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 whitespace-nowrap"
                >
                  {loading ? 'Checking...' : 'Check Compatibility'}
                </button>
              </div>
              
              {error && (
                <p className="text-red-500 mt-4">{error}</p>
              )}
            </div>
            
            {compatibilityResult && (
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] text-center mb-8">
                <h2 className="text-2xl font-semibold text-[#9d4edd] mb-4">
                  Compatibility with {compatibilityResult.otherUserId}
                </h2>
                
                <div className="mb-6">
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#9d4edd] transition-all duration-1000 ease-out"
                      style={{ width: `${compatibilityResult.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: compatibilityResult.isVibeCompatible ? '#9d4edd' : '#6c757d' }}>
                    {compatibilityResult.percentage}% {compatibilityResult.level}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white bg-opacity-50 rounded-lg p-4">
                    <p className="font-semibold mb-2">Your Vibe Type:</p>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl mr-2">{vibeTypes[userVibeType].emoji}</span>
                      <span className="text-lg">{vibeTypes[userVibeType].title}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-50 rounded-lg p-4">
                    <p className="font-semibold mb-2">Their Vibe Type:</p>
                    <div className="flex items-center justify-center">
                      <span className="text-2xl mr-2">{vibeTypes[compatibilityResult.otherUserVibeType].emoji}</span>
                      <span className="text-lg">{vibeTypes[compatibilityResult.otherUserVibeType].title}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-[#240046]">
                    {compatibilityResult.isVibeCompatible 
                      ? 'Your vibe types are naturally compatible! You would make a great prom pair!' 
                      : 'Your vibe types are different, but opposites can attract! You might complement each other well.'}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/messages" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
                    Send Them a Message
                  </Link>
                  
                  <Link to="/create-promposal" className="bg-[#c77dff] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300">
                    Create a Promposal
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* VIP Users Section */}
      <section className="w-full py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-['Pacifico'] text-[#9d4edd] text-center mb-6">
            Featured VIP Profiles
          </h2>
          <VipUsersSection />
        </div>
      </section>
      
      {/* Build Profile Section */}
      <section className="w-full py-8 md:py-12 px-4">
        <div className="max-w-md mx-auto">
          <BuildProfileCard />
        </div>
      </section>
      
      {/* Anonymous IDs Section */}
      <section className="w-full py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-['Pacifico'] text-[#9d4edd] text-center mb-6">
            Find Your Match
          </h2>
          <p className="text-center text-[#240046] max-w-2xl mx-auto mb-8">
            Browse through anonymous IDs and check your compatibility with other users.
            Click on any ID to see how well you match!
          </p>
          <AnonymousIdsList />
        </div>
      </section>
    </div>
  );
}

export default Compatibility;
