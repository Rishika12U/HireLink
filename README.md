# HireLink
(https://hirelink-ma6j.onrender.com/)
HireLink is a location-based job platform built with the **MERN stack (MongoDB, Express, React, Node.js)**. It connects **local skilled workers** (like electricians, plumbers, etc.) with **employers** who are offering short-term jobs. The platform enables job posting, job applications, profile management, and real-time applicant tracking — all in one place.

## 🚀 Features

### For Employers
- 📝 Post short-term job listings (with optional resume requirement)
- 👀 View all applicants for each job
- ✅ Approve or ❌ Reject worker applications
- 🗑️ Delete posted jobs
- 💬 Chat with selected workers (coming soon)

### For Workers
- 🔍 Browse available jobs
- 📤 Apply to jobs (with resume if required)
- ⏳ Track application status (Pending, Approved, Rejected)
- 🧑 View and update profile
- 📄 Upload resume (only when needed)


## 🛠️ Tech Stack


| Frontend              | Backend                | Other Tools              |
|-----------------------|------------------------|--------------------------|
| React (Vite)          | Node.js                | JWT Authentication       |
| React Router DOM      | Express.js             | Multer (Resume Upload)   |
| Axios                 | MongoDB + Mongoose     | CORS / dotenv            |
| Custom CSS            |                        | Render (Deployment)      |
 
 
## 🔐 Authentication & Roles

- Login/Register with JWT
- Roles:
  - `worker`
  - `employer`
- Protected dashboard routes:
  - `/worker-dashboard`
  - `/employer-dashboard`

##  Backend Setup
 cd Backend
 npm install

## Create .env:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

# Run the server:
npm run dev

##  Frontend Setup
cd ../Frontend
npm install
npm run dev

# 🌐 Deployment
Frontend & Backend hosted on Render
CORS configured with credentials and allowed origin

# ✨ Upcoming Features
🔔 Notifications for job status and messages
💬 Real-time chat between employers and workers
📊 Worker ratings and reviews
🔍 Job search with filters (location, category, date)
📥 Downloadable resumes for employers

🙋‍♂️ Author
Rishika12U — GitHub
Passionate about building solutions for real-world problems.



