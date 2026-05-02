const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const Admin = db.Admin;
const User = db.User;


exports.register = async (req, res) => {
  try {
    const { name, email, password,role} = req.body;

    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, 
      role
    });

    res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ where: { email } });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      "secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};