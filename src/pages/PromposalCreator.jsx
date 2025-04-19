import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Use mock service until Firebase is fully set up
import { createPromposal } from '../services/mockPromposalService';

function PromposalCreator({ userId }) {
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('dreamy');
  const [effects, setEffects] = useState(['confetti']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  const themes = [
    { id: 'dreamy', name: 'Dreamy Starlight', color: '#e0aaff', emoji: '✨' },
    { id: 'elegant', name: 'Elegant Classic', color: '#9d4edd', emoji: '👑' },
    { id: 'party', name: 'Party Vibes', color: '#c77dff', emoji: '🎉' },
    { id: 'adventure', name: 'Moonlit Adventure', color: '#240046', emoji: '🌙' },
  ];

  const effectOptions = [
    { id: 'confetti', name: 'Confetti Shower', emoji: '🎊' },
    { id: 'hearts', name: 'Floating Hearts', emoji: '💖' },
    { id: 'sparkles', name: 'Magical Sparkles', emoji: '✨' },
    { id: 'fireworks', name: 'Fireworks Display', emoji: '🎆' },
  ];

  const handleEffectToggle = (effectId) => {
    if (effects.includes(effectId)) {
      setEffects(effects.filter(id => id !== effectId));
    } else {
      setEffects([...effects, effectId]);
    }
  };

  const handleCreatePromposal = async () => {
    if (!message.trim()) {
      setError('Please enter a promposal message');
      return;
    }
    
    try {
      setLoading(true);
      const promposal = await createPromposal(userId, message, theme, effects);
      navigate(`/promposal/${promposal.id}`);
    } catch (error) {
      console.error('Error creating promposal:', error);
      setError('Failed to create promposal. Please try again.');
      setLoading(false);
    }
  };

  const getThemeStyles = () => {
    const selectedTheme = themes.find(t => t.id === theme);
    
    switch (theme) {
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
          background: selectedTheme?.color || '#e0aaff',
          color: '#240046',
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-['Pacifico'] text-[#9d4edd] text-center mb-8">
        Promposal Creator
      </h1>
      
      {previewMode ? (
        <div className="mb-8">
          <div 
            className="card p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center"
            style={getThemeStyles()}
          >
            <div className="text-4xl mb-4">
              {themes.find(t => t.id === theme)?.emoji || '✨'}
            </div>
            
            <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: getThemeStyles().fontFamily }}>
              {message || "Will you go to prom with me?"}
            </h2>
            
            <p className="mb-4">From: Anonymous {userId}</p>
            
            <div className="text-2xl">
              {effects.includes('hearts') && '💖 '}
              {effects.includes('sparkles') && '✨ '}
              {effects.includes('fireworks') && '🎆 '}
              {effects.includes('confetti') && '🎊 '}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPreviewMode(false)}
              className="bg-[#c77dff] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300"
            >
              Edit Promposal
            </button>
            
            <button
              onClick={handleCreatePromposal}
              disabled={loading}
              className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300"
            >
              {loading ? 'Creating...' : 'Create & Share'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] mb-8">
          <h2 className="text-xl font-semibold text-[#240046] mb-6">
            Design Your Promposal
          </h2>
          
          <div className="mb-6">
            <label className="block text-[#240046] mb-2">
              Your Promposal Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Will you go to prom with me?"
              className="w-full p-3 border border-[#e0aaff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d4edd] min-h-[120px]"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-[#240046] mb-2">
              Choose a Theme:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    theme === themeOption.id 
                      ? 'border-[#9d4edd] ring-2 ring-[#9d4edd]' 
                      : 'border-[#e0aaff] hover:border-[#c77dff]'
                  }`}
                  style={{
                    background: theme === themeOption.id 
                      ? `linear-gradient(to bottom right, white, ${themeOption.color})`
                      : 'white',
                  }}
                >
                  <div className="text-2xl mb-2">{themeOption.emoji}</div>
                  <p className="font-semibold text-[#240046]">{themeOption.name}</p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-[#240046] mb-2">
              Add Special Effects (select multiple):
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {effectOptions.map((effect) => (
                <button
                  key={effect.id}
                  onClick={() => handleEffectToggle(effect.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    effects.includes(effect.id) 
                      ? 'border-[#9d4edd] ring-2 ring-[#9d4edd] bg-[#e0aaff]/20' 
                      : 'border-[#e0aaff] hover:border-[#c77dff] bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">{effect.emoji}</div>
                  <p className="font-semibold text-[#240046]">{effect.name}</p>
                </button>
              ))}
            </div>
          </div>
          
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setPreviewMode(true)}
              className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300"
            >
              Preview Promposal
            </button>
          </div>
        </div>
      )}
      
      <div className="card text-center">
        <h3 className="text-xl font-semibold text-prom-primary mb-4">
          How It Works
        </h3>
        <p className="text-prom-dark mb-4">
          Create your perfect promposal and share it with a special link. When they open it, 
          they'll see your message with beautiful animations and effects!
        </p>
        <p className="text-sm text-prom-dark">
          Your promposal will be anonymous, but will include your anonymous ID so they can respond.
        </p>
      </div>
    </div>
  );
}

export default PromposalCreator;
