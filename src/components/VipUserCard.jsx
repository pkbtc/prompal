import { Link } from 'react-router-dom';

function VipUserCard({ id, name, image }) {
  return (
    <Link 
      to={`/vip/${id}`}
      className="flex flex-col items-center p-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg border border-[#e0aaff] hover:shadow-xl hover:border-[#9d4edd] transition-all duration-300 min-w-[150px] mx-2"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-20 h-20 object-cover rounded-full border-2 border-[#9d4edd]"
        />
        <span className="absolute bottom-0 right-0 bg-[#9d4edd] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          ✓
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-[#240046] text-center">
        {name}
      </h3>
      <p className="text-xs text-[#9d4edd] mt-1">VIP Profile</p>
    </Link>
  );
}

export default VipUserCard;
