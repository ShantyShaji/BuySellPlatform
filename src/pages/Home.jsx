import { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { Eye } from 'lucide-react'; // Import the Eye icon
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const DailyThingsSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 py-12 mt-16 mx-4 lg:mx-[16vh]">
      {/* Left Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-4xl lg:text-7xl font-medium leading-[3rem] lg:leading-[5rem] text-black pt-3 lg:pt-0">
          Get daily thing <br />
          in same <span className="text-gray-400 font-medium">platform</span>
        </h2>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-4 justify-center lg:justify-end items-center">
        {/* Main Person Image */}
        <div className="relative w-full md:w-62">
          <img src="/hero1.png" alt="User" className=" shadow-md " />
          {/* Sticker */}
          <img src="/hero2.png" alt="Verified" className="absolute top-1/4 right-0 sm:left-2/4 w-32 md:w-42" />
        </div>

        {/* Right Stack of two images */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#e71d6a] text-white px-4 py-10 text-center shadow-md w-full md:w-60 bg-[url(/hero4.png)] bg-cover bg-center">
            <h3 className="text-3xl font-bold">5000 +</h3>
            <p className="text-sm mt-1">DAILY ADS LISTING</p>
          </div>
          <div className="w-full md:w-60">
            <img src="/hero3.png" alt="App Display" className=" shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [ads, setAds] = useState([]); // State to store advertisements
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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

  const handleViewDetails = (id) => {
    navigate(`/ads-details/${id}`);  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Daily Things Section */}
      <DailyThingsSection />

      {/* Main Content */}
      <div className="flex-1 max-w-[85vw] mx-auto px-4 py-6">
        <div className="text-center mb-2">
          <p className="text-pink-500 text-sm font-medium mt-0 lg:mt-10">WHAT'S NEW</p>
          <h1 className="text-3xl font-bold mb-4">Fresh Recommendations</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-pink-500 font-medium">{ads.length} Items</div>
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full p-2 ${
                viewMode === 'grid' ? 'bg-gray-800 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button
              className={`rounded-full p-2 ${
                viewMode === 'list' ? 'bg-gray-800 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>

<div
  className={`grid ${
    viewMode === 'grid'
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : 'grid-cols-1'
  } gap-4 mb-10`}
>
  {ads.map((ad) => (
    <div
      key={ad.id}
      className="relative bg-white rounded-lg overflow-hidden shadow border border-gray-200 hover:border-pink-500 transition duration-300 group"
    >
      {/* Main Product Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={ad.image || 'https://via.placeholder.com/150'} // Use ad image or placeholder
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium mb-2 line-clamp-2 h-10">{ad.title}</h3>
        <p className="text-xs text-gray-500 mb-1">{ad.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-500 font-bold">${ad.price}</span>
          <button
            onClick={() => handleViewDetails(ad.id)} // Navigate to details page
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 group-hover:border-pink-500 group-hover:bg-pink-500 group-hover:text-white transition duration-300"
          >
            <Eye size={18} className="group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;



 