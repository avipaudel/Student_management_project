const express = require("express");

const router = express.Router();

const enrollmentController = require("../controllers/enrollmentController");

// Get all enrollments

router.get(
  "/",

  enrollmentController.getEnrollments,
);

// Add enrollment

router.post(
  "/",

  enrollmentController.addEnrollment,
);

module.exports = router;
