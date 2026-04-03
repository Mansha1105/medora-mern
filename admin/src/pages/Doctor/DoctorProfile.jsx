import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {
    dToken,
    profileData,
    setProfileData,
    getProfileData,
    backendUrl
  } = useContext(DoctorContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        {
          fees: profileData.fees,
          address: profileData.address,
          available: profileData.available
        },
        {
          headers: { dtoken: dToken }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    profileData && (
      <div className="w-full min-h-screen bg-slate-50 p-6">
        <div className="w-full space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Doctor Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your professional information and availability
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">

              {/* Left Panel */}
              <div className="bg-[#2980B9] p-8 flex flex-col items-center justify-center">
                <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-md bg-white/10">
                  <img
                    src={profileData.image}
                    alt="doctor"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="mt-6 text-white text-3xl font-bold text-center">
                  Dr. {profileData.name}
                </h2>

                <p className="text-blue-100 text-sm mt-2 text-center">
                  {profileData.speciality}
                </p>

                <span className="mt-4 px-4 py-1 rounded-full bg-white/20 text-white text-sm">
                  {profileData.experience}
                </span>
              </div>

              {/* Right Panel */}
              <div className="p-8 space-y-6">

                {/* About */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    About
                  </h3>
                  <p className="text-slate-500 leading-7 text-sm">
                    {profileData.about}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Degree */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm text-slate-400">
                      Degree
                    </p>
                    <p className="font-semibold text-slate-700 mt-2">
                      {profileData.degree}
                    </p>
                  </div>

                  {/* Fee */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm text-slate-400">
                      Consultation Fee
                    </p>

                    {isEdit ? (
                      <input
                        type="number"
                        value={profileData.fees}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            fees: e.target.value
                          }))
                        }
                        className="mt-2 border rounded-lg px-3 py-2 outline-none w-full"
                      />
                    ) : (
                      <p className="font-semibold text-[#2980B9] mt-2">
                        ₹{profileData.fees}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm text-slate-400">
                      Address
                    </p>

                    {isEdit ? (
                      <div className="space-y-2 mt-2">
                        <input
                          type="text"
                          value={profileData.address.line1}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line1: e.target.value
                              }
                            }))
                          }
                          className="border rounded-lg px-3 py-2 w-full outline-none"
                        />

                        <input
                          type="text"
                          value={profileData.address.line2}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: {
                                ...prev.address,
                                line2: e.target.value
                              }
                            }))
                          }
                          className="border rounded-lg px-3 py-2 w-full outline-none"
                        />
                      </div>
                    ) : (
                      <p className="font-semibold text-slate-700 mt-2 leading-6">
                        {profileData.address.line1}
                        <br />
                        {profileData.address.line2}
                      </p>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-sm text-slate-400">
                      Availability
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={profileData.available}
                        disabled={!isEdit}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            available: e.target.checked
                          }))
                        }
                        className="w-4 h-4 accent-[#2980B9]"
                      />

                      <span className="text-slate-700 font-medium">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() =>
                    isEdit ? updateProfile() : setIsEdit(true)
                  }
                  className="px-6 py-2 rounded-xl bg-[#2980B9] text-white hover:opacity-90 transition"
                >
                  {isEdit ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile