const express = require("express");

const router = express.Router();

const teacherCourseController = require("../controllers/teacherCourseController");

const authMiddleware = require("../middleware/authMiddleware");

// Get teacher assigned courses

router.get(
  "/courses",

  authMiddleware,

  teacherCourseController.getTeacherCourses,
);

module.exports = router;
