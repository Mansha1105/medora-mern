import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) =>
          doc.speciality === speciality &&
          doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
  <div className="flex flex-col items-center gap-4 my-20 px-4 md:px-8 text-gray-900">
    
    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-semibold text-[#1E5F8A]">
      Related Doctors
    </h1>

    <p className="sm:w-1/2 text-center text-sm md:text-base text-gray-500 leading-7">
      Explore more trusted specialists in the same field and
      book your next appointment effortlessly.
    </p>

    {/* Cards */}
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-8">
      {relDoc.slice(0, 5).map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (item.available) {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }
          }}
          className={`bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden transition-all duration-300 ${
            item.available
              ? 'cursor-pointer hover:-translate-y-2 hover:shadow-md'
              : 'cursor-not-allowed opacity-80'
          }`}
        >
          <img
            className="bg-blue-50 w-full h-56 object-cover"
            src={item.image}
            alt={item.name}
          />

          <div className="p-4">
            {/* Availability */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                item.available
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-500'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  item.available
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              ></span>

              {item.available ? 'Available' : 'Unavailable'}
            </div>

            {/* Name */}
            <p className="text-gray-900 text-lg font-semibold mt-3">
              {item.name}
            </p>

            {/* Speciality */}
            <p className="text-gray-500 text-sm mt-1">
              {item.speciality}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <button
      onClick={() => {
        navigate(`/doctors`)
        scrollTo(0, 0)
      }}
      className="bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-10 py-3 rounded-full mt-10 shadow-sm hover:scale-105 transition-all duration-300"
    >
      View More
    </button>
  </div>
)
}

export default RelatedDoctors