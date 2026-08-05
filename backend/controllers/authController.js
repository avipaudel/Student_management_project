const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const db = require("../config/db");

// =========================
// Login
// =========================
const login = (req, res) => {
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required.",
    });
  }

  User.findUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const user = results[0];

    // Plain-text password check
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },

      process.env.JWT_SECRET || "student_management_secret",

      {
        expiresIn: "1d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// =========================
// Get Profile
// =========================
const getProfile = (req, res) => {
  const sql = `

        SELECT

            u.id,
            u.full_name,
            u.email,
            u.role,
            u.created_at,

            COALESCE(
                s.profile_image,
                t.profile_image
            ) AS profile_image


        FROM users u


        LEFT JOIN students s

        ON u.id = s.user_id


        LEFT JOIN teachers t

        ON u.id = t.user_id


        WHERE u.id = ?

    `;

  db.query(
    sql,
    [req.user.id],

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,

        data: result[0],
      });
    },
  );
};
// =========================
// Change Password
// =========================

const changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Old and new password are required",
    });
  }

  const userId = req.user.id;

  const checkSql = `
        SELECT password 
        FROM users
        WHERE id = ?
    `;

  db.query(checkSql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (oldPassword !== result[0].password) {
      return res.status(401).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    const updateSql = `
            UPDATE users
            SET password = ?
            WHERE id = ?
        `;

    db.query(updateSql, [newPassword, userId], (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Password update failed",
        });
      }

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    });
  });
};

module.exports = {
  login,
  getProfile,
  changePassword,
};
