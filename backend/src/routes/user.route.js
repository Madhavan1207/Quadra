const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;
    if (!name || !email || !username || !password || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ name, email, username, password, role });
    res.status(201).json({ message: "User registered successfully", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Required fields missing" });

    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
