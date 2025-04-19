import { useRef } from 'react';
import VipUserCard from './VipUserCard';
import { vipUsers } from '../data/vipUsersData';

function VipUsersSection() {
  const scrollContainerRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-['Pacifico'] text-[#9d4edd]">
          Featured VIP Users
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="bg-white bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center text-[#9d4edd] hover:bg-[#9d4edd] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="bg-white bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center text-[#9d4edd] hover:bg-[#9d4edd] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 px-2">
          {vipUsers.map((user) => (
            <VipUserCard
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.profileImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VipUsersSection;
