import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full py-3 px-4 sm:px-8 bg-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link to="/" className="">
            <img src="/logo.png.png" alt="company logo" className="h-8" />
          </Link>
        </div>

        {/* Desktop Navigation Links - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/login" 
            className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
          >
            <CiUser />
            Sign In
          </Link>
          <Link 
            to="/create-ad" 
            className="bg-[#F50963] hover:bg-pink-700 text-white px-5 py-2 rounded-3xl font-medium flex items-center"
          >
            Post Your Ad
            <IoArrowForward className="ml-1" />
          </Link>
        </div>

        {/* Mobile Menu Button - visible only on mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? (
              <IoClose className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - appears below navbar when open */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-2 px-4 border-t border-gray-200"
        >
          <Link 
            to="/login" 
            className="block py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1"
            onClick={() => setIsMenuOpen(false)}
          >
            <CiUser />
            Sign In
          </Link>
          <Link 
            to="/create-ad" 
            className="block py-2 bg-pink-600 hover:bg-pink-700 text-white px-4 rounded-3xl font-medium flex items-center justify-between my-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Post Your Ad
            <IoArrowForward className="ml-1" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;