import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ userId, hasCompletedQuiz }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-['Pacifico'] text-[#9d4edd]">
            PromPal
            <span className="text-[#c77dff]">✨</span>
          </h1>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-[#240046]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[#240046] hover:text-[#9d4edd] transition-colors">
            Home
          </Link>
          
          {hasCompletedQuiz ? (
            <>
              <Link to="/quiz-result" className="text-[#240046] hover:text-[#9d4edd] transition-colors">
                My Vibe
              </Link>
              <Link to="/compatibility" className="text-[#240046] hover:text-[#9d4edd] transition-colors">
                Compatibility
              </Link>
            </>
          ) : (
            <Link to="/quiz" className="text-[#240046] hover:text-[#9d4edd] transition-colors">
              Take Quiz
            </Link>
          )}
          
          <Link to="/messages" className="text-[#240046] hover:text-[#9d4edd] transition-colors">
            Messages
          </Link>
          
          <Link to="/create-promposal" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
            Create Promposal
          </Link>
          
          <div className="text-sm text-[#240046] border border-[#e0aaff] rounded-full px-3 py-1">
            ID: {userId}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-[#240046] hover:text-[#9d4edd] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {hasCompletedQuiz ? (
              <>
                <Link 
                  to="/quiz-result" 
                  className="text-[#240046] hover:text-[#9d4edd] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Vibe
                </Link>
                <Link 
                  to="/compatibility" 
                  className="text-[#240046] hover:text-[#9d4edd] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Compatibility
                </Link>
              </>
            ) : (
              <Link 
                to="/quiz" 
                className="text-[#240046] hover:text-[#9d4edd] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Take Quiz
              </Link>
            )}
            
            <Link 
              to="/messages" 
              className="text-[#240046] hover:text-[#9d4edd] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Messages
            </Link>
            
            <Link 
              to="/create-promposal" 
              className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Promposal
            </Link>
            
            <div className="text-sm text-[#240046] border border-[#e0aaff] rounded-full px-3 py-1 inline-block">
              ID: {userId}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
