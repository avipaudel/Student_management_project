const TeacherResult = require("../models/teacherResultModel");

// Get students of a course

const getCourseStudents = (req, res) => {
  const courseId = req.params.courseId;

  TeacherResult.getCourseStudents(
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

// Add result

const addResult = (req, res) => {
  const result = req.body;

  TeacherResult.addResult(
    result,

    (err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,

          message: "Database Error",

          error: err.message,
        });
      }

      res.json({
        success: true,

        message: "Result Added Successfully",
      });
    },
  );
};
const getCourseResults = (req, res) => {
  const courseId = req.params.courseId;

  TeacherResult.getCourseResults(
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

module.exports = {
  getCourseStudents,

  addResult,
  getCourseResults,
};
