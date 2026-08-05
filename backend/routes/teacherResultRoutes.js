const express = require("express");

const router = express.Router();

const teacherResultController = require("../controllers/teacherResultController");

const authMiddleware = require("../middleware/authMiddleware");

// Get students of selected course

router.get(
  "/results/students/:courseId",

  authMiddleware,

  teacherResultController.getCourseStudents,
);

// Add result

router.post(
  "/results",

  authMiddleware,

  teacherResultController.addResult,
);

router.get(
  "/results/:courseId",

  authMiddleware,

  teacherResultController.getCourseResults,
);

module.exports = router;
