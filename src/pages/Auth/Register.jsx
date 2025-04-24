import React,{ useState} from 'react';
import { LuKeyRound } from "react-icons/lu";
import { LuMailOpen } from "react-icons/lu";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      // Add your form submission logic here
    }
  };
  return (
    <div className="w-full h-auto">
    <Navbar/>
    <div className="w-full h-auto lg:h-[89vh] xl:h-auto my-0 lg:my-14 xl:my-9 lg:overflow-hidden  flex items-center justify-center">
     <div className="w-[80vw] lg:w-[84vw] h-auto min-[2000px]:h-auto border border-[#DFDFDF] rounded-3xl flex flex-col lg:flex-row items-center justify-center bg-[#F509640A]  min-[350px]:mt-20 md:mt-24 min-[350px]:mb-7 md:mb-9 lg:mb-0 lg:mt-16">
      {/* left panel */}
<div className=" w-full lg:w-[60%] h-auto lg:h-full  flex flex-col  rounded-3xl lg:rounded-l-3xl lg:rounded-r-none items-center justify-center gap-3  py-7 bg-white">
    <img src="/logo.png.png" alt="company logo" className='h-6' />
    <p className="text-sm text-center text-gray-500">
          <strong>Listbnb</strong> a Largest Classified Listing Marketplace offers perfect<br/> Ads classifieds...
        </p>

        <h2 className="text-lg font-semibold text-center">Create Your<br/> Account</h2>
   
        <form className=" space-y-3 lg:space-y-2 xl:space-y-3 w-[90%] lg:w-[60%]"onSubmit={handleSubmit}>
            <label htmlFor="">Email <span className='text-red-500 '>*</span></label>
          <div className="relative">
          <LuMailOpen className="absolute right-3 top-4 "/>
            <input
              type="text"
              placeholder="Type here"
              name="email"
              value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-[5px] rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1`}
        
            />
           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <label htmlFor="">Username <span className='text-red-500 '>*</span></label>
          <div className="relative">
          <LuMailOpen className="absolute right-3 top-4 "/>
            <input
              type="text"
              placeholder="Type here"
                name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-[5px] rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1 lg:mt-2`}
              
            />
           {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <label htmlFor="">Password <span className='text-red-500 '>*</span></label>
          <div className="relative">
          <LuKeyRound className="absolute right-3 top-4" />
            <input
              type="password"
              placeholder="Type here"
                name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-[5px] rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1 lg:mt-2`}
          
            />
           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <label htmlFor="">Confirm Password <span className='text-red-500 '>*</span></label>
          <div className="relative">
          <LuKeyRound className="absolute right-3 top-4" />
            <input
              type="password"
              placeholder="Type here"
               name="confirmPassword"
              value={formData.confirmPassword}
                  onChange={handleChange}
              className={`w-full px-4 py-[5px] rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} pl-3 lg:pl-10 focus:outline-none focus:ring-2 focus:ring-pink-500 mt-1 lg:mt-2`}
            
            />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-3xl flex items-center justify-center gap-2 mt-5"
          >
            Register →
          </button>
        </form>
</div>
{/* right panel */}
<div className="w-[40%] h-full hidden lg:flex flex-col  items-center justify-center">
<img
          src="/login_img.png"
          alt="Illustration"
          className="w-64 mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          Already Have an Account<span className="text-pink-600">?</span>
        </h2>
        <p className="text-sm text-gray-500 mt-2 mb-6 px-6">
          To connect with us please login to our<br></br> account if you are having one already
        </p>
        <button className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-3xl">
          Login →
        </button>

</div>
     </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default Register;

