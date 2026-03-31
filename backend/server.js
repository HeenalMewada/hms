const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // import your database connection
const path = require('path');

const port = 8080;
 
const doctorRoutes = require("./routes/doctor");
const patientRouter = require("./routes/patient");
const changePassRouter = require("./routes/changePass")
const docdashboard=require("./routes/docAppoint")
const dashboardappointments = require("./routes/patientAppointment")
const doctor_dashboard = require("./routes/docdashboard")
app.use(cors());
//  app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/doctor", doctorRoutes);
app.use("/patient",patientRouter);
app.use("/doctor/settings",changePassRouter)
app.use("/appointments/:doctorId", docdashboard)
app.use("/dashboardappointments",dashboardappointments)
app.use("/doctor/doctor-dashboard", doctor_dashboard);

app.post("/login", (req, res) => {
  console.log("Received login request");
  const { email, password, role } = req.body;

 if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const sql = "SELECT * FROM users WHERE email=? AND password=? AND role=?";
  db.query(sql, [email, password,role], (err, results) => {
    if (err) {
      console.error('Database error:', err);
     return res.status(500).json({ message: 'Database error' });

     
    }
     const query = "SELECT doctor_id FROM doctors WHERE email = ?";
  const result =  db.query(query, [email]);
    
    if (results.length > 0) {
      res.json({ success: true ,
        role:role
      });
    } else {
      res.json({ success: false });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

