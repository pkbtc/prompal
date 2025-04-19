import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDoc, 
  doc, 
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';

// Collection reference
const promposalsCollection = collection(db, 'promposals');

// Create a new promposal
export const createPromposal = async (fromId, message, theme, effects) => {
  try {
    const promposalData = {
      fromId,
      message,
      theme,
      effects,
      createdAt: serverTimestamp(),
      views: 0
    };
    
    const docRef = await addDoc(promposalsCollection, promposalData);
    return { id: docRef.id, ...promposalData };
  } catch (error) {
    console.error("Error creating promposal:", error);
    throw error;
  }
};

// Get a promposal by ID
export const getPromposalById = async (id) => {
  try {
    const promposalRef = doc(db, 'promposals', id);
    const promposalSnap = await getDoc(promposalRef);
    
    if (promposalSnap.exists()) {
      return {
        id: promposalSnap.id,
        ...promposalSnap.data(),
        createdAt: promposalSnap.data().createdAt?.toDate() || new Date()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting promposal:", error);
    throw error;
  }
};

// Increment the view count for a promposal
export const incrementPromposalViews = async (id) => {
  try {
    const promposalRef = doc(db, 'promposals', id);
    const promposalSnap = await getDoc(promposalRef);
    
    if (promposalSnap.exists()) {
      await updateDoc(promposalRef, {
        views: (promposalSnap.data().views || 0) + 1
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error incrementing promposal views:", error);
    throw error;
  }
};
