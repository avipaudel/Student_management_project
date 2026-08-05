const TeacherCourse = require("../models/teacherCourseModel");

// Get teacher courses

const getTeacherCourses = (req, res) => {
  TeacherCourse.getTeacherCourses(
    req.user.id,

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

module.exports = {
  getTeacherCourses,
};
