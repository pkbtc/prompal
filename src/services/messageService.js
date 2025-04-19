import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp, 
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore';

// Collection reference
const messagesCollection = collection(db, 'messages');

// Send a message to another user
export const sendMessage = async (fromId, toId, content, fromGender) => {
  try {
    const messageData = {
      fromId,
      toId,
      content,
      createdAt: serverTimestamp(),
      read: false,
      replyToId: null, // For tracking replies
      fromGender // Include sender's gender
    };
    
    const docRef = await addDoc(messagesCollection, messageData);
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Send a reply to a message
export const sendReply = async (fromId, toId, content, replyToId, fromGender) => {
  try {
    const messageData = {
      fromId,
      toId,
      content,
      createdAt: serverTimestamp(),
      read: false,
      replyToId,
      fromGender // Include sender's gender
    };
    
    const docRef = await addDoc(messagesCollection, messageData);
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error("Error sending reply:", error);
    throw error;
  }
};

// Get all messages sent to a user
export const getMessagesForUser = async (userId) => {
  try {
    const q = query(
      messagesCollection, 
      where("toId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date() // Convert Firestore timestamp to JS Date
      });
    });
    
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
};

// Get all messages sent by a user
export const getMessagesSentByUser = async (userId) => {
  try {
    const q = query(
      messagesCollection, 
      where("fromId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      });
    });
    
    return messages;
  } catch (error) {
    console.error("Error getting sent messages:", error);
    throw error;
  }
};

// Mark a message as read
export const markMessageAsRead = async (messageId) => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      read: true
    });
    return true;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};
