const Course = require("../models/courseModel");

// ======================
// Get Courses
// ======================

const getCourses = (req, res) => {
  console.log("USER:", req.user);
  // Student
  if (req.user && req.user.role === "student") {
    return Course.getCourses(
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
  }

  // Admin / Teacher
  Course.getAllCourses((err, result) => {
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

// ======================
// Get Course By ID
// ======================

const getCourseById = (req, res) => {
  const id = req.params.id;

  Course.getCourseById(id, (err, result) => {
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
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: result[0],
    });
  });
};

// ======================
// Add Course
// ======================

const addCourse = (req, res) => {
  Course.addCourse(req.body, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Course Added",
    });
  });
};

// ======================
// Update Course
// ======================

const updateCourse = (req, res) => {
  const id = req.params.id;

  Course.updateCourse(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Course Updated Successfully",
    });
  });
};

// ======================
// Delete Course
// ======================

const deleteCourse = (req, res) => {
  const id = req.params.id;

  Course.deleteCourse(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    res.json({
      success: true,
      message: "Course Deleted Successfully",
    });
  });
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
