const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// 🔒 Registrering med hashat lösenord
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kolla om användaren redan finns
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hasha lösenordet
    const user = new User({ name, email, password }); // LÅT modellen hash:a


    await user.save();

    // Skapa JWT-token direkt efter registrering
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret is not set" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "User registered successfully!", token, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Error registering user", details: err.message });
  }
});

// 🔑 Inloggning med JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Trying to log in with email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in database!");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ User found:", user);

    // Kontrollera lösenordet
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password does not match!");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Kontrollera JWT_SECRET
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret is not set" });
    }

    // Skapa JWT-token om lösenordet är rätt
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("🎉 Login successful! Sending token...");
    res.json({ token, message: "Login successful!", userId: user._id });
  } catch (err) {
    console.error("❌ Error during login:", err.message);
    res.status(500).json({ error: "Error logging in", details: err.message });
  }
});

module.exports = router;
