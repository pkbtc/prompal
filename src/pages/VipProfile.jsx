import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vipUsers } from '../data/vipUsersData';
import { vibeTypes } from '../data/quizData';

function VipProfile() {
  const { id } = useParams();
  const [vipData, setVipData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    const user = vipUsers.find(user => user.id === id);
    if (user) {
      setVipData(user);
      setSelectedImage(0);
    }
  }, [id]);
  
  if (!vipData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-['Pacifico'] text-[#9d4edd] mb-6">
          VIP Profile Not Found
        </h1>
        <p className="text-lg text-[#240046] mb-8">
          Sorry, we couldn't find this VIP profile.
        </p>
        <Link to="/compatibility" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
          Back to Compatibility
        </Link>
      </div>
    );
  }
  
  const vibeTypeData = vibeTypes[vipData.vibeType];
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link to="/compatibility" className="inline-flex items-center text-[#9d4edd] hover:text-[#240046] mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Compatibility
      </Link>
      
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-[#e0aaff] overflow-hidden">
        <div className="md:flex">
          {/* Main Image Section */}
          <div className="md:w-2/3 relative">
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src={vipData.images[selectedImage]} 
                alt={vipData.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              
              <div className="absolute top-4 left-4 bg-[#9d4edd] text-white px-3 py-1 rounded-full flex items-center">
                <span className="mr-1">✓</span>
                <span>VIP</span>
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex p-2 bg-white bg-opacity-70 backdrop-blur-sm overflow-x-auto">
              {vipData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`min-w-[60px] h-[60px] mx-1 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-[#9d4edd] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${vipData.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Profile Info Section */}
          <div className="md:w-1/3 p-6">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-semibold text-[#240046]">{vipData.name}</h1>
              <span className="ml-2 bg-[#9d4edd] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                ✓
              </span>
            </div>
            
            {vibeTypeData && (
              <div className="mb-6 flex items-center">
                <span className="text-2xl mr-2">{vibeTypeData.emoji}</span>
                <div>
                  <p className="text-[#9d4edd] font-semibold">{vibeTypeData.title}</p>
                  <p className="text-xs text-[#240046]">Vibe Type</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-[#9d4edd] mb-2">About Me</h2>
              <p className="text-[#240046]">{vipData.bio}</p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Message
              </button>
              
              <button className="w-full bg-[#c77dff] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#e0aaff] hover:text-[#240046] transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Check Compatibility
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VipProfile;
