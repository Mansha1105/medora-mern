import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets/assets_frontend/assets'
import RelatedDoctors from '../Components/RelatedDoctors'
import { toast } from 'react-toastify'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // ------------------ FETCH DOCTOR ------------------
  const fetchDocInfo = () => {
    const info = doctors.find(doc => doc._id === docId)
    setDocInfo(info)
  }

  // ------------------ GENERATE SLOTS ------------------
  const getAvailableSlots = () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        )
        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        )
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  // ------------------ BOOK APPOINTMENT ------------------
  const bookAppointment = async () => {
    try {

      if (!token) {
        toast.warn('Login to book appointment')
        return navigate('/login')
      }

      if (!slotTime) {
        toast.warn('Please select a time slot')
        return
      }

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId,
          slotDate,
          slotTime
        },
        {
          headers: { token }
        }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // ------------------ EFFECTS ------------------
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  // ------------------ UI ------------------
return docInfo && (
  <div className="min-h-screen bg-[#F7FBFF] px-4 md:px-8 lg:px-12 py-8">

    {/* Single continuous container */}
    <div className="bg-white rounded-[28px] shadow-md border border-blue-50 p-6 md:p-8">

      {/* Top doctor section */}
      <div className="grid md:grid-cols-[240px_1fr] gap-6 items-start">

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-[220px] h-[280px] rounded-[110px] bg-[#F7FBFF] shadow-sm border border-blue-50 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-[#1E5F8A]">
              {docInfo.name}
            </h1>
            <img src={assets.verified_icon} className="w-5" alt="" />
          </div>

          <p className="text-gray-500 text-lg mt-2">
            {docInfo.degree} • {docInfo.speciality}
          </p>

          <div className="mt-4 inline-flex px-4 py-2 rounded-full bg-[#EAF4FF] text-[#2980B9] text-sm font-medium">
            {docInfo.experience} Experience
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-xl font-semibold text-[#1E5F8A]">
              About
              <img src={assets.info_icon} className="w-4" alt="" />
            </p>

            <p className="text-gray-500 leading-8 mt-3 text-base">
              {docInfo.about}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-base font-medium text-gray-700">
              Consultation Fee
            </p>

            <p className="text-2xl font-semibold text-[#2980B9] mt-1">
              ₹{docInfo.fees}
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-50 my-8"></div>

      {/* Booking section continues naturally */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1E5F8A]">
          Choose Your Slot
        </h2>

        {/* Dates */}
        <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[78px] rounded-xl px-4 py-4 text-center cursor-pointer transition-all duration-300 ${
                  slotIndex === index
                    ? 'bg-[#2980B9] text-white shadow-sm'
                    : 'bg-[#F7FBFF] border border-blue-100 text-gray-600'
                }`}
              >
                <p className="text-sm font-medium">
                  {item[0] && dayOfWeek[item[0].datetime.getDay()]}
                </p>
                <p className="text-xl font-semibold mt-1">
                  {item[0] && item[0].datetime.getDate()}
                </p>
              </div>
            ))}
        </div>

        {/* Time slots */}
        <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                  item.time === slotTime
                    ? 'bg-[#2980B9] text-white'
                    : 'bg-[#F7FBFF] border border-blue-100 text-gray-500'
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
        </div>

        {/* CTA */}
        <button
          onClick={bookAppointment}
          className="mt-8 bg-[#2980B9] hover:bg-[#1E5F8A] text-white px-10 py-3 rounded-full text-base font-medium shadow-sm hover:scale-105 transition-all duration-300"
        >
          Confirm Appointment
        </button>
      </div>
    </div>

    {/* Related doctors */}
    <div className="mt-14">
      <RelatedDoctors
        docId={docId}
        speciality={docInfo.speciality}
      />
    </div>
  </div>
)}

export default Appointment

