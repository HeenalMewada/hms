A full-stack web application for managing hospital operations — built with Node.js, Express.js, MySQL, and vanilla JavaScript frontend.

Status: 95% Complete — Final feature (doctor-side appointment view) in progress. Expected completion: April 2025.


✨ Features
👨‍⚕️ Doctor Portal

Secure JWT-based login
View personal profile and availability schedule
Manage prescriptions for patients
Dashboard with appointment overview (in progress)

🧑‍💼 Patient Portal

Secure JWT-based login and registration
Browse available doctors with real-time availability
Book appointments with double-booking prevention at DB level
View and manage personal appointments
Access prescriptions issued by doctors

🔐 Security

JWT Authentication with role-based access control (Doctor / Patient)
Protected REST API endpoints — unauthorized access blocked at middleware level
Passwords hashed before storage


🛠️ Tech Stack
LayerTechnologyFrontendHTML5, CSS3, Bootstrap 5, JavaScript (ES6+)BackendNode.js, Express.jsDatabaseMySQLAuthJWT (JSON Web Tokens)ArchitectureREST API

📁 Database Schema
6 normalized tables:
users          → stores all users (doctors + patients) with roles
doctors        → doctor profiles, specialization
patients       → patient profiles
appointments   → booking records with status
availability   → doctor schedule slots (prevents double-booking)
prescriptions  → medicines and notes per appointment

🚀 Getting Started
Prerequisites

Node.js v18+
MySQL 8+
npm

Installation
bash# 1. Clone the repository
git clone https://github.com/HeenalMewada/hms.git
cd hms

# 2. Install dependencies
cd backend
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MySQL credentials and JWT secret

# 4. Setup database
# Import the SQL schema file
mysql -u root -p < backend/database/schema.sql

# 5. Start the server
npm start
Access
Backend API  → http://localhost:8080
Frontend     → Open index.html in browser (or use Live Server)

📡 API Endpoints
MethodEndpointDescriptionAuthPOST/api/auth/registerRegister new user❌POST/api/auth/loginLogin (Doctor/Patient)❌GET/api/doctorsList all doctors✅GET/api/doctors/:id/availabilityGet doctor availability✅POST/api/appointmentsBook appointment✅ PatientGET/api/appointments/patientPatient's appointments✅ PatientGET/api/appointments/doctorDoctor's appointments🔄 In ProgressPOST/api/prescriptionsAdd prescription✅ DoctorGET/api/prescriptions/:patientIdView prescriptions✅

📂 Project Structure
hms/
├── backend/
│   ├── controllers/      # Route logic
│   ├── routes/            # API route definitions
│   ├── database/          # MySQL schema & connection
│   └── server.js          # Entry point
├── frontend/
│   ├── index.html         # Landing / Login
│   ├── patient/           # Patient dashboard pages
│   ├── doctor/            # Doctor dashboard pages
│   └── assets/            # CSS, JS, images
├── .gitignore
└── README.md

🔄 What's Left

 Doctor dashboard — view appointments booked by patients
 Final end-to-end testing
 Deployment to cloud (planned: Railway / Render)


👩‍💻 Author
Heenal Mewada — Full Stack Developer
📧 mewadaheenal304@gmail.com
🔗 Portfolio · LinkedIn


Built from scratch as a production-grade project to demonstrate full-stack development skills — schema design, REST API architecture, JWT security, and responsive frontend.
