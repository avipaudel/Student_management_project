const express = require("express");

const router = express.Router();

const teacherAttendanceController = require("../controllers/teacherAttendanceController");

const authMiddleware = require("../middleware/authMiddleware");

// Get students of selected course

router.get(
  "/attendance/students/:courseId",

  authMiddleware,

  teacherAttendanceController.getCourseStudents,
);

// Add attendance

router.post(
  "/attendance",

  authMiddleware,

  teacherAttendanceController.addAttendance,
);

module.exports = router;
