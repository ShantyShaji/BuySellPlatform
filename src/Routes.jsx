import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Advertisement/Dashboard';
import MyAccount from './pages/Advertisement/MyAccount';
import Profile from './pages/Advertisement/Profile';
import Ads from './pages/Advertisement/Ads';
import PostAd from './pages/Advertisement/PostAd';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AdsDetails from './pages/AdsDetails';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ads-details" element={<AdsDetails />} />


      {/* Protected Routes */}
      <Route path="/" element={<Dashboard />}>
        <Route index element={<MyAccount />} /> {/* Default route */}
        <Route path="my-account" element={<MyAccount />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ads" element={<Ads />} />
        <Route path="post-ad" element={<PostAd />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;