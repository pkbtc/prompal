// Mock promposal service for development and testing
// This simulates Firebase Firestore functionality until the real backend is fully set up

// In-memory storage for promposals
let promposals = [
  {
    id: 'prom1',
    fromId: 'CosmicTiger42',
    message: 'Under the stars and moonlit skies, would you make my prom night magical by being my date?',
    theme: 'dreamy',
    effects: ['confetti', 'sparkles'],
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    views: 12
  },
  {
    id: 'prom2',
    fromId: 'MoonWolf89',
    message: 'Let\'s dance the night away and create memories that will last forever. Will you go to prom with me?',
    theme: 'party',
    effects: ['confetti', 'hearts'],
    createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    views: 24
  }
];

// Generate a unique ID
const generateId = () => {
  return 'prom' + Date.now() + Math.floor(Math.random() * 1000);
};

// Create a new promposal
export const createPromposal = async (fromId, message, theme, effects) => {
  try {
    const promposalData = {
      id: generateId(),
      fromId,
      message,
      theme,
      effects,
      createdAt: new Date(),
      views: 0
    };
    
    promposals.push(promposalData);
    return promposalData;
  } catch (error) {
    console.error("Error creating promposal:", error);
    throw error;
  }
};

// Get a promposal by ID
export const getPromposalById = async (id) => {
  try {
    const promposal = promposals.find(p => p.id === id);
    return promposal || null;
  } catch (error) {
    console.error("Error getting promposal:", error);
    throw error;
  }
};

// Increment the view count for a promposal
export const incrementPromposalViews = async (id) => {
  try {
    const promposalIndex = promposals.findIndex(p => p.id === id);
    if (promposalIndex !== -1) {
      promposals[promposalIndex].views += 1;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error incrementing promposal views:", error);
    throw error;
  }
};
