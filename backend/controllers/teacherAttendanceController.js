const TeacherAttendance = require("../models/teacherAttendanceModel");

// Get students of a course

const getCourseStudents = (req, res) => {
  const courseId = req.params.courseId;

  TeacherAttendance.getCourseStudents(
    courseId,

    (err, result) => {
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
    },
  );
};

// Add attendance

const addAttendance = (req, res) => {
  const attendance = req.body;

  TeacherAttendance.addAttendance(
    attendance,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,

          message: "Database Error",

          error: err.message,
        });
      }

      res.json({
        success: true,

        message: "Attendance Added Successfully",
      });
    },
  );
};

module.exports = {
  getCourseStudents,

  addAttendance,
};
