import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const PostAd = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { apiKey, jwt } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price.trim() || isNaN(formData.price)) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Extract base64 data (remove the prefix if needed)
      const base64Data = formData.photo.split(',')[1] || formData.photo;

      const requestBody = {
        title: formData.title,
        price: parseFloat(formData.price), // Ensure price is a number
        description: formData.description,
        image: base64Data, // Send the base64 string
      };

      const response = await axios.post(
        'https://ads.planetmedia.app/api/advertisements',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'Authorization': `Bearer ${jwt}`,
          },
        }
      );

      setSuccessMessage('Advertisement created successfully!');
      setFormData({
        title: '',
        price: '',
        description: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error creating advertisement:', error);
      let errorMsg = 'Failed to create advertisement. Please try again.';
      
      if (error.response) {
        // Handle specific error responses
        if (error.response.status === 401) {
          errorMsg = 'Unauthorized: Please login again.';
        } else if (error.response.status === 403) {
          errorMsg = 'Forbidden: Invalid API key.';
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        }
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="max-w-2xl mx-auto p-8 lg:h-[60vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Post an Advertisement</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Type here"
              className={`w-full px-4 py-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.title ? 'focus:ring-red-500' : 'focus:ring-pink-500'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Price Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={`w-full px-4 py-2 border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.price ? 'focus:ring-red-500' : 'focus:ring-pink-500'
              }`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type here"
              className={`w-full px-4 py-2 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 ${
                errors.description ? 'focus:ring-red-500' : 'focus:ring-pink-500'
              }`}
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Photo Field */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
            {formData.photo && (
              <div className="mt-2">
                <img 
                  src={formData.photo} 
                  alt="Preview" 
                  className="h-20 w-20 object-cover rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 transition duration-200 font-semibold"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;