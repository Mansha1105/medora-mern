import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }
 useEffect(() => {
  if (token) {
    navigate('/')
  }
}, [token])
 return (
  <form
    onSubmit={onSubmitHandler}
    className="min-h-screen bg-[#F7FBFF] flex items-center justify-center px-4 py-8"
  >
    {/* MOBILE VIEW */}
    <div className="w-full max-w-md md:hidden bg-white rounded-3xl shadow-lg p-6">
      <h1 className="text-3xl font-semibold text-[#1E5F8A] text-center">
        {state}
      </h1>

      <p className="text-center text-gray-500 mt-2">
        {state === 'Login'
          ? 'Login to continue'
          : 'Create your account'}
      </p>

      <div className="space-y-4 mt-8">
        {state === 'Sign Up' && (
          <input
            className="w-full rounded-xl border border-blue-100 bg-[#F7FBFF] px-4 py-3 outline-none focus:border-[#2980B9]"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        )}

        <input
          className="w-full rounded-xl border border-blue-100 bg-[#F7FBFF] px-4 py-3 outline-none focus:border-[#2980B9]"
          type="email"
          placeholder="Email"
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
          {state === 'Login' ? 'LOGIN' : 'SIGN UP'}
        </button>
      </div>

      <p className="text-center mt-5 text-sm text-gray-500">
        {state === 'Login'
          ? "Don't have an account? "
          : 'Already have an account? '}
        <span
          onClick={() =>
            setState(state === 'Login' ? 'Sign Up' : 'Login')
          }
          className="text-[#2980B9] cursor-pointer font-medium"
        >
          {state === 'Login' ? 'Sign Up' : 'Login'}
        </span>
      </p>
    </div>

    {/* DESKTOP VIEW */}
    <div className="hidden md:block relative w-full max-w-5xl h-[600px] bg-white rounded-[30px] shadow-xl overflow-hidden">

      {/* LEFT SIGN UP FORM */}
      <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-center px-10">
        <h2 className="text-3xl font-semibold text-[#1E5F8A] text-center mb-8">
          Sign Up
        </h2>

        <div className="space-y-5">
          <input
            className="w-full bg-[#F7FBFF] border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-[#2980B9]"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input
            className="w-full bg-[#F7FBFF] border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-[#2980B9]"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            className="w-full bg-[#F7FBFF] border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-[#2980B9]"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            type="submit"
            className="w-full bg-[#2980B9] hover:bg-[#1E5F8A] text-white py-3 rounded-full font-medium transition-all duration-300"
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col justify-center px-10">
        <h2 className="text-3xl font-semibold text-[#1E5F8A] text-center mb-8">
          Login
        </h2>

        <div className="space-y-5">
          <input
            className="w-full bg-[#F7FBFF] border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-[#2980B9]"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            className="w-full bg-[#F7FBFF] border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-[#2980B9]"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button
            type="submit"
            className="w-full bg-[#2980B9] hover:bg-[#1E5F8A] text-white py-3 rounded-full font-medium transition-all duration-300"
          >
            LOGIN
          </button>
        </div>
      </div>

      {/* SLIDING BLUE PANEL */}
      <div
        className={`absolute top-0 w-1/2 h-full bg-[#2980B9] text-white flex flex-col justify-center items-center px-10 transition-all duration-700 ease-in-out z-20 ${
          state === 'Sign Up' ? 'left-1/2' : 'left-0'
        }`}
      >
        <h1 className="text-4xl font-semibold text-center">
          {state === 'Login'
            ? 'Welcome Back!'
            : 'Hello, Friend!'}
        </h1>

        <p className="text-center mt-4 leading-7 text-blue-50 max-w-sm">
          {state === 'Login'
            ? 'Already have an account? Login and continue your journey.'
            : 'Create your account and start booking appointments.'}
        </p>

        <button
          type="button"
          onClick={() =>
            setState(state === 'Login' ? 'Sign Up' : 'Login')
          }
          className="mt-8 border border-white px-10 py-3 rounded-full hover:bg-white hover:text-[#2980B9] transition-all duration-300"
        >
          {state === 'Login' ? 'SIGN UP' : 'SIGN IN'}
        </button>
      </div>
    </div>
  </form>
)
}

export default Login