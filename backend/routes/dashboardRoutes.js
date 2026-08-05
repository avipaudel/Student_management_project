const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

// Dashboard statistics route
router.get("/", dashboardController.getDashboardStats);

module.exports = router;
