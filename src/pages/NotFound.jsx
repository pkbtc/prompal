import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <h1 className="text-4xl font-['Pacifico'] text-[#9d4edd] mb-6">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-[#240046] mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="bg-[#9d4edd] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#240046] transition-colors duration-300">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
