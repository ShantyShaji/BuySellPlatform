import React, { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext';

const EditProfileModal = ({ profile, onClose }) => {
  const { updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    location: '',
    phone: '',
  });
  const [updateError, setUpdateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        username: profile.username || '',
        location: profile.location || '',
        phone: profile.phone || '',
      });
    }

    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setUpdateError('');
    setSuccessMessage('');
    const result = await updateProfile(formData);
    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
      alert('Profile updated successfully!');
      onClose();
    } else {
      setUpdateError(result.error);
    }
  };

  return (
    <div className="fixed inset-0 h-screen bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[70vh] lg:h-auto overflow-y-auto ">
        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
        {updateError && <p className="text-red-500 mb-4">{updateError}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form className="space-y-4">
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Email', name: 'email' },
            { label: 'Username', name: 'username' },
            { label: 'Location', name: 'location' },
            { label: 'Phone', name: 'phone' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
