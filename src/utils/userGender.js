// Utility functions for managing user gender

// Save user gender to localStorage
export const saveUserGender = (gender) => {
  localStorage.setItem('prompal_user_gender', gender);
};

// Get user gender from localStorage
export const getUserGender = () => {
  return localStorage.getItem('prompal_user_gender');
};

// Save other user's gender to localStorage
export const saveOtherUserGender = (userId, gender) => {
  // Get existing data or initialize empty object
  const otherUsersGender = JSON.parse(localStorage.getItem('prompal_other_users_gender') || '{}');
  
  // Add/update this user's gender
  otherUsersGender[userId] = gender;
  
  // Save back to localStorage
  localStorage.setItem('prompal_other_users_gender', JSON.stringify(otherUsersGender));
};

// Get other user's gender from localStorage
export const getOtherUserGender = (userId) => {
  const otherUsersGender = JSON.parse(localStorage.getItem('prompal_other_users_gender') || '{}');
  return otherUsersGender[userId] || null;
};
