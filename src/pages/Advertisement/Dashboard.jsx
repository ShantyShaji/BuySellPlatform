import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import Navbar from '../../common/Navbar'; // Import Navbar
import Footer from '../../common/Footer'; // Import Footer
import { HiMenuAlt3 } from 'react-icons/hi';

const Dashboard = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const breadcrumbMap = {
    '/my-account': 'My Account',
    '/profile': 'Profile',
    '/ads': 'Ads',
    '/post-ad': 'Post Ad',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-[90vw] lg:w-[85vw] flex-1 bg-gray-50 mx-auto  py-10">
        {/* Breadcrumb + Menu Icon */}
        <div className="mb-6 mt-10 lg:mt-20 flex flex-col items-start justify-between lg:justify-start">
          {/* Hamburger Icon (mobile only) */}
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-2xl text-gray-800 mb-4">
            <HiMenuAlt3 />
          </button>
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-gray-700 font-semibold text-sm">
              {breadcrumbMap[location.pathname] || 'My Profile'}
            </span>
          </div>
        </div>

        <div className="flex gap-6 relative">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;