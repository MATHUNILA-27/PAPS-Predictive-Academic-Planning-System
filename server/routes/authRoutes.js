const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { fullName, role, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      role,
      email,
      password: hash,
    });

    await newUser.save();

    res.json({ msg: "Registered Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "SECRET");

    res.json({
      token,
      userId: user._id,
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Login error" });
  }
});

module.exports = router;
