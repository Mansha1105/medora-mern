import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

const About = () => {
  return (
    <div className="bg-white px-6 md:px-14 lg:px-20 py-12">
      
      {/* Top Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#1E5F8A]">
          About Us
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-7">
          Delivering trusted healthcare with comfort, convenience,
          and a seamless digital experience.
        </p>
      </div>

      {/* Section 1 */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        
        {/* Smaller image */}
        <div className="flex justify-center">
          <img
            className="rounded-full shadow-lg w-full max-w-[320px] md:max-w-[380px]"
            src={assets.about_image}
            alt="About"
          />
        </div>

        {/* Text box */}
        <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#1E5F8A] mb-4">
            Who We Are
          </h2>

          <p className="text-gray-500 leading-7 text-sm md:text-base">
            At Medora, we believe healthcare should be simple,
            accessible, and trustworthy. Our platform helps patients
            connect with experienced doctors and manage appointments
            effortlessly from anywhere.
          </p>
        </div>
      </div>

      {/* What We Do */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-[#1E5F8A]">
          What We Do
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-2 transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#2980B9] mb-3">
            Easy Booking
          </h3>
          <p className="text-gray-500 text-sm leading-6">
            Book appointments with trusted doctors in just a few clicks.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-2 transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#2980B9] mb-3">
            Expert Care
          </h3>
          <p className="text-gray-500 text-sm leading-6">
            Access specialists across multiple medical fields.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 text-center border border-gray-100 hover:-translate-y-2 transition-all duration-300">
          <h3 className="text-lg font-semibold text-[#2980B9] mb-3">
            24/7 Support
          </h3>
          <p className="text-gray-500 text-sm leading-6">
            Reliable healthcare assistance whenever you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#1E5F8A]">
          Why Choose Us
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#F7FBFF] rounded-2xl p-8 shadow-sm border border-blue-50">
          <b className="text-[#2980B9]">Efficiency</b>
          <p className="text-gray-500 mt-3 text-sm leading-6">
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        <div className="bg-[#F7FBFF] rounded-2xl p-8 shadow-sm border border-blue-50">
          <b className="text-[#2980B9]">Convenience</b>
          <p className="text-gray-500 mt-3 text-sm leading-6">
            Access to a trusted network of healthcare professionals.
          </p>
        </div>

        <div className="bg-[#F7FBFF] rounded-2xl p-8 shadow-sm border border-blue-50">
          <b className="text-[#2980B9]">Personalization</b>
          <p className="text-gray-500 mt-3 text-sm leading-6">
            Tailored healthcare reminders and doctor recommendations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About