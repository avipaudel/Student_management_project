const express = require("express");

const router = express.Router();

const { getAttendance } = require("../controllers/attendanceController");

router.get("/attendance", getAttendance);

module.exports = router;
