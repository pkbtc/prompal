import { useState, useEffect } from 'react';
// Import from mockMessageService instead of messageService until Firebase is fully set up
import { 
  getMessagesForUser, 
  sendMessage, 
  sendReply, 
  getMessagesSentByUser,
  addMessageListener
} from '../services/mockMessageService';
import { saveUserGender, getUserGender, saveOtherUserGender, getOtherUserGender } from '../utils/userGender';

function Messages({ userId }) {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('received');
  const [userGender, setUserGender] = useState(getUserGender() || '');
  const [showGenderSelection, setShowGenderSelection] = useState(!getUserGender());

  useEffect(() => {
    if (userId) {
      if (userGender) {
        fetchMessages();
        
        // Set up real-time message updates
        const unsubscribe = addMessageListener(() => {
          console.log('Message update detected, refreshing messages...');
          fetchMessages();
        });
        
        // Clean up listener on unmount
        return () => unsubscribe();
      } else {
        setShowGenderSelection(true);
      }
    }
  }, [userId, userGender]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const received = await getMessagesForUser(userId);
      setReceivedMessages(received);
      
      const sent = await getMessagesSentByUser(userId);
      setSentMessages(sent);
      
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!recipientId.trim()) {
      setError('Please enter a recipient ID');
      return;
    }
    
    if (!messageContent.trim()) {
      setError('Please enter a message');
      return;
    }
    
    if (recipientId === userId) {
      setError('You cannot send a message to yourself');
      return;
    }
    
    if (!userGender) {
      setError('Please select your gender first');
      setShowGenderSelection(true);
      return;
    }
    
    try {
      setSendingMessage(true);
      await sendMessage(userId, recipientId, messageContent, userGender);
      setRecipientId('');
      setMessageContent('');
      setError('');
      // No need to manually fetch messages as the listener will handle it
      setActiveTab('sent'); // Switch to sent messages tab
      alert('Message sent successfully to ' + recipientId + '!');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSendReply = async (messageId, toId) => {
    if (!replyContent.trim()) {
      setError('Please enter a reply');
      return;
    }
    
    if (!userGender) {
      setError('Please select your gender first');
      setShowGenderSelection(true);
      return;
    }
    
    try {
      setSendingMessage(true);
      await sendReply(userId, toId, replyContent, messageId, userGender);
      setReplyContent('');
      setReplyingTo(null);
      setError('');
      // No need to manually fetch messages as the listener will handle it
      alert('Reply sent successfully to ' + toId + '!');
    } catch (error) {
      console.error('Error sending reply:', error);
      setError('Failed to send reply. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };
  
  const handleSelectGender = (gender) => {
    setUserGender(gender);
    saveUserGender(gender);
    setShowGenderSelection(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-['Pacifico'] text-[#9d4edd] text-center mb-8">
        Anonymous Messages
      </h1>
      
      {showGenderSelection && (
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] mb-8 text-center">
          <h2 className="text-xl font-semibold text-[#240046] mb-4">
            Please Select Your Gender
          </h2>
          <p className="text-[#240046] mb-6">
            This will be shown alongside your anonymous ID when you send messages.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSelectGender('MALE')}
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Male
            </button>
            <button
              onClick={() => handleSelectGender('FEMALE')}
              className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-pink-600 transition-colors duration-300"
            >
              Female
            </button>
          </div>
        </div>
      )}
      
      {!showGenderSelection && (
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff] mb-8">
          <h2 className="text-xl font-semibold text-[#240046] mb-4">
            Send a Message
          </h2>
        
        <form onSubmit={handleSendMessage}>
          <div className="mb-4">
            <label className="block text-prom-dark mb-2">
              Recipient's Anonymous ID:
            </label>
            <input
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              placeholder="e.g., CosmicTiger42"
              className="w-full p-3 border border-prom-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-prom-primary"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-prom-dark mb-2">
              Your Message:
            </label>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Write your anonymous message here..."
              className="w-full p-3 border border-prom-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-prom-primary min-h-[120px]"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={sendingMessage}
            className="bg-[#9d4edd] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 w-full"
          >
            {sendingMessage ? 'Sending...' : 'Send Anonymous Message'}
          </button>
        </form>
        
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </div>
      )}
      
      {!showGenderSelection && (
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-[#e0aaff]">
          <div className="flex border-b border-[#e0aaff] mb-6">
            <button
              className={`py-3 px-6 font-semibold ${activeTab === 'received' ? 'text-[#9d4edd] border-b-2 border-[#9d4edd]' : 'text-[#240046]'}`}
              onClick={() => setActiveTab('received')}
            >
              Messages Received
            </button>
            <button
              className={`py-3 px-6 font-semibold ${activeTab === 'sent' ? 'text-[#9d4edd] border-b-2 border-[#9d4edd]' : 'text-[#240046]'}`}
              onClick={() => setActiveTab('sent')}
            >
              Messages Sent
            </button>
          </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#240046]">Loading messages...</p>
          </div>
        ) : activeTab === 'received' ? (
          receivedMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#240046]">No messages received yet. Share your anonymous ID with friends!</p>
              <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-lg inline-block">
                <p className="font-semibold">Your Anonymous ID:</p>
                <p className="text-xl font-mono mt-1">{userId} <span className="text-sm ml-2 px-2 py-1 rounded bg-opacity-70 font-normal" style={{ backgroundColor: userGender === 'MALE' ? '#93c5fd' : '#f9a8d4' }}>{userGender}</span></p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {receivedMessages.map((message) => (
              <div key={message.id} className="border border-[#e0aaff] rounded-lg p-4 bg-white bg-opacity-70">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-[#240046]">
                    From: <span className="font-mono">{message.fromId}</span>
                    {message.fromGender && (
                      <span className="text-xs ml-2 px-2 py-0.5 rounded bg-opacity-70" style={{ backgroundColor: message.fromGender === 'MALE' ? '#93c5fd' : '#f9a8d4' }}>
                        {message.fromGender}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#240046]">
                    {message.createdAt.toLocaleDateString()} at {message.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                
                <p className="text-[#240046] mb-4">{message.content}</p>
                
                {replyingTo === message.id ? (
                  <div className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full p-3 border border-[#e0aaff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9d4edd] min-h-[80px]"
                    ></textarea>
                    
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleSendReply(message.id, message.fromId)}
                        disabled={sendingMessage}
                        className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300"
                      >
                        {sendingMessage ? 'Sending...' : 'Send Reply'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="bg-[#c77dff] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(message.id)}
                    className="text-[#9d4edd] hover:text-[#240046] transition-colors"
                  >
                    Reply
                  </button>
                )}
              </div>
            ))}
            </div>
          )
        ) : (
          sentMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#240046]">You haven't sent any messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sentMessages.map((message) => (
                <div key={message.id} className="border border-[#e0aaff] rounded-lg p-4 bg-white bg-opacity-70">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-[#240046]">
                      To: <span className="font-mono">{message.toId}</span>
                    </p>
                    <p className="text-xs text-[#240046]">
                      {message.createdAt.toLocaleDateString()} at {message.createdAt.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <p className="text-[#240046] mb-4">{message.content}</p>
                  
                  <div className="text-xs text-[#9d4edd]">
                    {message.read ? 'Read' : 'Unread'}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      )}
    </div>
  );
}

export default Messages;
