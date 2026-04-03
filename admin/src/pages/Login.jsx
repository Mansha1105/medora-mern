import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Admin login successful')
        } else {
          toast.error(data.message || 'Invalid credentials')
        }

      } else {
        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password }
        )

        if (data.success) {
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          console.log(data.token)
          toast.success('Doctor login successful')
        } else {
          toast.error(data.message || 'Invalid credentials')
        }
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Login failed')
      } else {
        toast.error('Server error')
      }
    }
  }

 return (
  <form
    onSubmit={onSubmitHandler}
    className="min-h-screen bg-[#F7FBFF] flex items-center justify-center px-4 py-8"
  >
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
      
      {/* Header */}
      <h1 className="text-3xl font-semibold text-[#1E5F8A] text-center">
        {state} Login
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Access your dashboard securely
      </p>

      {/* Toggle Tabs */}
      <div className="mt-8 flex bg-[#F7FBFF] rounded-full p-1">
        <button
          type="button"
          onClick={() => setState('Admin')}
          className={`w-1/2 py-3 rounded-full transition-all duration-300 ${
            state === 'Admin'
              ? 'bg-[#2980B9] text-white shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Admin Panel
        </button>

        <button
          type="button"
          onClick={() => setState('Doctor')}
          className={`w-1/2 py-3 rounded-full transition-all duration-300 ${
            state === 'Doctor'
              ? 'bg-[#2980B9] text-white shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Doctor Panel
        </button>
      </div>

      {/* Login Form */}
      <div className="space-y-5 mt-8">
        <input
          className="w-full rounded-xl border border-blue-100 bg-[#F7FBFF] px-4 py-3 outline-none focus:border-[#2980B9]"
          type="email"
          placeholder={
            state === 'Admin'
              ? 'Admin Email'
              : 'Doctor Email'
          }
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          className="w-full rounded-xl border border-blue-100 bg-[#F7FBFF] px-4 py-3 outline-none focus:border-[#2980B9]"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#2980B9] hover:bg-[#1E5F8A] text-white py-3 rounded-full font-medium transition-all duration-300"
        >
          Login to {state} Panel
        </button>
      </div>
    </div>
  </form>
)
}

export default Login