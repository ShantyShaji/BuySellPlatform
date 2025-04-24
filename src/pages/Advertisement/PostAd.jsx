import React, { useState } from 'react';
const PostAd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photos: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }

    if (!formData.photos.trim()) {
      newErrors.photos = 'At least one photo URL is required';
    } else {
      const urls = formData.photos.split(',').map((url) => url.trim());
      const invalidUrls = urls.filter(
        (url) => !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)
      );
      if (invalidUrls.length > 0) {
        newErrors.photos = 'One or more photo URLs are invalid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', formData);
      // Submit logic goes here
    }
  };
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="max-w-2xl mx-auto p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: 'Title', name: 'title' },
            { label: 'Description', name: 'description' },
            {
              label: 'Photos',
              name: 'photos',
              placeholder: 'Comma-separated image URLs (jpg, png, gif)',
            },
          ].map(({ label, name, placeholder = 'Type here' }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">
                {label}
                <span className="text-red-500">*</span>
              </label>
              {name === 'description' ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
                  }`}
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full px-4 py-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
                  }`}
                />
              )}
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 transition duration-200 font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;