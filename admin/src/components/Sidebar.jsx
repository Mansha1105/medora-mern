import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const [showSidebar, setShowSidebar] = useState(false)

  const navStyle = ({ isActive }) =>
    `flex items-center gap-4 py-3 px-4 mx-3 rounded-xl transition-all duration-200
    ${
      isActive
        ? 'bg-[#E8F4FB] text-[#2980B9] font-semibold shadow-sm border-l-4 border-[#2980B9]'
        : 'text-gray-600 hover:bg-[#F5FAFD] hover:text-[#2980B9]'
    }`

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setShowSidebar(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md rounded-lg px-3 py-2"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm w-64 z-50 transform transition-transform duration-300
        ${
          showSidebar
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* CLOSE BUTTON MOBILE */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="text-2xl text-gray-500"
          >
            ×
          </button>
        </div>

        {aToken && (
          <div className="pt-6">
            <p className="px-6 pb-4 text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Admin Panel
            </p>

            <ul className="space-y-2">
              <NavLink
                className={navStyle}
                to="/admin-dashboard"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.home_icon}
                  alt=""
                />
                <p>Dashboard</p>
              </NavLink>

              <NavLink
                className={navStyle}
                to="/all-appointments"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.appointment_icon}
                  alt=""
                />
                <p>Appointments</p>
              </NavLink>

              <NavLink
                className={navStyle}
                to="/add-doctor"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.add_icon}
                  alt=""
                />
                <p>Add Doctor</p>
              </NavLink>

              <NavLink
                className={navStyle}
                to="/doctor-list"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.people_icon}
                  alt=""
                />
                <p>Doctors List</p>
              </NavLink>
            </ul>
          </div>
        )}

        {dToken && (
          <div className="pt-6">
            <p className="px-6 pb-4 text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Doctor Panel
            </p>

            <ul className="space-y-2">
              <NavLink
                className={navStyle}
                to="/doctor-dashboard"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.home_icon}
                  alt=""
                />
                <p>Dashboard</p>
              </NavLink>

              <NavLink
                className={navStyle}
                to="/doctor-appointments"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.appointment_icon}
                  alt=""
                />
                <p>Appointments</p>
              </NavLink>

              <NavLink
                className={navStyle}
                to="/doctor-profile"
                onClick={() => setShowSidebar(false)}
              >
                <img
                  className="w-5 h-5"
                  src={assets.people_icon}
                  alt=""
                />
                <p>Doctor Profile</p>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar