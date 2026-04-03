import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DoctorContext } from '../../context/DoctorContext'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const DoctorDashboard = () => {
  const {
    dashData,
    getDashData,
    backendUrl,
    dToken
  } = useContext(DoctorContext)

  const [notes, setNotes] = useState('')

  useEffect(() => {
    getDashData()
  }, [])

  useEffect(() => {
    if (dashData?.notes) {
      setNotes(dashData.notes)
    }
  }, [dashData])

  const saveNotes = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/notes',
        { notes },
        {
          headers: { dtoken: dToken }
        }
      )

      if (data.success) {
        alert('Notes saved successfully')
        getDashData()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  const chartData = [
    { name: 'Completed', value: dashData?.completed || 0 },
    { name: 'Pending', value: dashData?.pending || 0 },
    { name: 'Cancelled', value: dashData?.cancelled || 0 }
  ]

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444']

  return (
    <div className="w-full min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, Doctor 
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here’s your appointment summary and latest activity
        </p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-sm text-slate-500">Appointments</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {dashData?.totalAppointments || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-sm text-slate-500">Patients</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {dashData?.totalPatients || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-sm text-slate-500">Completed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {dashData?.completed || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <p className="text-sm text-slate-500">Cancelled</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {dashData?.cancelled || 0}
          </h2>
        </div>
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Appointment Status
          </h2>

          <div className="w-full h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {dashData?.latestAppointments?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {item.userData?.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    Recent appointment update
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.isCompleted
                      ? 'bg-green-100 text-green-600'
                      : item.cancelled
                      ? 'bg-red-100 text-red-500'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {item.isCompleted
                    ? 'Completed'
                    : item.cancelled
                    ? 'Cancelled'
                    : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Consultation Notes 
        </h2>

        <textarea
          rows="8"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write patient consultation notes here..."
          className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={saveNotes}
          className="mt-4 px-5 py-2 bg-[#2F6FA3] text-white rounded-xl hover:bg-[#2F6FA3] transition"
        >
          Save Notes
        </button>
      </div>

    </div>
  )
}

export default DoctorDashboard