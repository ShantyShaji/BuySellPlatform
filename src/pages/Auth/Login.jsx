import React, { useState } from 'react';
import { LuKeyRound } from "react-icons/lu";
import { LuMailOpen } from "react-icons/lu";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login, apiKey } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Navigate to the register page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
    
        try {
          const response = await axios.post(
            'https://ads.planetmedia.app/api/auth/local',
            {
              identifier: formData.username,
              password: formData.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
              },
            }
          );
    
          login(response.data.jwt);
          navigate('/dashboard');
        } catch (error) {
          setErrorMessage('Invalid credentials. Please try again.');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="w-full h-auto">
            <Navbar />
            <div className="w-full h-auto lg:h-[89vh] my-0 lg:overflow-hidden flex items-center justify-center">
            <div className="w-[80vw] lg:w-[84vw] h-[85vh] lg:h-[70vh] border-0 lg:border lg:border-[#DFDFDF] rounded-3xl flex flex-col lg:flex-row items-center justify-center bg-white lg:bg-[#F509640A] mt-12 lg:mt-16">

                    {/* Left Panel */}
                    <div className="w-full lg:w-[60%] h-[70vh] lg:h-full flex flex-col rounded-3xl lg:rounded-l-3xl lg:rounded-r-none items-center justify-center gap-4 bg-white">
                        <img src="/logo.png.png" alt="company logo" className="h-6" />
                        <p className="text-sm text-center text-gray-500">
                            <strong>Listbnb</strong> a Largest Classified Listing Marketplace offers perfect<br /> Ads classifieds...
                        </p>

                        <h2 className="text-lg font-semibold text-center">Login To Your<br /> Account</h2>

                        <form className="space-y-3 w-[90%] lg:w-[55%]" onSubmit={handleSubmit}>
                            <label htmlFor="">Username <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <LuMailOpen className="absolute right-3 top-4" />
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-[5px] rounded-lg border border-gray-300 pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1 lg:mt-2"
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            <label htmlFor="">Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <LuKeyRound className="absolute right-3 top-4" />
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    name="password"
                                    className="w-full px-4 py-[5px] rounded-lg border border-gray-300 pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1 lg:mt-2"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-3xl flex items-center justify-center gap-2 mt-7"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login →'}
                            </button>
                            <p className='block lg:hidden text-sm text-center'>Don't have an account? <span className="text-pink-600 cursor-pointer" onClick={handleRegisterRedirect}>Register</span></p>
                        </form>

                        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
                        {errorMessage && <p className="text-red-500 text-sm mt-4">{errorMessage}</p>}
                    </div>

                    {/* Right Panel */}
                    <div className="w-[40%] h-full hidden lg:flex flex-col items-center justify-center">
                        <img
                            src="/login_img.png"
                            alt="Illustration"
                            className="w-64 mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800">
                            Don’t Have an Account<span className="text-pink-600">?</span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-2 mb-4 px-6">
                            To connect with us please register for a new
                            <br /> account if you are not having one already.
                        </p>
                        <button
                         onClick={handleRegisterRedirect}
                        className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-3xl">
                            Register →
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;