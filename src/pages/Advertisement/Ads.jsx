// import React from 'react';

// const Ads = () => {
//   return (
//     <div className="flex flex-col gap-5">
//           {/* Listings */}
//                {[1, 2].map((item, i) => (
//                  <div key={i} className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
//                    <div className="flex gap-4 items-center">
//                      <img
//                        src={i === 0 ? "https://via.placeholder.com/100" : "https://via.placeholder.com/100?text=Headphones"}
//                        alt="Item"
//                        className="w-24 h-24 rounded-md object-cover"
//                      />
//                      <div>
//                        <h3 className="font-semibold text-gray-800">
//                          {i === 0 ? 'Luxury couple apartment' : 'Beats Studio 3 Wireless Over Ear'}
//                        </h3>
//                        <p className="text-sm text-gray-500">
//                          Dallas, Texas · <span className="text-blue-500">24hrs ago</span>
//                        </p>
//                        <p className="text-lg font-bold text-gray-700 mt-1">$124.80</p>
//                      </div>
//                    </div>
//                    <div className="flex gap-3">
//                      <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
//                        View
//                      </button>
//                      <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700">
//                        Edit Ad
//                      </button>
//                    </div>
//                  </div>
//                ))}
//     </div>
//   );
// };

// export default Ads;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Ads = () => {
  const [ads, setAds] = useState([]); // State to store advertisements
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { apiKey } = useAuth(); // Access the API key from AuthContext

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://ads.planetmedia.app/api/advertisements', {
          headers: {
            'x-api-key': apiKey, // Pass the API key in the headers
          },
        });
        setAds(response.data); // Store the fetched ads in state
      } catch (err) {
        console.error('Error fetching advertisements:', err);
        setError('Failed to load advertisements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Listings */}
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0"
        >
          <div className="flex gap-4 items-center">
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
            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
              View
            </button>
            <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700">
              Edit Ad
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ads;