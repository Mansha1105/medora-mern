import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentsModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })

        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//api for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if (isMatch) {
            const token = jwt.sign({ id: doctor._id },process.env.JWT_SECRET)

            res.json({success: true,token})
        } else {
            res.json({success: false,message: 'Invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}

//api to get appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const docId = req.docId

        const appointments = await appointmentsModel.find({ docId })

        res.json({success: true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}
// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        const appointmentData = await appointmentsModel.findById(
            appointmentId
        )

        if (
            appointmentData &&
            appointmentData.docId === docId
        ) {
            await appointmentsModel.findByIdAndUpdate(
                appointmentId,
                { isCompleted: true }
            )

            return res.json({
                success: true,
                message: 'Appointment Completed'
            })
        } else {
            return res.json({
                success: false,
                message: 'Mark Failed'
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId
        const { appointmentId } = req.body

        // Find appointment by id
        const appointmentData = await appointmentsModel.findById(
            appointmentId
        )

        // Check if appointment belongs to logged-in doctor
        if (
            appointmentData &&
            appointmentData.docId === docId
        ) {
            // Update appointment status
            await appointmentsModel.findByIdAndUpdate(
                appointmentId,
                { cancelled: true }
            )

            return res.json({
                success: true,
                message: 'Appointment Cancelled'
            })
        } else {
            return res.json({
                success: false,
                message: 'Cancellation Failed'
            })
        }

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}
//api to get dashboard data for doctor panle
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId

    const doctor = await doctorModel
      .findById(docId)
      .select('name speciality notes')

    const appointments = await appointmentsModel.find({ docId })

    let patients = []
    let completed = 0
    let pending = 0
    let cancelled = 0

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }

      if (item.isCompleted) {
        completed++
      } else if (item.cancelled) {
        cancelled++
      } else {
        pending++
      }
    })

    const dashData = {
      doctorName: doctor.name,
      speciality: doctor.speciality,
      notes: doctor.notes || '',
      totalAppointments: appointments.length,
      totalPatients: patients.length,
      completed,
      pending,
      cancelled,
      latestAppointments: [...appointments]
        .reverse()
        .slice(0, 3)
    }

    res.json({
      success: true,
      dashData
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}

const updateDoctorNotes = async (req, res) => {
  try {
    const docId = req.docId
    const { notes } = req.body

    await doctorModel.findByIdAndUpdate(docId, {
      notes
    })

    res.json({
      success: true,
      message: 'Notes saved successfully'
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}


//api to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId

        const profileData = await doctorModel
            .findById(docId)
            .select('-password')

        res.json({
            success: true,
            profileData
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//api to update doctor prfile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const { fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(
            docId,
            { fees, address, available }
        )

        res.json({
            success: true,
            message: 'Profile Updated'
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { changeAvailability, doctorList, loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel, doctorDashboard, updateDoctorNotes,doctorProfile,updateDoctorProfile}