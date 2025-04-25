import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AdDetailsModal from './AdDetailsModal'; // Import the modal component
import { Trash } from 'lucide-react'; // Import a delete icon

const Ads = () => {
  const [ads, setAds] = useState([]); // State to store advertisements
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAd, setSelectedAd] = useState(null); // State to store the selected ad for the modal
  const { apiKey, jwt } = useAuth(); // Access the API key and JWT from AuthContext

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://ads.planetmedia.app/api/advertisements', {
          headers: {
            'x-api-key': apiKey, // Pass the API key in the headers
            Authorization: `Bearer ${jwt}`, // Pass the JWT in the headers
          },
        });

        // Filter ads with owner.id = 522
        const filteredAds = response.data.filter((ad) => ad.owner?.id === 522);
        setAds(filteredAds); // Store only the filtered ads
      } catch (err) {
        console.error('Error fetching advertisements:', err);
        setError('Failed to load advertisements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [apiKey, jwt]);

  const handleViewAd = (ad) => {
    setSelectedAd(ad); // Set the selected ad for the modal
  };

  const handleCloseModal = () => {
    setSelectedAd(null); // Close the modal
  };

  const handleDeleteAd = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ad?')) return;

    try {
      await axios.delete(`https://ads.planetmedia.app/api/advertisements/${id}`, {
        headers: {
          'x-api-key': apiKey, // Pass the API key in the headers
          Authorization: `Bearer ${jwt}`, // Pass the JWT in the headers
        },
      });

      // Remove the deleted ad from the state
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
      alert('Advertisement deleted successfully!');
    } catch (err) {
      console.error('Error deleting advertisement:', err);
      alert('Failed to delete advertisement. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-5 h-[67vh] overflow-x-hidden lg:overflow-y-auto">
      {/* Listings */}
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="w-[90vw] lg:w-auto bg-white rounded-xl shadow p-5 flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-0"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <img
              src={ad.image || 'https://via.placeholder.com/100'} // Use ad image or placeholder
              alt={ad.title}
              className="w-24 h-24 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{ad.title}</h3>
              <p className="text-sm text-gray-500">{ad.description}</p>
              <p className="text-lg font-bold text-gray-700 mt-1">${ad.price}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
              onClick={() => handleViewAd(ad)} // Open the modal with the selected ad
            >
              View
            </button>
            <button
              className="px-4 py-2 bg-pink-600 text-white whitespace-nowrap rounded-full text-sm hover:bg-pink-700"
            >
              Edit Ad
            </button>
            <button
              className="p-3 bg-gray-100 text-[#FF0000] shadow-md rounded-full text-sm hover:bg-gray-200 flex items-center gap-2"
              onClick={() => handleDeleteAd(ad.id)} // Delete the ad
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Ad Details Modal */}
      {selectedAd && <AdDetailsModal ad={selectedAd} onClose={handleCloseModal} />}
    </div>
  );
};

export default Ads;