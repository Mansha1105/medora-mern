import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8">

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm border border-blue-50 p-5 md:p-6 flex flex-col md:flex-row gap-6 items-start"
          >
            {/* Doctor image */}
            <div>
              <img
                className="w-28 h-28 rounded-full object-cover shadow-sm"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-xl font-semibold text-[#1E5F8A]">
                {item.docData.name}
              </p>

              <p className="text-gray-500 mt-1">
                {item.docData.speciality}
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-500">
                <p className="font-medium text-gray-700">Address</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>

              <div className="mt-4 inline-block px-4 py-2 rounded-full bg-[#F7FBFF] border border-blue-50 text-sm text-gray-600">
                <span className="font-medium text-[#1E5F8A]">
                  Date & Time:
                </span>{' '}
                {item.slotDate} | {item.slotTime}
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col justify-center">
              {item.cancelled ? (
                <div className="px-6 py-3 rounded-full bg-red-50 text-red-500 border border-red-200 text-sm font-medium">
                  Appointment Cancelled
                </div>
              ) : item.isCompleted ? (
                <div className="px-6 py-3 rounded-full bg-green-50 text-green-600 border border-green-200 text-sm font-medium">
                  Appointment Completed
                </div>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-6 py-3 rounded-full border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments