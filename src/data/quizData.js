export const quizQuestions = [
  {
    id: 1,
    question: "What's your ideal prom night vibe?",
    options: [
      { id: 'a', text: "Elegant and sophisticated" },
      { id: 'b', text: "Fun and energetic" },
      { id: 'c', text: "Magical and dreamy" },
      { id: 'd', text: "Chill and laid-back" }
    ]
  },
  {
    id: 2,
    question: "Pick your dream prom song:",
    options: [
      { id: 'a', text: "A romantic slow dance classic" },
      { id: 'b', text: "An upbeat pop anthem" },
      { id: 'c', text: "A nostalgic throwback hit" },
      { id: 'd', text: "An indie track with deep lyrics" }
    ]
  },
  {
    id: 3,
    question: "How would you spend the after-party?",
    options: [
      { id: 'a', text: "Stargazing and deep conversations" },
      { id: 'b', text: "Dancing until sunrise" },
      { id: 'c', text: "Movie marathon with friends" },
      { id: 'd', text: "Midnight adventure in the city" }
    ]
  },
  {
    id: 4,
    question: "Which color scheme speaks to you?",
    options: [
      { id: 'a', text: "Classic black and gold" },
      { id: 'b', text: "Pastel dreamscape" },
      { id: 'c', text: "Vibrant neon" },
      { id: 'd', text: "Celestial blues and purples" }
    ]
  },
  {
    id: 5,
    question: "What's your go-to dance move?",
    options: [
      { id: 'a', text: "Elegant twirl" },
      { id: 'b', text: "Energetic jump and wave" },
      { id: 'c', text: "Smooth side-to-side" },
      { id: 'd', text: "I just vibe to the rhythm" }
    ]
  },
  {
    id: 6,
    question: "Pick your prom night accessory:",
    options: [
      { id: 'a', text: "Statement jewelry" },
      { id: 'b', text: "Unique corsage/boutonniere" },
      { id: 'c', text: "Custom shoes" },
      { id: 'd', text: "Vintage-inspired piece" }
    ]
  },
  {
    id: 7,
    question: "How do you prepare for prom day?",
    options: [
      { id: 'a', text: "Detailed planning weeks in advance" },
      { id: 'b', text: "Last-minute rush but it always works out" },
      { id: 'c', text: "Focus on the perfect outfit" },
      { id: 'd', text: "Keep it simple and stress-free" }
    ]
  }
];

export const vibeTypes = {
  "DREAMY_ROMANTIC": {
    title: "Dreamy Romantic",
    description: "You're all about the magic and romance of prom night. Slow dances, meaningful glances, and creating memories that last forever are your style.",
    emoji: "✨💖",
    compatibleWith: ["DREAMY_ROMANTIC", "ELEGANT_CLASSIC"],
    color: "#e0aaff"
  },
  "ELEGANT_CLASSIC": {
    title: "Elegant Classic",
    description: "Sophistication is your middle name. You appreciate tradition, elegance, and timeless moments that feel like they're straight out of a movie.",
    emoji: "👑🌹",
    compatibleWith: ["ELEGANT_CLASSIC", "DREAMY_ROMANTIC"],
    color: "#9d4edd"
  },
  "PARTY_ENERGETIC": {
    title: "Party Energetic",
    description: "For you, prom is all about having the most fun possible! Dancing, laughing, and creating an unforgettable night of celebration is your priority.",
    emoji: "🎉💃",
    compatibleWith: ["PARTY_ENERGETIC", "COOL_ADVENTUROUS"],
    color: "#c77dff"
  },
  "COOL_ADVENTUROUS": {
    title: "Cool Adventurous",
    description: "You march to the beat of your own drum. Prom is just one part of an amazing night of adventure and unexpected memories.",
    emoji: "🌙🚀",
    compatibleWith: ["COOL_ADVENTUROUS", "PARTY_ENERGETIC"],
    color: "#240046"
  }
};

// Function to calculate vibe type based on answers
export const calculateVibeType = (answers) => {
  // Count the frequency of each answer
  const counts = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0
  };
  
  answers.forEach(answer => {
    counts[answer]++;
  });
  
  // Determine the dominant answer
  let maxCount = 0;
  let dominantAnswer = '';
  
  for (const [answer, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantAnswer = answer;
    }
  }
  
  // Map the dominant answer to a vibe type
  switch (dominantAnswer) {
    case 'a':
      return "ELEGANT_CLASSIC";
    case 'b':
      return "PARTY_ENERGETIC";
    case 'c':
      return "DREAMY_ROMANTIC";
    case 'd':
      return "COOL_ADVENTUROUS";
    default:
      return "DREAMY_ROMANTIC"; // Default fallback
  }
};
