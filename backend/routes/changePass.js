const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/change-password", async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;

  // Validate input
  if (!name || !currentPassword || !newPassword) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    // Fetch user
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT password FROM users WHERE name = ?", [name], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    if (result.length === 0) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    console.log("Stored password (plain text):", result[0].password);

    // Check current password (plain text comparison)
    if (currentPassword !== result[0].password) {
      return res.json({ success: false, message: "Current password incorrect" });
    }

    console.log("Current password provided:", currentPassword);

    // Update password (store plain text)
    await new Promise((resolve, reject) => {
      db.query("UPDATE users SET password = ? WHERE name = ?", [newPassword, name], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ success: true, message: "Password updated successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;