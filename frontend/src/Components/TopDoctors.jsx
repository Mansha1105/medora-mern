import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div
      id="topdoctors"
      className="flex flex-col items-center gap-4 my-20 text-gray-900 md:mx-10 scroll-mt-24"
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-[#1E5F8A]">
        Top Doctors to Book
      </h1>

      <p className="sm:w-1/2 text-center text-sm md:text-base text-gray-500">
        Explore our trusted specialists and book appointments
        with experienced doctors effortlessly.
      </p>

      <div className="w-full grid grid-cols-auto pt-8 gap-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              if (item.available) {
                navigate(`/appointment/${item._id}`)
                scrollTo(0, 0)
              }
            }}
            className={`border border-blue-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${
              item.available
                ? 'cursor-pointer hover:shadow-xl hover:-translate-y-2'
                : 'cursor-not-allowed opacity-80'
            }`}
            key={index}
          >
            <img
              className="bg-blue-50 w-full h-56 object-cover"
              src={item.image}
              alt={item.name}
            />

            <div className="p-5">
              <div
                className={`flex items-center gap-2 text-sm mb-2 ${
                  item.available ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></p>
                <p>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>

              <p className="text-gray-900 text-lg font-semibold">
                {item.name}
              </p>

              <p className="text-gray-500 text-sm">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate(`/doctors`)
          scrollTo(0, 0)
        }}
        className="bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-10 py-3 rounded-full mt-10 shadow-md hover:scale-105 transition-all duration-300"
      >
        View More
      </button>
    </div>
  )
}

export default TopDoctors