import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// This is a dummy list of anonymous IDs for demonstration
// In a real implementation, you would fetch this from Firebase Firestore
const dummyAnonymousIds = [
  { id: 'CosmicTiger42', vibeType: 'DREAMY_ROMANTIC' },
  { id: 'MoonWolf89', vibeType: 'COOL_ADVENTUROUS' },
  { id: 'SparklePhoenix23', vibeType: 'PARTY_ENERGETIC' },
  { id: 'DreamyDragon55', vibeType: 'DREAMY_ROMANTIC' },
  { id: 'ElegantFalcon77', vibeType: 'ELEGANT_CLASSIC' },
  { id: 'GlitterUnicorn12', vibeType: 'PARTY_ENERGETIC' },
  { id: 'VelvetPanther34', vibeType: 'COOL_ADVENTUROUS' },
  { id: 'StarryEagle67', vibeType: 'ELEGANT_CLASSIC' },
  { id: 'CrystalButterfly21', vibeType: 'DREAMY_ROMANTIC' },
  { id: 'NeonLion45', vibeType: 'PARTY_ENERGETIC' },
  { id: 'SilverWolf78', vibeType: 'COOL_ADVENTUROUS' },
  { id: 'GoldenRose91', vibeType: 'ELEGANT_CLASSIC' }
];

function AnonymousIdsList() {
  const [anonymousIds, setAnonymousIds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching from Firebase
    const fetchAnonymousIds = async () => {
      try {
        // In a real implementation, you would fetch from Firestore
        // const snapshot = await getDocs(collection(db, 'users'));
        // const ids = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Using dummy data for now
        setTimeout(() => {
          setAnonymousIds(dummyAnonymousIds);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching anonymous IDs:', error);
        setLoading(false);
      }
    };
    
    fetchAnonymousIds();
  }, []);
  
  // Function to get a color based on vibe type
  const getVibeTypeColor = (vibeType) => {
    switch (vibeType) {
      case 'DREAMY_ROMANTIC': return '#e0aaff';
      case 'ELEGANT_CLASSIC': return '#9d4edd';
      case 'PARTY_ENERGETIC': return '#c77dff';
      case 'COOL_ADVENTUROUS': return '#240046';
      default: return '#9d4edd';
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#9d4edd] mb-2"></div>
        <p className="text-[#240046]">Loading anonymous users...</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-['Pacifico'] text-[#9d4edd] text-center mb-6">
        All Anonymous Users
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {anonymousIds.map((user) => (
          <Link 
            key={user.id}
            to={`/compatibility?id=${user.id}`}
            className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-3 border border-[#e0aaff] hover:shadow-md hover:border-[#9d4edd] transition-all duration-300 text-center group"
          >
            <div 
              className="w-10 h-10 mx-auto rounded-full mb-2 flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: getVibeTypeColor(user.vibeType) }}
            >
              {user.id.substring(0, 2)}
            </div>
            <p className="text-[#240046] truncate group-hover:text-[#9d4edd] transition-colors">
              {user.id}
            </p>
            <p className="text-xs text-[#9d4edd] opacity-70 mt-1">
              Click to check compatibility
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AnonymousIdsList;
