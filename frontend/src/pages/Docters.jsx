import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Docters = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()

  const [showFilter, setShowFilter] = useState(false)
  const [filterDoc, setFilterDoc] = useState([])

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          doc =>
            doc.speciality.toLowerCase() ===
            speciality.toLowerCase()
        )
      )
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-4 md:px-8 py-8">
      <p className="text-gray-600 text-base md:text-lg">
        Browse through our trusted doctor specialists.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-6 mt-6">

        {/* Mobile filter button */}
        <button
          className={`py-2 px-4 border rounded-xl text-sm transition-all sm:hidden ${
            showFilter ? 'bg-[#2980B9] text-white' : 'bg-white'
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* Filter sidebar */}
        <div
          className={`flex-col gap-3 text-sm ${
            showFilter ? 'flex' : 'hidden sm:flex'
          } sm:min-w-[230px] bg-white rounded-2xl shadow-sm border border-blue-50 p-4`}
        >
          <p className="text-[#1E5F8A] font-semibold text-lg mb-2">
            Specialities
          </p>

          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist',
          ].map((spec, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate('/doctors')
                  : navigate(`/doctors/${spec}`)
              }
              className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                speciality === spec
                  ? 'bg-[#EAF4FF] text-[#2980B9] font-medium'
                  : 'hover:bg-[#F7FBFF] text-gray-600'
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor cards */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.available) {
                  navigate(`/appointment/${item._id}`)
                }
              }}
              className={`border border-blue-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${
                item.available
                  ? 'cursor-pointer hover:shadow-lg hover:-translate-y-2'
                  : 'cursor-not-allowed opacity-80'
              }`}
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  ></p>

                  <p>
                    {item.available
                      ? 'Available'
                      : 'Unavailable'}
                  </p>
                </div>

                <p className="text-gray-900 text-lg font-medium mt-2">
                  {item.name}
                </p>

                <p className="text-gray-600 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Docters