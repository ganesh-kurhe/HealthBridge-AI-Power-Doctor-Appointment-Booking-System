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


# ⚙️ Installation Guide

## Prerequisites

Make sure the following software is installed:

- Node.js (v18+)
- npm
- Python (v3.10+)
- MongoDB Atlas Account
- Git

---

## Clone Repository

```bash
git clone https://github.com/your-username/HealthBridge.git
cd HealthBridge
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

AI_SERVICE_URL=http://127.0.0.1:5000

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run Backend:

```bash
npm run server
```

Expected Output:

```bash
Server started on PORT:4000
Database Connected
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Run Frontend:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## AI Service Setup

```bash
cd ai-service
```

Create Virtual Environment:

### Windows

```bash
python -m venv .venv
.\.venv\Scripts\activate
```

### Linux / Mac

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Run AI Service:

```bash
python app.py
```

Expected Output:

```bash
Running on http://127.0.0.1:5000
```

---

## Start Complete Application

### Terminal 1

```bash
cd backend
npm run server
```

### Terminal 2

```bash
cd frontend
npm run dev
```

### Terminal 3

```bash
cd ai-service
python app.py
```

---

## Access Application

| Service | URL |
|----------|----------|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |
| AI Service | http://127.0.0.1:5000 |

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

## 👨‍💻 Team Members

This project was developed as a Final Year Major Project by a team of four members.

| Name | Role |
|--------|--------|
| Ganesh Kurhe | Full Stack Developer, AI Integration |
| Vishwa Deshpande | Frontend Developer |
| Rameshwar Kute | Backend Developer |
| Sarthak Shelke | Database & Testing |

## 🎓 Project Supervisor

This project was developed under the guidance of:

**Prof. B.R.Ban**  
Department of Computer Engineering  
Sinhgad College of Enginneering

## 🚀 Key Features

- Secure User Authentication using JWT
- Doctor Appointment Booking System
- Doctor Profile Management
- Appointment Scheduling & Cancellation
- AI Symptom Checker
- AI Health Assistant Chatbot
- AI-Based Health Risk Assessment
- Online Payment Integration
- Cloud Storage for Medical Reports
- Admin Dashboard
- Responsive User Interface

## 📌 My Contributions

As a Full Stack Developer, my responsibilities included:

- Developed REST APIs using Node.js and Express.js
- Integrated MongoDB Database
- Implemented JWT Authentication & Authorization
- Developed AI Symptom Checker Integration
- Developed AI Health Assistant Module
- Built React Frontend Components
- Connected Frontend with Backend APIs
- Integrated Cloudinary for File Uploads
- Fixed Deployment and API Integration Issues

## 🏆 Project Highlights

- Final Year Major Project (2025-26)
- Team Size: 4 Members
- MERN Stack Based Healthcare Platform
- AI-Powered Symptom Analysis
- Machine Learning Based Department Prediction
- Real-Time Appointment Management
- Secure and Scalable Architecture

## 🔮 Future Enhancements

- Video Consultation
- Electronic Health Records (EHR)
- AI Prescription Analysis
- Multi-Language Support
- Wearable Device Integration
- Mobile Application (Android & iOS)

## 📄 License

This project is developed for academic and educational purposes as a Final Year Engineering Project.

## 👨‍💻 Author

**Ganesh Kurhe**

- LinkedIn: https://www.linkedin.com/in/ganesh-kurhe-79a39828a/
- GitHub: https://github.com/ganesh-kurhe?tab=repositories
- Email: ganeshkurhe512@gmail.com



