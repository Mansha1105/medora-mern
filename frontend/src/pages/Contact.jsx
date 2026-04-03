import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className="px-6 md:px-14 lg:px-20 py-12">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#1E5F8A]">
          Contact Us
        </h1>
        <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-7">
          We’re here to help you with appointments, support,
          and any healthcare-related assistance.
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-28">
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            className="w-full max-w-[320px] md:max-w-[400px] rounded-xl shadow-lg"
            src={assets.contact_image}
            alt="Contact"
          />
        </div>

        {/* Contact info card */}
        <div className="bg-white shadow-lg rounded-3xl p-8 md:p-10 w-full max-w-lg border border-blue-50">
          <p className="font-semibold text-2xl text-[#1E5F8A] mb-6">
            Our Office
          </p>

          <p className="text-gray-500 leading-7 text-base mb-5">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p className="text-gray-500 leading-7 text-base mb-6">
            Tel: (+91) 98765-43210 <br />
            Email: medora@gmail.com
          </p>

          <p className="font-semibold text-xl text-[#1E5F8A] mb-3">
            Careers at Medora
          </p>

          <p className="text-gray-500 text-base leading-7 mb-6">
            Learn more about our teams and exciting job opportunities.
          </p>

          <button className="bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-8 py-3 rounded-full shadow-md hover:scale-105 transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact