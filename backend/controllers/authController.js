const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const Admin = db.Admin;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

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
      { expiresIn: "7d" }
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