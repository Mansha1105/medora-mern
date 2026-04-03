# Medora – Healthcare Appointment Booking Platform

Medora is a full-stack MERN healthcare appointment booking platform that enables patients to book appointments with doctors, while admins and doctors can manage schedules, appointments, and profiles through dedicated dashboards.

## 🚀 Live Demo

* **Patient Frontend:** [https://medora-mern.vercel.app](https://medora-mern.vercel.app)
* **Admin / Doctor Panel:** [https://medora-admin-omega.vercel.app/](https://medora-admin-omega.vercel.app/)
* **Backend API:** [https://medora-backend-z0o0.onrender.com](https://medora-backend-z0o0.onrender.com)

## ✨ Features

### 👤 Patient Module

* User registration and login
* Browse doctors by specialization
* Book appointments online
* View and manage appointments
* User profile management

### 🩺 Doctor Module

* Doctor login panel
* View appointments
* Update appointment status
* Manage availability
* Update profile and consultation fee

### 🛠️ Admin Module

* Admin authentication
* Add and manage doctors
* View all appointments
* Cancel or complete appointments
* Dashboard analytics

## 🧰 Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Cloud Storage:** Cloudinary
* **Deployment:** Vercel, Render

## 📁 Project Structure

```text
MERN/
├── frontend/   # Patient UI
├── admin/      # Admin + Doctor dashboard
├── backend/    # API server
```

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/Mansha1105/medora-mern.git

# Install frontend
cd frontend
npm install
npm run dev

# Install backend
cd ../backend
npm install
npm start

# Install admin
cd ../admin
npm install
npm run dev
```

## 🔐 Environment Variables

Create `.env` files in `backend`, `frontend`, and `admin`.

### Backend

```env
MONGODB_URI
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
ADMIN_EMAIL
ADMIN_PASSWORD
JWT_SECRET
```

### Frontend / Admin

```env
VITE_BACKEND_URL=
```

## 📌 Author

**Mansha T R**
linkedIn: https://www.linkedin.com/in/manshatr/

