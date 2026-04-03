import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full min-h-screen bg-slate-50 px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          My Appointments
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage today’s and upcoming patient consultations
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2.2fr_1fr_2fr_1fr_1.3fr] items-center bg-slate-50 px-6 py-4 text-slate-600 font-semibold border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Status</p>
        </div>

        {/* Appointments */}
        <div className="max-h-[75vh] overflow-y-auto">
          {appointments?.map((item, index) => (
            <div
              key={index}
              className="border-b border-slate-100"
            >
              {/* Desktop Row */}
              <div className="hidden md:grid grid-cols-[0.5fr_2.2fr_1fr_2fr_1fr_1.3fr] items-center px-6 py-4 text-sm hover:bg-slate-50 transition-all duration-200">
                <p className="text-slate-500">{index + 1}</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                    {item.userData?.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.userData?.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Patient
                    </p>
                  </div>
                </div>

                <p className="text-slate-600">
                  {calculateAge(item.userData?.dob)}
                </p>

                <p className="text-slate-600">
                  {item.slotDate}, {item.slotTime}
                </p>

                <p className="font-bold text-blue-600">
                  ₹{item.amount}
                </p>

                <div className="flex justify-center gap-2">
                  {item.cancelled ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-500">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 transition"
                      >
                        ✓
                      </button>

                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 transition"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Card */}
              <div className="md:hidden p-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
                        {item.userData?.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.userData?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Age: {calculateAge(item.userData?.dob)}
                        </p>
                      </div>
                    </div>

                    <p className="font-bold text-blue-600">
                      ₹{item.amount}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">
                    {item.slotDate}, {item.slotTime}
                  </p>

                  <div className="flex gap-2">
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-500">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                        Completed
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-200 transition"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="px-4 py-1 rounded-full bg-red-100 hover:bg-red-200 transition"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments