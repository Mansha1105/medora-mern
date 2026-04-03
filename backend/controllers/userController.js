import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


// API to register user
const registerUser = async (req,res) => {

    try {

        const { name, email, password } = req.body

        if( !name || !password || !email ) {
            return res.json({success:false,message:"Missing Details"})
        }

        // validating email format
        if(!validator.isEmail(email)) {
            return res.json({success:false,message:"enter a valid email"})
        }

        // validating strong password
        if(password.length < 8) {
            return res.json({success:false,message:"enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//api for user login

const loginUser = async (req,res) => {
  try {

    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success:false,message:'User does not exist'})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if (isMatch) {
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
      res.json({success:true,token})
    } else {
      res.json({success:false,message:"Invalid credentials"})
    }

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

// API to get user profile data
const getProfile = async (req, res) => {
  try {

    const userId = req.userId
    const userData = await userModel.findById(userId).select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api to update user profile
const updateProfile = async (req, res) => {
  try {

    const userId = req.userId
    const { name, phone, address, gender, dob } = req.body
    const imageFile = req.file

    const updateData = {
      name,
      phone,
      gender,
      dob,
      address: address ? JSON.parse(address) : {}
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path)
      updateData.image = imageUpload.secure_url
    }

    await userModel.findByIdAndUpdate(userId, updateData)

    res.json({ success: true, message: "Profile Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api to book appointment
const bookAppointment = async (req, res) => {
    try {

        const { docId, slotDate, slotTime } = req.body
        const userId = req.userId

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked || {}

        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {
            slots_booked[slotDate] = [slotTime]
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to get user appointments from frontend my-appointments page

const listAppointment = async (req, res) => {
    try {

        const userId = req.userId

        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const userId = req.userId
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {registerUser, loginUser, getProfile,updateProfile, bookAppointment, listAppointment, cancelAppointment}