// backend/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, adminKey } = req.body;

  // Determine role based on adminKey only
  const userRole = adminKey === process.env.ADMIN_SECRET_KEY ? "admin" : "user";

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ name, email, password, role: userRole });
    await user.save();
    res.status(201).json({ message: "User registered", role: user.role }); // Return role for confirmation
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "6h" });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { register, login };