const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getResults,

  getResultReport,
} = require("../controllers/resultController");

// Student results (Protected)

router.get(
  "/results",

  authMiddleware,

  getResults,
);

// Admin result report

router.get(
  "/results-report",

  getResultReport,
);

module.exports = router;
