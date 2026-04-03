import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t border-blue-100">
        <hr />
      <div className="md:mx-10 px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 text-sm">
          
          {/* Left */}
          <div>
            <img className="mb-5 w-44" src={assets.logo} alt="Medora logo" />

            <p className="w-full md:w-4/5 text-gray-500 leading-7 text-base">
              Medora is your trusted healthcare companion, helping you
              connect with experienced doctors, manage appointments,
              and access quality care seamlessly.
            </p>
          </div>

          {/* Center */}
          <div>
            <p className="text-xl font-semibold text-[#1E5F8A] mb-5">
              COMPANY
            </p>

            <ul className="flex flex-col gap-3 text-gray-500 text-base">
              <li className="hover:text-[#2980B9] cursor-pointer transition-all duration-200">
                Home
              </li>
              <li className="hover:text-[#2980B9] cursor-pointer transition-all duration-200">
                About Us
              </li>
              <li className="hover:text-[#2980B9] cursor-pointer transition-all duration-200">
                Contact Us
              </li>
              <li className="hover:text-[#2980B9] cursor-pointer transition-all duration-200">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <p className="text-xl font-semibold text-[#1E5F8A] mb-5">
              GET IN TOUCH
            </p>

            <ul className="flex flex-col gap-3 text-gray-500 text-base">
              <li>+91 98765 43210</li>
              <li>medora@gmail.com</li>
              <li>Madurai, Tamil Nadu</li>
            </ul>
          </div>
        </div>
      </div>
      <hr/>

      {/* Bottom */}
      <div className="border-t border-blue-100 py-5">
        <p className="text-sm text-center text-gray-500">
          © 2026 Medora. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer