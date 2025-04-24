import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Advertisement/Home';
import MyAccount from './pages/Advertisement/MyAccount';
import Profile from './pages/Advertisement/Profile';
import Ads from './pages/Advertisement/Ads';
import PostAd from './pages/Advertisement/PostAd';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/" element={<Home />}>
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