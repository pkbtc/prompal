// Mock message service for development and testing
// This simulates Firebase Firestore functionality until the real backend is fully set up

// Storage key for messages in localStorage
const STORAGE_KEY = 'prompal_messages';

// Event name for cross-tab communication
const MESSAGE_EVENT = 'prompal_message_update';

// Default sample messages
const DEFAULT_MESSAGES = [
  {
    id: 'msg1',
    fromId: 'MoonWolf89',
    fromGender: 'MALE',
    toId: 'CosmicTiger42',
    content: 'Hey! I saw we have 78% compatibility. Would you like to go to prom together?',
    createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    replyToId: null
  },
  {
    id: 'msg2',
    fromId: 'SparklePhoenix23',
    fromGender: 'FEMALE',
    toId: 'CosmicTiger42',
    content: 'Hi there! I noticed we both have the Party Energetic vibe type. Want to chat about prom?',
    createdAt: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    replyToId: null
  },
  {
    id: 'msg3',
    fromId: 'GlitterUnicorn12',
    fromGender: 'FEMALE',
    toId: 'CosmicTiger42',
    content: 'Our compatibility is 92%! That\'s amazing! Would you like to meet up before prom?',
    createdAt: new Date(new Date().getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: false,
    replyToId: null
  }
];

// Message listeners for real-time updates
const messageListeners = [];

// Add a listener for message updates
export const addMessageListener = (callback) => {
  messageListeners.push(callback);
  return () => {
    const index = messageListeners.indexOf(callback);
    if (index !== -1) {
      messageListeners.splice(index, 1);
    }
  };
};

// Notify all listeners of message updates
const notifyListeners = () => {
  messageListeners.forEach(callback => callback());
};

// Set up storage event listener for cross-tab communication
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      notifyListeners();
    }
  });
}

// Get all messages from localStorage
export const getAllMessages = () => {
  try {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (!storedMessages) {
      // Initialize with default messages if none exist
      const defaultMessages = DEFAULT_MESSAGES;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMessages));
      return defaultMessages;
    }

    // Parse stored messages and convert date strings back to Date objects
    const parsed = JSON.parse(storedMessages);
    return parsed.map(msg => ({
      ...msg,
      createdAt: new Date(msg.createdAt)
    }));
  } catch (error) {
    console.error('Error getting messages from localStorage:', error);
    return DEFAULT_MESSAGES;
  }
};

// Save messages to localStorage and notify listeners
const saveMessages = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    notifyListeners();
    
    // Dispatch storage event for cross-tab communication
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(messages),
        url: window.location.href
      }));
    }
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};

// Generate a unique ID
const generateId = () => {
  return 'msg' + Date.now() + Math.floor(Math.random() * 1000);
};

// Send a message to another user
export const sendMessage = async (fromId, toId, content, fromGender) => {
  try {
    const messageData = {
      id: generateId(),
      fromId,
      toId,
      content,
      createdAt: new Date(),
      read: false,
      replyToId: null,
      fromGender
    };
    
    const currentMessages = getAllMessages();
    const updatedMessages = [...currentMessages, messageData];
    saveMessages(updatedMessages);
    
    return messageData;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Send a reply to a message
export const sendReply = async (fromId, toId, content, replyToId, fromGender) => {
  try {
    const messageData = {
      id: generateId(),
      fromId,
      toId,
      content,
      createdAt: new Date(),
      read: false,
      replyToId,
      fromGender
    };
    
    const currentMessages = getAllMessages();
    const updatedMessages = [...currentMessages, messageData];
    saveMessages(updatedMessages);
    
    return messageData;
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
};

// Get all messages sent to a user
export const getMessagesForUser = async (userId) => {
  try {
    const allMessages = getAllMessages();
    
    // Filter messages where toId matches userId and sort by createdAt in descending order
    const userMessages = allMessages
      .filter(msg => msg.toId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    
    return userMessages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

// Get all messages sent by a user
export const getMessagesSentByUser = async (userId) => {
  try {
    const allMessages = getAllMessages();
    
    // Filter messages where fromId matches userId and sort by createdAt in descending order
    const sentMessages = allMessages
      .filter(msg => msg.fromId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    
    return sentMessages;
  } catch (error) {
    console.error("Error getting sent messages:", error);
    throw error;
  }
};

// Mark a message as read
export const markMessageAsRead = async (messageId) => {
  try {
    const allMessages = getAllMessages();
    const messageIndex = allMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      allMessages[messageIndex].read = true;
      saveMessages(allMessages);
    }
    
    return true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};
