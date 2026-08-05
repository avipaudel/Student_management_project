const Attendance = require("../models/attendanceModel");

const getAttendance = (req, res) => {
  Attendance.getAllAttendance((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,

        message: "Database Error",

        error: err.message,
      });
    }

    res.json({
      success: true,

      data: result,
    });
  });
};

module.exports = {
  getAttendance,
};
