import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useProfile } from '../../context/ProfileContext';
import { useAds } from '../../context/AdContext'; // Import AdContext
import EditProfileModal from './EditProfileModal';
import AdDetailsModal from './AdDetailsModal'; // Import AdDetailsModal

const MyAccount = () => {
  const { profile, loading: profileLoading, error: profileError } = useProfile();
  const { ads, loading: adsLoading, error: adsError } = useAds(); // Consume ads from AdContext
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // State to store the selected ad for the modal

  if (profileLoading || adsLoading) return <div>Loading...</div>;
  if (profileError || adsError) return <div className="text-red-500">{profileError || adsError}</div>;

  const handleViewAd = (ad) => {
    setSelectedAd(ad); // Set the selected ad for the modal
  };

  const handleCloseModal = () => {
    setSelectedAd(null); // Close the modal
  };

  return (
    <div className="flex-1 space-y-6 h-auto lg:h-[67vh] overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <img
            src={profile.photo || "https://via.placeholder.com/60"}
            alt="User"
            className="w-16 h-16 rounded-full"
          />
          <div className="w-full sm:w-[calc(100%-110px)] flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-gray-800">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                Member since<br /> {new Date(profile.createdAt).getFullYear()}
              </p>
            </div>
            <button
              className="border border-gray-300 px-4 py-2 rounded-3xl text-sm hover:bg-gray-100"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <hr className="w-full border-gray-300" />
        <div className="flex items-center text-sm text-gray-500 mt-1 gap-2 flex-wrap">
          <FaMapMarkerAlt className="text-gray-400" />
          {profile.location || 'Location not provided'}
          <MdEmail className="text-gray-400" />
          {profile.email}
          <FaPhoneAlt className="text-gray-400" />
          {profile.phone || 'Phone not provided'}
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Ads List */}
      <div className="space-y-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0"
          >
            <div className="flex gap-4 items-center">
              <img
                src={ad.image || "https://via.placeholder.com/100"}
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
              <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700">
                Edit Ad
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Details Modal */}
      {selectedAd && <AdDetailsModal ad={selectedAd} onClose={handleCloseModal} />}
    </div>
  );
};

export default MyAccount;