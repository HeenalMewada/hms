const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/patient/appointments/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  // Database se doctor ke appointments nikalne ka query
  // Yeh sirf example hai, aapke database ke hisaab se change hoga
  const sql = 'SELECT * FROM appointments WHERE doctor_id = ?';
  connection.query(sql, [doctorId], (err, results) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;