import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Use mock service until Firebase is fully set up
import { getPromposalById, incrementPromposalViews } from '../services/mockPromposalService';
import Confetti from 'react-confetti';

function ViewPromposal() {
  const { id } = useParams();
  const [promposal, setPromposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const fetchPromposal = async () => {
      try {
        setLoading(true);
        const data = await getPromposalById(id);
        
        if (data) {
          setPromposal(data);
          
          // Increment view count
          await incrementPromposalViews(id);
          
          // Activate effects
          if (data.effects.includes('confetti')) {
            setShowConfetti(true);
          }
          if (data.effects.includes('hearts')) {
            setShowHearts(true);
          }
          if (data.effects.includes('sparkles')) {
            setShowSparkles(true);
          }
          if (data.effects.includes('fireworks')) {
            setShowFireworks(true);
          }
        } else {
          setError('Promposal not found');
        }
      } catch (error) {
        console.error('Error fetching promposal:', error);
        setError('Failed to load promposal. It may have been deleted or the link is invalid.');
      } finally {
        setLoading(false);
      }
    };

    fetchPromposal();
  }, [id]);

  const getThemeStyles = () => {
    if (!promposal) return {};
    
    switch (promposal.theme) {
      case 'dreamy':
        return {
          background: 'linear-gradient(to bottom right, #f8edff, #e0aaff)',
          color: '#240046',
          fontFamily: '"Pacifico", cursive',
        };
      case 'elegant':
        return {
          background: 'linear-gradient(to bottom, #240046, #9d4edd)',
          color: '#ffffff',
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 'bold',
        };
      case 'party':
        return {
          background: 'linear-gradient(45deg, #c77dff, #ffb3c6)',
          color: '#240046',
          fontFamily: '"Poppins", sans-serif',
        };
      case 'adventure':
        return {
          background: 'linear-gradient(to right, #10002b, #240046)',
          color: '#e0aaff',
          fontFamily: '"Poppins", sans-serif',
        };
      default:
        return {
          background: '#e0aaff',
          color: '#240046',
        };
    }
  };

  const getThemeEmoji = () => {
    if (!promposal) return '✨';
    
    switch (promposal.theme) {
      case 'dreamy': return '✨';
      case 'elegant': return '👑';
      case 'party': return '🎉';
      case 'adventure': return '🌙';
      default: return '✨';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-prom-primary mb-4"></div>
          <p className="text-prom-dark">Loading promposal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-3xl font-display text-prom-primary mb-6">
          Oops! Something Went Wrong
        </h1>
        <p className="text-lg text-prom-dark mb-8">
          {error}
        </p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative min-h-[70vh] flex flex-col items-center justify-center">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
        />
      )}
      
      <div 
        className="card p-8 md:p-12 w-full flex flex-col items-center justify-center min-h-[300px] text-center"
        style={getThemeStyles()}
      >
        <div className="text-5xl mb-6 animate-float">
          {getThemeEmoji()}
        </div>
        
        <h1 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: getThemeStyles().fontFamily }}>
          {promposal?.message || "Will you go to prom with me?"}
        </h1>
        
        <p className="mb-6 text-lg">
          From: Anonymous <span className="font-mono">{promposal?.fromId}</span>
        </p>
        
        <div className="text-3xl space-x-2 animate-pulse">
          {showHearts && <span className="animate-float inline-block">💖</span>}
          {showSparkles && <span className="animate-sparkle inline-block">✨</span>}
          {showFireworks && <span className="animate-float inline-block">🎆</span>}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/messages" className="btn-primary mb-4 inline-block">
          Send a Response
        </Link>
        
        <p className="text-sm text-prom-dark mt-4">
          This is an anonymous promposal. To respond, you'll need to send a message to ID: <span className="font-mono">{promposal?.fromId}</span>
        </p>
      </div>
    </div>
  );
}

export default ViewPromposal;
