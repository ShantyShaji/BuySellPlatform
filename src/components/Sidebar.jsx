import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Function to check if a tab is active
  const isActive = (path) => {
    // Highlight "My Account" by default when on root route
    if (location.pathname === '/dashboard' && path === '/my-account') {
      return true;
    }
    return location.pathname === path;
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
        to="/my-account"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/my-account') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        My Account
      </Link>
      <Link
        to="/profile"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/profile') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Profile
      </Link>
      <Link
        to="/ads"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/ads') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Ads
      </Link>
      <Link
        to="/post-ad"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/post-ad') ? 'bg-black text-white' : 'text-pink-600 hover:text-pink-800 font-semibold'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Post Ad
      </Link>
      <Link
        to="/logout"
        className={`block py-2 px-4 rounded-3xl ${
          isActive('/logout') ? 'bg-black text-white' : 'text-gray-700 hover:text-black'
        }`}
        onClick={onClose} // Close sidebar on click
      >
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;