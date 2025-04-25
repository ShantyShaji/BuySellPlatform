import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import AuthContext to access JWT and API key

// Create the ProfileContext
const ProfileContext = createContext();

// ProfileProvider component to wrap the app
export const ProfileProvider = ({ children }) => {
  const { jwt, apiKey } = useAuth(); // Access JWT and API key from AuthContext
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://ads.planetmedia.app/api/profile', {
          headers: {
            'x-api-key': apiKey,
            Authorization: `Bearer ${jwt}`,
          },
        });
        setProfile(response.data); // Set profile data
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (jwt && apiKey) {
      fetchProfile();
    }
  }, [jwt, apiKey]);

  // Update profile data
  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put(
        'https://ads.planetmedia.app/api/profile',
        updatedData,
        {
          headers: {
            'x-api-key': apiKey,
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setProfile(response.data); // Update profile state
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { success: false, error: err.response?.data?.message || 'Failed to update profile.' };
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the ProfileContext
export const useProfile = () => {
  return useContext(ProfileContext);
};