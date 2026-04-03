import React from 'react'
import { specialityData } from '../assets/assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-20 px-4"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-[#1E5F8A]">
        Find by Speciality
      </h1>

      <p className="sm:w-1/2 text-center text-sm md:text-base text-gray-500 leading-6">
        Explore our trusted specialists and choose the right doctor
        for your healthcare needs.
      </p>

      {/* 6-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 pt-14 w-full max-w-6xl">
        {specialityData.slice(0, 6).map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="relative flex justify-center group"
          >
            {/* Tilted blue accent background */}
            <div className="absolute top-8 rotate-12 w-56 h-56 bg-[#D6E9FF] rounded-3xl shadow-md group-hover:rotate-6 transition-all duration-300"></div>

            {/* Main white card */}
            <div className="relative bg-white rounded-3xl shadow-xl w-56 h-56 p-6 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-all duration-300 z-10">
              
              {/* Circular icon */}
              <div className="absolute -top-10 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden border border-blue-50">
                <img
                  className="w-14 h-14 object-contain"
                  src={item.image}
                  alt={item.speciality}
                />
              </div>

              {/* Speciality name */}
              <h2 className="mt-10 text-lg font-semibold text-gray-800">
                {item.speciality}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-2 px-2">
                Expert healthcare specialists available
              </p>

              {/* CTA */}
              <button className="mt-4 text-[#2980B9] text-sm font-medium">
                Explore →
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu