const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("../db");
const router = express.Router();  


// app.use(cors());
// app.use(bodyParser.json());

router.post("/appointments", (req, res) => {

  const {
    doctor_id,
    day,
    start_time,
    end_time,
    slot_duration,
    max_appointments,
    status
  } = req.body;
  

  const sql = `
    INSERT INTO doctor_availability 
    ( day, start_time, end_time, max_appointments, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    
    day,
    start_time,
    end_time,
    max_appointments,
    status
  ], (err) => {
    if (err) return res.status(500).json({ message: "Error saving availability" });

    return res.status(200).json({ message: "Availability saved successfully" });
  });
});

 

module.exports = router;