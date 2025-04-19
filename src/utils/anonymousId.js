import { nanoid } from 'nanoid';

// List of adjectives and nouns for generating readable IDs
const adjectives = [
  'Cosmic', 'Dreamy', 'Glitter', 'Sparkle', 'Neon', 'Velvet', 'Crystal', 'Silver',
  'Golden', 'Mystic', 'Royal', 'Starry', 'Dazzling', 'Radiant', 'Enchanted', 'Magical',
  'Shining', 'Moonlit', 'Dancing', 'Elegant', 'Graceful', 'Charming', 'Vibrant', 'Vivid'
];

const nouns = [
  'Star', 'Moon', 'Tiger', 'Phoenix', 'Unicorn', 'Dragon', 'Panther', 'Wolf',
  'Falcon', 'Dolphin', 'Eagle', 'Lion', 'Butterfly', 'Rose', 'Lily', 'Orchid',
  'Comet', 'Galaxy', 'Nebula', 'Aurora', 'Crown', 'Jewel', 'Diamond', 'Pearl'
];

// Generate a random anonymous ID
export const generateAnonymousId = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${number}`;
};

// Get the user's anonymous ID from localStorage or generate a new one
export const getOrCreateAnonymousId = () => {
  const storedId = localStorage.getItem('anonymousId');
  if (storedId) {
    return storedId;
  }
  
  const newId = generateAnonymousId();
  localStorage.setItem('anonymousId', newId);
  return newId;
};

// Store user's quiz results in localStorage
export const storeQuizResults = (vibeType, answers) => {
  localStorage.setItem('vibeType', vibeType);
  localStorage.setItem('quizAnswers', JSON.stringify(answers));
};

// Get user's quiz results from localStorage
export const getQuizResults = () => {
  const vibeType = localStorage.getItem('vibeType');
  const answers = JSON.parse(localStorage.getItem('quizAnswers') || '[]');
  return { vibeType, answers };
};

// Calculate compatibility between two users based on their quiz answers
export const calculateCompatibility = (userAnswers, otherUserAnswers) => {
  if (!userAnswers || !otherUserAnswers || userAnswers.length !== otherUserAnswers.length) {
    return 0;
  }
  
  // Count matching answers
  let matches = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === otherUserAnswers[i]) {
      matches++;
    }
  }
  
  // Calculate percentage
  return Math.round((matches / userAnswers.length) * 100);
};
