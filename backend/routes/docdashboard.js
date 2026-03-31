const express = require("express");
const router = express.Router();
const db = require("../db"); 
router.get("/doctor-dashboard/:doctorId", (req, res) =>  {
   console.log("Route hit");
  const doctorId = req.params.doctorId;

  const sql = `
    SELECT
      (SELECT COUNT(DISTINCT patient_id) FROM appointments WHERE doctor_id = ?) AS totalPatients,
      (SELECT COUNT(*) FROM appointments WHERE doctor_id = ?) AS totalAppointments,
      (SELECT COUNT(*) 
       FROM appointments 
       WHERE doctor_id = ? 
       AND appointment_date >= CURDATE()
      ) AS pendingAppointments,
      (SELECT COUNT(*) FROM appointments WHERE doctor_id = ?) AS totalPrescriptions
  `;

  // Pass an array of parameters for each placeholder
  const params = [doctorId, doctorId, doctorId, doctorId];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.log('Error fetching appointments:', err);
      return res.status(500).json({ message: "Failed to retrieve appointments" });
    }
    res.json(results[0]); // results is an array; get the first object
  });
});

module.exports = router;