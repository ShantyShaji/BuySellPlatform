import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AdContext = createContext();

export const AdProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { apiKey, jwt } = useAuth();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://ads.planetmedia.app/api/advertisements', {
          headers: {
            'x-api-key': apiKey,
            Authorization: `Bearer ${jwt}`,
          },
        });

        // Filter ads with owner.id = 522
        const filteredAds = response.data.filter((ad) => ad.owner?.id === 522);
        setAds(filteredAds);
      } catch (err) {
        console.error('Error fetching advertisements:', err);
        setError('Failed to load advertisements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [apiKey, jwt]);

  const deleteAd = async (id) => {
    try {
      await axios.delete(`https://ads.planetmedia.app/api/advertisements/${id}`, {
        headers: {
          'x-api-key': apiKey,
          Authorization: `Bearer ${jwt}`,
        },
      });

      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    } catch (err) {
      console.error('Error deleting advertisement:', err);
      throw new Error('Failed to delete advertisement.');
    }
  };

  return (
    <AdContext.Provider value={{ ads, loading, error, deleteAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAds = () => useContext(AdContext);