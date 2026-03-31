// routes/appointments.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database connection


// GET route to fetch all appointments
// Yeh route appointments table se saare bookings fetch karega
router.get("/dashboardappointments", (req, res) => {
  const fetchSql = `
    SELECT 
      a.appointment_id,
      a.day,
      a.appointment_date,
      a.appointment_time,
      a.status
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
  `;

  db.query(fetchSql, (err, results) => {
    if (err) {
      console.log('Error fetching appointments:', err);
      return res.status(500).json({ message: "Failed to retrieve appointments" });
    }
    res.json(results);
  });
});
module.exports = router;