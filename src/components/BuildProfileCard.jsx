import { useState, useEffect } from 'react';

function BuildProfileCard() {
  const whatsappLink = "https://wa.me/917004584141?text=Hi! I want to create my VIP profile for the Prom site. Here's my Name, Bio, and 4-5 Pics:";
  
  // Animation effect for the glowing border
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    // Create a pulsing glow effect
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        // Oscillate between 0 and 1
        return Math.abs(Math.sin(Date.now() / 1000));
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const glowStyle = {
    boxShadow: `0 0 ${10 + glowIntensity * 15}px ${glowIntensity * 5}px rgba(201, 125, 255, ${0.3 + glowIntensity * 0.4})`,
    transition: 'box-shadow 0.3s ease-out'
  };
  
  return (
    <div 
      className="bg-gradient-to-r from-[#240046] to-[#9d4edd] p-[3px] rounded-xl"
      style={glowStyle}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e0aaff] flex items-center justify-center mb-4">
          <span className="text-2xl">✨</span>
        </div>
        
        <h3 className="text-xl font-['Pacifico'] text-[#9d4edd] mb-2">
          Want to be featured as a VIP?
        </h3>
        
        <p className="text-[#240046] mb-4">
          Get a verified profile, appear in featured listings, and stand out from the crowd!
        </p>
        
        <div className="bg-[#f8edff] rounded-lg p-3 mb-5 w-full">
          <p className="text-sm text-[#240046] mb-1">Price</p>
          <p className="text-2xl font-bold text-[#9d4edd]">₹99</p>
          <p className="text-xs text-[#240046] opacity-70">One-time payment</p>
        </div>
        
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center w-full"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contact on WhatsApp
        </a>
        
        <p className="text-xs text-[#240046] mt-4 opacity-70">
          Send us your name, bio, and 4-5 photos to create your VIP profile
        </p>
      </div>
    </div>
  );
}

export default BuildProfileCard;
