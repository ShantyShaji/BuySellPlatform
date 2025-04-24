// import React, { useState } from 'react';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     username: '',
//     photo: '',
//     location: '',
//     contact: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.username) {
//       newErrors.username = 'Username is required';
//     }

//     if (!formData.photo) {
//       newErrors.photo = 'Photo URL is required';
//     } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.photo)) {
//       newErrors.photo = 'Invalid photo URL (must be an image URL)';
//     }

//     if (!formData.location) {
//       newErrors.location = 'Location is required';
//     }

//     if (!formData.contact) {
//       newErrors.contact = 'Contact number is required';
//     } else if (!/^\d{10}$/.test(formData.contact)) {
//       newErrors.contact = 'Contact number must be 10 digits';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form Submitted:', formData);
//       // Add submit logic here (e.g., API call)
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <div className="max-w-2xl mx-auto p-8 lg:h-[60vh] overflow-y-auto">
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {[
//             { label: 'Name', name: 'name' },
//             { label: 'Email', name: 'email' },
//             { label: 'Username', name: 'username' },
//             { label: 'Photo', name: 'photo', placeholder: 'Image URL' },
//             { label: 'Location', name: 'location' },
//             { label: 'Contact Number', name: 'contact' },
//           ].map(({ label, name, placeholder = 'Type here' }) => (
//             <div key={name}>
//               <label className="block mb-1 font-medium text-gray-700">
//                 {label}
//                 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 className={`w-full px-4 py-2 border ${
//                   errors[name] ? 'border-red-500' : 'border-gray-300'
//                 } rounded-lg focus:outline-none focus:ring-2 ${
//                   errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
//                 }`}
//               />
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

// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { jwt, apiKey } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    location: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://ads.planetmedia.app/api/profile', {
          headers: {
            'x-api-key': apiKey,
            Authorization: `Bearer ${jwt}`, // Use JWT from context
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [apiKey, jwt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.put(
        'https://ads.planetmedia.app/api/profile',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          phone: formData.phone,
          location: formData.location,
        },
        {
          headers: {
            'x-api-key': apiKey,
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      alert('Profile updated successfully!');
      console.log('Updated profile:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="max-w-2xl mx-auto p-8 lg:h-[60vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Email', name: 'email' },
            { label: 'Username', name: 'username' },
            { label: 'Phone', name: 'phone' },
            { label: 'Location', name: 'location' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">
                {label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className={`w-full px-4 py-2 border ${
                  errors[name] ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 ${
                  errors[name] ? 'focus:ring-red-500' : 'focus:ring-pink-500'
                }`}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

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

export default Profile;