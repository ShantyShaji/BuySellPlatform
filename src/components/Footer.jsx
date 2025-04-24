import React from 'react';
import { FaFacebookF, FaTwitter, FaBehance, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#212121] text-white py-6 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center  ">
      <div className="max-w-7xl w-[90vw] flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/footer_logo.png" alt="company logo" className="h-8" />
        <span className="text-[#F50963]">|</span>
        <p className="text-white/60">Copyright 2024</p>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <FaFacebookF className="text-white/60 hover:text-pink-500 cursor-pointer" />
        <FaTwitter className="text-white/60 hover:text-pink-500 cursor-pointer" />
        <FaBehance className="text-white/60 hover:text-pink-500 cursor-pointer" />
        <FaYoutube className="text-white/60 hover:text-pink-500 cursor-pointer" />
      </div>
      </div>
    </footer>
  );
};

export default Footer;
