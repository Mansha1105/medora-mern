import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts'

const Dashboard = () => {
  const {
    aToken,
    getDashData,
    cancelAppointment,
    dashData
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  // Prepare graph data from all appointments
  const groupedAppointments = {}

  dashData?.allAppointments?.forEach((item) => {
    const date = item.slotDate

    if (!groupedAppointments[date]) {
      groupedAppointments[date] = {
        day: date,
        booked: 0,
        cancelled: 0
      }
    }

    if (item.cancelled) {
      groupedAppointments[date].cancelled += 1
    } else {
      groupedAppointments[date].booked += 1
    }
  })

  const appointmentTrendData = Object.values(groupedAppointments)

  return (
    dashData && (
      <div className='w-full px-6 py-6'>

        {/* Heading */}
        <p className='text-2xl font-semibold text-gray-800 mb-6'>
          Dashboard Overview
        </p>

        {/* Top Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>

          {/* Doctors */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition'>
            <div className='w-12 h-12 rounded-xl bg-[#E8F4FB] flex items-center justify-center text-[#2980B9] text-xl font-bold shrink-0'>
              D
            </div>

            <div className='flex flex-col'>
              <p className='text-2xl font-bold text-[#2980B9] leading-none'>
                {dashData.doctors}
              </p>
              <p className='text-sm text-gray-500 mt-1'>
                Doctors
              </p>
            </div>
          </div>

          {/* Appointments */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition'>
            <div className='w-12 h-12 rounded-xl bg-[#E8F4FB] flex items-center justify-center text-[#2980B9] text-xl font-bold shrink-0'>
              A
            </div>

            <div className='flex flex-col'>
              <p className='text-2xl font-bold text-[#2980B9] leading-none'>
                {dashData.appointments}
              </p>
              <p className='text-sm text-gray-500 mt-1'>
                Appointments
              </p>
            </div>
          </div>

          {/* Patients */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition'>
            <div className='w-12 h-12 rounded-xl bg-[#E8F4FB] flex items-center justify-center text-[#2980B9] text-xl font-bold shrink-0'>
              P
            </div>

            <div className='flex flex-col'>
              <p className='text-2xl font-bold text-[#2980B9] leading-none'>
                {dashData.patients}
              </p>
              <p className='text-sm text-gray-500 mt-1'>
                Patients
              </p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className='mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='px-6 py-4 border-b bg-gray-50'>
            <p className='font-semibold text-gray-700'>
              Latest Appointments
            </p>
          </div>

          <div>
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between px-6 py-4 border-b hover:bg-[#F8FBFD] transition'
              >
                <div className='flex items-center gap-4'>
                  <img
                    className='w-12 h-12 rounded-full object-cover'
                    src={item.docData.image}
                    alt=''
                  />

                  <div className='flex flex-col'>
                    <p className='font-medium text-gray-800'>
                      {item.docData.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Booking on {item.slotDate}
                    </p>
                  </div>
                </div>

                <div className='flex items-center justify-center min-w-24'>
                  {!item.cancelled ? (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-8 cursor-pointer hover:scale-110 transition'
                      src={assets.cancel_icon}
                      alt='cancel'
                    />
                  ) : (
                    <p className='text-red-500 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full'>
                      Cancelled
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Trends Graph */}
        <div className='mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
          <div className='flex justify-between items-center mb-4'>
            <p className='font-semibold text-gray-700'>
              Appointment Trends
            </p>

            <span className='text-sm bg-[#E8F4FB] text-[#2980B9] px-3 py-1 rounded-full'>
              Booked vs Cancelled
            </span>
          </div>

          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={appointmentTrendData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type='monotone'
                  dataKey='booked'
                  stroke='#2980B9'
                  strokeWidth={3}
                  name='Booked'
                />

                <Line
                  type='monotone'
                  dataKey='cancelled'
                  stroke='#EF4444'
                  strokeWidth={3}
                  name='Cancelled'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard