const express = require("express");
const router = express.Router();
const db = require("./db");

// book appointment
router.post("/book-appointment", (req, res) => {
  const { doctor_id, patient_id, day, date, time } = req.body;

  // availability check
  const availabilitySql = `
    SELECT * FROM doctor_availability
    WHERE doctor_id=? AND day=? AND status='available'
    AND ? BETWEEN start_time AND end_time
  `;

  db.query(availabilitySql, [doctor_id, day, time], (err, avail) => {
    if (err || avail.length === 0) {
      return res.json({ message: "Doctor not available" });
    }

    // book appointment
    const sql = `
      INSERT INTO appointments
      (doctor_id, patient_id, appointment_date, appointment_time, status)
      VALUES (?, ?, ?, ?, 'Booked')
    `;

    db.query(sql, [doctor_id, patient_id, date, time], () => {
      res.json({ message: "Appointment booked successfully" });
    });
  });
});

module.exports = router;
