import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className="w-full min-h-[85vh]  rounded-3xl px-6 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden">
      
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center gap-6">
        <span className="bg-[#D6E9FF] text-[#2980B9] text-xs font-semibold px-4 py-1 rounded-full w-fit shadow-sm">
          HEALTH CARE
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E5F8A] leading-tight">
          Trusted Care <br />
          Starts Here<br />
          
        </h1>

        <p className="text-gray-500 text-sm md:text-base leading-7 max-w-md">
          Book appointments with experienced doctors, 
          access expert care,and manage your health
        journey effortlessly in one place.
        </p>

        <div className="flex gap-4 mt-2">
          <a
            href="#speciality"
            className="w-fit bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:scale-105"
          >
            Book Now
          </a>

          <a
            href="#topdoctors"
            className="w-fit border border-[#2980B9] text-[#2980B9] px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#EAF4FF]"
          >
            Explore Doctors
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex justify-center items-center">
        
        {/* Outer Circle */}
        <div className="relative w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-[#EAF4FF] rounded-full shadow-xl flex items-center justify-center">
          
          {/* Inner Circle */}
          <div className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] bg-[#D6E9FF] rounded-full"></div>

          {/* Doctor Image */}
          <img
            className="relative z-10 w-[280px] md:w-[340px] object-contain"
            src={assets.header_img}
            alt="Doctor"
          />

          {/* Floating Card 1 */}
          <div className="absolute top-10 left-2 bg-white shadow-lg rounded-2xl px-4 py-3 text-xs z-20">
            <p className="font-semibold text-[#2980B9]">Top Rated</p>
            <p className="text-gray-500">12.5k+ users</p>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute top-16 right-2 bg-[#D6E9FF] shadow-lg rounded-2xl px-4 py-3 text-xs z-20">
            <p className="font-semibold text-[#2980B9]">24/7 Support</p>
            <p className="text-gray-600">Available</p>
          </div>

          {/* Floating Card 3 */}
          <div className="absolute bottom-10 right-6 bg-white shadow-lg rounded-2xl px-4 py-3 text-xs z-20">
            <p className="font-semibold text-[#2980B9]">100+ Doctors</p>
            <p className="text-gray-500">Specialists</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header