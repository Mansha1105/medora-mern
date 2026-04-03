import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const { token, setToken, userData } = useContext(AppContext)

  const adminPanelUrl = 'https://medora-admin-omega.vercel.app/'

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const openAdminPanel = () => {
    window.location.href = adminPanelUrl
  }

  const navLinkStyle = ({ isActive }) =>
    `relative py-2 transition-all duration-300 hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-gray-700'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-44 md:w-52 cursor-pointer transition-transform duration-300 hover:scale-105"
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink className={navLinkStyle} to="/">
            HOME
          </NavLink>
          <NavLink className={navLinkStyle} to="/doctors">
            ALL DOCTORS
          </NavLink>
          <NavLink className={navLinkStyle} to="/about">
            ABOUT
          </NavLink>
          <NavLink className={navLinkStyle} to="/contact">
            CONTACT
          </NavLink>

          {/* Admin Panel Button */}
          <button
            onClick={openAdminPanel}
            className="border border-gray-300 px-6 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            Admin Panel
          </button>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-sm"
                  src={userData.image}
                  alt=""
                />
                <img className="w-3" src={assets.dropdown_icon} alt="" />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-12 hidden group-hover:block">
                <div className="w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
                  <p
                    onClick={() => navigate('/my-profile')}
                    className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-primary text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-xl transition-all duration-300 z-50 ${
          showMenu ? 'w-72' : 'w-0 overflow-hidden'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <img className="w-32" src={assets.logo} alt="" />
          <img
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <ul className="flex flex-col gap-4 px-6 py-6 text-base font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="hover:text-primary">Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p className="hover:text-primary">All Doctors</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="hover:text-primary">About</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="hover:text-primary">Contact</p>
          </NavLink>

          {/* Mobile Admin Button */}
          <button
            onClick={openAdminPanel}
            className="border border-gray-300 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Admin Panel
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar