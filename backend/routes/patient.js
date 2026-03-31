const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../db"); // your mysql connection
const router = express.Router(); 

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

router.post("/book-appointment", (req, res) => {
  const { patient_id, doctor_id, day, date, time } = req.body;

  const getPatientSql = `
    SELECT id FROM patients WHERE id = ?
  `;

  db.query(getPatientSql, [patient_id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ message: "Patient not found" });
    }

    const patientId = result[0].id;

    const insertSql = `
      INSERT INTO appointments 
      (patient_id, doctor_id,  appointment_date, appointment_time, status)
      VALUES (?, ?, ?, ?,  'Booked')
    `;

    db.query(
      insertSql,
      [patientId, doctor_id,  date, time],
      (err2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).json({ message: "Booking failed" });
        }
        res.json({ message: "Appointment booked successfully" });
      }
    );
  });
});




module.exports = router;