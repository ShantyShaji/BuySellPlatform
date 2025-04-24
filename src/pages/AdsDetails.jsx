import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaPhoneAlt } from "react-icons/fa";
import { TbMailOpenedFilled } from "react-icons/tb";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
 
const AdsDetails = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {/* Navbar */}
      <Navbar />
    <div className="lg:w-[86vw] flex-1 p-6 mt-20">
      {/* Sidebar - Seller Info */}
      <div className="lg:flex lg:justify-between">
        {/* Overview */}
        <div className="bg-white rounded-xl shadow p-6 lg:w-[70%]">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Apple MacBook Air (2023) Apple M2 Chip
        </h1>
        <p className="text-gray-500 mt-1 flex items-center gap-2">
        <IoLocationOutline className='text-[#F50963]' /> New York, United States  <SlCalender className='text-[#F50963] ml-3' /> Nov 01, 2023, 10:00am
        </p>

        {/* Main Product Image */}
        <img
          src="/detail_pic.png"
          alt="MacBook Air"
          className="w-full h-[60vh] object-cover rounded-lg mt-4"
        />
        </div>

        {/* Seller Card */}
        <div className=" flex flex-col gap-5 mt-6 lg:mt-0 lg:w-[28%]">
          <div className="bg-white rounded-xl shadow p-6 flex  justify-between items-center border border-gray-100 mb-4">
            <div className="flex flex-col gap-1">
            <span className="font-bold text-gray-700">Price:</span>
            <span className="text-pink-600 text-3xl font-bold">$599</span>
            </div>
            <img src="/tag.png" alt="" className='h-10' />
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
          <div className="mt-6 flex flex-col items-center">
            <img
              src="/user-avatar.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="font-medium text-gray-800">Astonix D. Dowson</p>
            <p className="text-gray-500 text-sm">Member since Nov 24, 2020</p>
          </div>

          <div className="mt-6 space-y-3 w-[80%] min-[1023px]:w-[90%] max-[1280px]:w-[90%]">
            <button className="w-full flex items-center justify-start gap-4 py-2 px-4 rounded-md text-white bg-stone-100">
          <div className='text-[#F50963] p-3 bg-white shadow-lg rounded-full' >
           <FaPhoneAlt />
           </div>
            <div className="flex flex-col items-start justify-center">
                <p className='text-gray-500 text-sm min-[1023px]:text-xs max-[1280px]:text-xs '>Click to Show Number</p>
                <p className="text-sm min-[1023px]:text-sm max-[1280px]:text-sm xl:text-lg text-black font-semibold">+88xXXXXXXXXX</p>

            </div>
            </button>
            <button className="w-full flex items-center justify-start gap-4 py-2 px-4 rounded-md text-white bg-stone-100">
          <div className='text-[#F50963] p-3 bg-white shadow-lg rounded-full' >
          <TbMailOpenedFilled />
           </div>
            <div className="flex flex-col items-start justify-center">
                <p className='text-gray-500 text-sm min-[1023px]:text-xs max-[1280px]:text-xs'>Click to Show Email</p>
                <p className="text-sm min-[1023px]:text-sm max-[1280px]:text-sm xl:text-lg text-black font-semibold">infoXXXXXXXXX</p>

            </div>
            </button>
            
          </div>
        </div>
        </div>
      </div>
       {/* Product Header */}
       <div className="bg-white rounded-xl shadow p-6 mt-10 lg:w-[70%] mb-7">
         
         <h2 className="text-lg font-semibold mb-4">Overview</h2>
             <p className="text-gray-700 leading-relaxed text-sm pr-0 lg:pr-5">
             The Apple MacBook Air 13.6-Inch laptop is powered by the new M2 chip. It is loaded with 8GB RAM and
256GB SSD. The MacBook Air features a brilliant Retina display, a FaceTime HD camera, and studio‑quality
mics. It comes with the same compact design but now it supports up to 20 hours of battery life and an
active cooling system to sustain enhanced performance. macOS and M2 work together to bring more
speed and responsiveness to all your go‑to apps. The Apple MacBook Air comes with active cooling that
sustains blazing‑fast performance.<br/>
The Apple M2 chip is an 8-core CPU with 4 performance cores and 4 efficiency cores. It comes with 10-
core GPU, 16-core Neural Engine, and 100GB/s memory bandwidth for superfluid multitasking and
working with massive files. The M2 is built using an enhanced second-generation 5‑nanometer
technology. It features over 20 billion transistors - 25 percent more than M1. And its 16-core Neural Engine
is capable of executing up to 15.8 trillion operations per second to accelerate machine learning tasks. The
high-performance media engine on M2 supports ProRes encode and decode. So you can play and edit up
to 11 streams of 4K ProRes video and up to 2 streams of 8K ProRes video. The Apple MacBook Air 13.6-Inch
comes with a brilliant 13.6-inch (diagonal) LED-backlit display with IPS technology; 2560-by-1664 native
resolution at 224 pixels per inch with support for millions of colors. It takes images on an incredible level of
detail and realism. The bright LED backlighting delivers deep blacks and bright whites. It features 500 nits
brightness, Wide color (P3), and True Tone technology.
       
             </p>
   
           
         </div>
    </div>
      {/* Footer */}
    <Footer />
    </div>
  );
};

export default AdsDetails;
