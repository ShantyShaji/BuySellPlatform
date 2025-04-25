import React from 'react';

const AdDetailsModal = ({ ad, onClose }) => {
  if (!ad) return null;

  return (
    <div className="fixed inset-0 h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[70vh] lg:h-auto overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">{ad.title}</h3>
        <img
          src={ad.image || 'https://via.placeholder.com/150'}
          alt={ad.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-2">{ad.description}</p>
        <p className="text-lg font-bold text-gray-800 mb-4">${ad.price}</p>
        <p className="text-sm text-gray-500">
          <strong>Owner:</strong> {ad.owner?.firstName || 'Unknown'} {ad.owner?.lastName || ''}
        </p>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDetailsModal;