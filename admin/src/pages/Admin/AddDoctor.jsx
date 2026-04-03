import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const {backendUrl, aToken}= useContext(AdminContext)

  const onSubmitHandler = async(event) => {
    event.preventDefault()
    try{

      if(!docImg){
        return toast.error('Image not Selected')
      }
      const formData = new FormData()

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address',JSON.stringify({ line1: address1, line2: address2 }));

      // console log formdata
      formData.forEach((value, key) => {
       console.log(`${key} : ${value}`);
      });

      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers: {atoken: aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      }else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
      console.log(error)

    }
  }



  return (
  <form onSubmit={onSubmitHandler} className='w-full px-6 py-5'>
    <p className='mb-5 text-xl font-semibold text-gray-800'>
      Add Doctor
    </p>

    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-full max-w-5xl max-h-[85vh] overflow-y-auto'>

      {/* Upload Section */}
      <div className='flex items-center gap-5 mb-8'>
        <label
          htmlFor="doc-img"
          className='cursor-pointer'
        >
          <img
            className='w-20 h-20 rounded-full object-cover border border-gray-200 bg-gray-50 hover:scale-105 transition'
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
          />
        </label>

        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />

        <div>
          <p className='font-medium text-gray-700'>Upload Doctor Picture</p>
          <p className='text-sm text-gray-400'>
            JPG, PNG supported
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700'>

        {/* Left */}
        <div className='space-y-4'>
          <input value={name} onChange={(e)=>setName(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
            type="text" placeholder='Doctor Name' required />

          <input value={email} onChange={(e)=>setEmail(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
            type="email" placeholder='Doctor Email' required />

          <input value={password} onChange={(e)=>setPassword(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
            type="password" placeholder='Password' required />

          <select value={experience} onChange={(e)=>setExperience(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none'>
            <option>1 Year</option>
            <option>2 Year</option>
            <option>3 Year</option>
            <option>4 Year</option>
            <option>5 Year</option>
          </select>

          <input value={fees} onChange={(e)=>setFees(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
            type="number" placeholder='Consultation Fees' required />
        </div>

        {/* Right */}
        <div className='space-y-4'>
          <select value={speciality} onChange={(e)=>setSpeciality(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none'>
            <option>General physician</option>
            <option>Gynecologist</option>
            <option>Dermatologist</option>
            <option>Pediatricians</option>
            <option>Neurologist</option>
            <option>Gastroenterologist</option>
          </select>

          <input value={degree} onChange={(e)=>setDegree(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
            type="text" placeholder='Education / Degree' required />

          <input value={address1} onChange={(e)=>setAddress1(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none'
            type="text" placeholder='Address Line 1' required />

          <input value={address2} onChange={(e)=>setAddress2(e.target.value)}
            className='w-full border rounded-xl px-4 py-3 outline-none'
            type="text" placeholder='Address Line 2' required />
        </div>
      </div>

      {/* About */}
      <div className='mt-6'>
        <p className='mb-2 font-medium text-gray-700'>About Doctor</p>
        <textarea
          value={about}
          onChange={(e)=>setAbout(e.target.value)}
          className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300'
          rows={5}
          placeholder='Write about doctor'
          required
        />
      </div>

      {/* Button */}
      <button
        type='submit'
        className='mt-6 bg-[#2F6FA3] hover:bg-[#1f6691] text-white px-8 py-3 rounded-xl font-medium transition'
      >
        Add Doctor
      </button>
    </div>
  </form>
)
}
export default AddDoctor