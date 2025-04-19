import { Link } from 'react-router-dom';

function Home({ userId, hasCompletedQuiz }) {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-['Pacifico'] text-[#9d4edd] mb-6 animate-[float_6s_ease-in-out_infinite]">
          Find Your Perfect Prom Match
        </h1>
        <p className="text-xl md:text-2xl text-[#240046] max-w-3xl mx-auto mb-8">
          Anonymous. Fun. Magical. Discover your prom vibe and find your perfect match!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {!hasCompletedQuiz ? (
            <Link to="/quiz" className="bg-[#9d4edd] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 text-lg">
              Take the Vibe Quiz
            </Link>
          ) : (
            <Link to="/quiz-result" className="bg-[#9d4edd] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 text-lg">
              View My Vibe
            </Link>
          )}
          
          <Link to="/compatibility" className="bg-[#c77dff] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300 text-lg">
            Check Compatibility
          </Link>
        </div>
        
        <div className="text-[#240046]">
          <p className="font-semibold">Your Anonymous ID:</p>
          <p className="text-xl font-mono bg-white bg-opacity-50 rounded-lg px-4 py-2 inline-block mt-2">
            {userId}
          </p>
          <p className="text-sm mt-2 max-w-md mx-auto">
            Share this ID with friends to check compatibility or receive messages!
          </p>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-8 md:py-12">
        <h2 className="text-3xl font-['Pacifico'] text-[#9d4edd] text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] text-center">
            <div className="text-4xl mb-4 animate-[float_6s_ease-in-out_infinite]">✨</div>
            <h3 className="text-xl font-semibold text-[#240046] mb-2">Discover Your Vibe</h3>
            <p className="text-[#240046]">
              Take our fun personality quiz to find out your prom night vibe type.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] text-center">
            <div className="text-4xl mb-4 animate-[float_6s_ease-in-out_infinite]">📬</div>
            <h3 className="text-xl font-semibold text-[#240046] mb-2">Anonymous Messages</h3>
            <p className="text-[#240046]">
              Send secret messages to your crush or friends using their anonymous ID.
            </p>
          </div>
          
          <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] text-center">
            <div className="text-4xl mb-4 animate-[float_6s_ease-in-out_infinite]">💖</div>
            <h3 className="text-xl font-semibold text-[#240046] mb-2">Create Promposals</h3>
            <p className="text-[#240046]">
              Design a magical promposal and share it with that special someone.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="w-full py-8 md:py-12 text-center px-4">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] max-w-4xl mx-auto bg-gradient-to-r from-[#9d4edd]/10 to-[#c77dff]/10">
          <h2 className="text-3xl font-['Pacifico'] text-[#9d4edd] mb-4">
            Ready for a Magical Prom Night?
          </h2>
          <p className="text-lg text-[#240046] mb-6">
            Start your journey to finding your perfect prom match today!
          </p>
          
          {!hasCompletedQuiz ? (
            <Link to="/quiz" className="bg-[#9d4edd] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 text-lg">
              Take the Quiz Now
            </Link>
          ) : (
            <Link to="/messages" className="bg-[#9d4edd] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 text-lg">
              Check Your Messages
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
