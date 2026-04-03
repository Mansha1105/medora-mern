import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }

    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }

    navigate('/')
  }

  return (
    <div className="flex justify-between items-center pl-20 md:pl-6 pr-4 sm:px-10 py-4 border-b border-gray-200 bg-white shadow-sm">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <p className="text-lg font-semibold text-[#2980B9]">
            MEDORA
          </p>
          <p className="text-xs text-gray-400">
            Healthcare Dashboard
          </p>
        </div>

        <p className="border border-[#2980B9] text-[#2980B9] bg-[#E8F4FB] px-3 py-1 rounded-full text-xs font-medium">
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right Side */}
      <button
        onClick={logout}
        className="bg-[#2980B9] hover:bg-[#1f6691] text-white text-sm px-4 sm:px-8 py-2.5 rounded-xl font-medium transition duration-200 shadow-sm"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar