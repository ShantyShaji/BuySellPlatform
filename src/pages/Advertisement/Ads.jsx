import React from 'react';

const Ads = () => {
  return (
    <div className="flex flex-col gap-5">
          {/* Listings */}
               {[1, 2].map((item, i) => (
                 <div key={i} className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                   <div className="flex gap-4 items-center">
                     <img
                       src={i === 0 ? "https://via.placeholder.com/100" : "https://via.placeholder.com/100?text=Headphones"}
                       alt="Item"
                       className="w-24 h-24 rounded-md object-cover"
                     />
                     <div>
                       <h3 className="font-semibold text-gray-800">
                         {i === 0 ? 'Luxury couple apartment' : 'Beats Studio 3 Wireless Over Ear'}
                       </h3>
                       <p className="text-sm text-gray-500">
                         Dallas, Texas · <span className="text-blue-500">24hrs ago</span>
                       </p>
                       <p className="text-lg font-bold text-gray-700 mt-1">$124.80</p>
                     </div>
                   </div>
                   <div className="flex gap-3">
                     <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                       View
                     </button>
                     <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700">
                       Edit Ad
                     </button>
                   </div>
                 </div>
               ))}
    </div>
  );
};

export default Ads;