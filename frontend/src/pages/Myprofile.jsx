import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets_frontend/assets'

const Myprofile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (image) {
        formData.append('image', image)
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        {
          headers: { token }
        }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
  <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8">
    <div className="max-w-5xl mx-auto px-2 md:px-4">

      {/* Top section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Profile image */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <div className="relative">
                <img
                  className="w-40 h-40 rounded-full object-cover border-4 border-[#EAF4FF] shadow-sm"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData.image + '?t=' + Date.now()
                  }
                  alt=""
                />
                <div className="absolute bottom-2 right-2 bg-[#2980B9] rounded-full p-2 shadow-sm">
                  <img
                    className="w-5"
                    src={assets.upload_icon}
                    alt=""
                  />
                </div>
              </div>
              <input
                onChange={e => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-40 h-40 rounded-full object-cover border-4 border-[#EAF4FF] shadow-sm"
              src={userData.image + '?t=' + Date.now()}
              alt=""
            />
          )}
        </div>

        {/* Name and email */}
        <div className="flex-1">
          {isEdit ? (
            <input
              className="text-3xl font-semibold text-[#1E5F8A] bg-[#F7FBFF] rounded-xl px-4 py-2 w-full"
              type="text"
              value={userData.name}
              onChange={e =>
                setUserData(prev => ({
                  ...prev,
                  name: e.target.value
                }))
              }
            />
          ) : (
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1E5F8A]">
              {userData.name}
            </h1>
          )}

          <p className="text-gray-500 mt-2 text-base">
            {userData.email}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-50 my-8"></div>

      {/* Details grid */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Contact */}
        <div className="bg-[#F7FBFF] rounded-2xl p-5">
          <p className="text-lg font-semibold text-[#1E5F8A] mb-4">
            Contact Information
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {isEdit ? (
                <input
                  className="w-full mt-1 bg-white rounded-xl px-3 py-2 border border-blue-50"
                  value={userData.phone}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))
                  }
                />
              ) : (
                <p className="text-gray-700">{userData.phone}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              {isEdit ? (
                <>
                  <input
                    className="w-full mt-1 bg-white rounded-xl px-3 py-2 border border-blue-50"
                    value={userData.address.line1}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value
                        }
                      }))
                    }
                  />
                  <input
                    className="w-full mt-2 bg-white rounded-xl px-3 py-2 border border-blue-50"
                    value={userData.address.line2}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value
                        }
                      }))
                    }
                  />
                </>
              ) : (
                <p className="text-gray-700">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-[#F7FBFF] rounded-2xl p-5">
          <p className="text-lg font-semibold text-[#1E5F8A] mb-4">
            Basic Information
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              {isEdit ? (
                <select
                  className="w-full mt-1 bg-white rounded-xl px-3 py-2 border border-blue-50"
                  value={userData.gender}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      gender: e.target.value
                    }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Birthday</p>
              {isEdit ? (
                <input
                  className="w-full mt-1 bg-white rounded-xl px-3 py-2 border border-blue-50"
                  type="date"
                  value={userData.dob}
                  onChange={e =>
                    setUserData(prev => ({
                      ...prev,
                      dob: e.target.value
                    }))
                  }
                />
              ) : (
                <p className="text-gray-700">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-8">
        {isEdit ? (
          <button
            className="bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-8 py-3 rounded-full transition-all duration-300"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-8 py-3 rounded-full transition-all duration-300"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  </div>
)}

export default Myprofile

