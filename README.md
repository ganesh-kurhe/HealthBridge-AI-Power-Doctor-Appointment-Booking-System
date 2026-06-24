# 🏥 HealthBridge - AI Powered Doctor Appointment Booking System

HealthBridge is a full-stack healthcare platform that simplifies doctor appointment booking while integrating Artificial Intelligence for symptom analysis, health assistance, and personalized health risk assessment.

The platform enables patients to find doctors, book appointments, make online payments, manage profiles, and receive AI-driven healthcare guidance.

---

## 🚀 Features

### 👨‍⚕️ Patient Features

- User Registration & Login
- JWT Authentication & Authorization
- Browse Doctors by Specialization
- Book Doctor Appointments
- Cancel Appointments
- View Appointment History
- Online Payment Integration
  - Stripe
  - Razorpay
- Manage User Profile
- Upload Profile Image
- Real-Time Appointment Availability

---

### 🤖 AI Features

#### AI Symptom Checker
- Analyze symptoms using Machine Learning
- Recommend appropriate medical department
- Determine appointment priority:
  - High
  - Medium
  - Low
- Confidence Score Generation

#### AI Health Assistant
- AI-powered healthcare chatbot
- Answers health-related queries
- Suggests health recommendations
- Provides appointment guidance

#### AI Health Risk Assessment
- Personalized risk assessment
- Profile-based health analysis
- Risk category identification
- Preventive recommendations
- Health improvement suggestions

---

### 👨‍⚕️ Doctor Features

- Doctor Profile Management
- Appointment Scheduling
- View Patient Bookings
- Appointment Status Updates

---

### 👨‍💼 Admin Features

- Doctor Management
- Appointment Monitoring
- User Management
- Platform Monitoring

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary

### AI Service

- Python
- Flask
- Scikit-Learn
- Pandas
- Pickle Models

### Payment Gateways

- Stripe
- Razorpay

---

# 📂 Project Structure

```bash
Doctor_Appointment_Booking_System
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── assets
│   │   ├── context
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
├── ai-service
│   ├── app.py
│   ├── requirements.txt
│   ├── model.pkl
│   ├── priority_model.pkl
│   ├── department_model.pkl
│   └── vectorizer.pkl
│
└── README.md
