import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Function to check if a tab is active
  const isActive = (path) => {
    
    if (location.pathname === '/dashboard' && path === '/dashboard/my-account') {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();  
    navigate('/');  
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full lg:h-[67vh] w-64 bg-white z-50 p-5 space-y-4 rounded-r-xl shadow transform transition-transform duration-300 ease-in-out 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:block`}
    >
      {/* Close Icon (Mobile only) */}
      <div className="lg:hidden flex justify-end">
        <button onClick={onClose} className="text-2xl text-gray-700">
          <IoClose />
        </button>
      </div>

      {/* Navigation Links with dynamic styling */}
      <Link
        to="/dashboard/my-account"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/dashboard/my-account') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        My Account
      </Link>
      <Link
        to="/dashboard/profile"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/dashboard/profile') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Profile
      </Link>
      <Link
        to="/dashboard/ads"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/dashboard/ads') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Ads
      </Link>
      <Link
        to="/dashboard/post-ad"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/dashboard/post-ad') ? 'bg-black text-white' : 'text-pink-600 hover:text-pink-800 font-semibold'
        }`}
        onClick={onClose}  
      >
        Post Ad
      </Link>
      <button
        className="block py-2 px-4 rounded-3xl text-gray-700 hover:text-black w-full text-left"
        onClick={handleLogout}  
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;