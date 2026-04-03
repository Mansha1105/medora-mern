import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext)

  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full px-6 py-5'>
      <p className='mb-5 text-xl font-semibold text-gray-800'>
        All Appointments
      </p>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>

        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center bg-gray-50 px-6 py-4 text-gray-700 font-semibold border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className='text-center'>Status</p>
        </div>

        {/* Table Rows */}
        <div className='max-h-[75vh] overflow-y-auto'>
          {appointments.map((item, index) => (
            <div
              key={index}
              className='grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center px-6 py-4 border-b text-sm hover:bg-gray-50 transition-all duration-200'
            >
              <p>{index + 1}</p>

              <p className='font-medium text-gray-700'>
                {item.userData?.name}
              </p>

              <p>{calculateAge(item.userData?.dob)}</p>

              <p className='text-gray-600'>
                {item.slotDate}, {item.slotTime}
              </p>

              <p className='text-gray-700'>
                {item.docData?.name}
              </p>

              <p className='font-medium text-gray-800'>
                ₹{item.amount}
              </p>

              <div className='flex justify-center'>
                {item.cancelled ? (
                  <p className='text-red-500 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full'>
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className='text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full'>
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-9 cursor-pointer hover:scale-110 transition'
                    src={assets.cancel_icon}
                    alt='cancel'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllAppointments