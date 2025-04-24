// import React, { useState } from 'react';
// const PostAd = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     photos: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     } else if (formData.description.length < 10) {
//       newErrors.description = 'Description should be at least 10 characters';
//     }

//     if (!formData.photos.trim()) {
//       newErrors.photos = 'At least one photo URL is required';
//     } else {
//       const urls = formData.photos.split(',').map((url) => url.trim());
//       const invalidUrls = urls.filter(
//         (url) => !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(url)
//       );
//       if (invalidUrls.length > 0) {
//         newErrors.photos = 'One or more photo URLs are invalid';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form Submitted:', formData);
//       // Submit logic goes here
//     }
//   };
//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <div className="max-w-2xl mx-auto p-8">
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {[
//             { label: 'Title', name: 'title' },
//             { label: 'Description', name: 'description' },
//             {
//               label: 'Photos',
//               name: 'photos',
//               placeholder: 'Comma-separated image URLs (jpg, png, gif)',
//             },
//           ].map(({ label, name, placeholder = 'Type here' }) => (
//             <div key={name}>
//               <label className="block mb-1 font-medium text-gray-700">
//                 {label}
//                 <span className="text-red-500">*</span>
//               </label>
//               {name === 'description' ? (
//                 <textarea
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   placeholder={placeholder}
//                   className={`w-full px-4 py-2 border ${
//                     errors[name] ? 'border-red-500' : 'border-gray-300'
//                   } rounded-lg focus:outline-none focus:ring-2 ${
//                     errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
//                   }`}
//                   rows={4}
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   placeholder={placeholder}
//                   className={`w-full px-4 py-2 border ${
//                     errors[name] ? 'border-red-500' : 'border-gray-300'
//                   } rounded-lg focus:outline-none focus:ring-2 ${
//                     errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
//                   }`}
//                 />
//               )}
//               {errors[name] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
//               )}
//             </div>
//           ))}

//           <button
//             type="submit"
//             className="w-full py-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 transition duration-200 font-semibold"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostAd;

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to access apiKey and jwt

const PostAd = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    photo: '', // Store the base64 string of the uploaded file
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { apiKey, jwt } = useAuth(); // Access apiKey and jwt from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result })); // Set base64 string
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.price.trim() || isNaN(formData.price)) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description should be at least 10 characters';
    }

    if (!formData.photo.trim()) {
      newErrors.photo = 'Photo is required';
    }

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
      const response = await axios.post(
        'https://ads.planetmedia.app/api/advertisements',
        {
          title: formData.title,
          price: parseFloat(formData.price), // Ensure price is a number
          description: formData.description,
          image: formData.photo, // Send the base64 string as the image
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey, // Use apiKey from AuthContext
            Authorization: `Bearer ${jwt}`, // Use JWT from AuthContext
          },
        }
      );

      setSuccessMessage('Advertisement created successfully!');
      console.log('Advertisement created:', response.data);

      // Clear the form after successful submission
      setFormData({
        title: '',
        price: '',
        description: '',
        photo: '',
      });
    } catch (error) {
      console.error('Error creating advertisement:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to create advertisement. Please try again.'
      );
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
          {[
            { label: 'Title', name: 'title' },
            { label: 'Price', name: 'price', placeholder: 'Enter price' },
            { label: 'Description', name: 'description' },
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
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
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