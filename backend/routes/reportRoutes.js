const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/students", reportController.studentReport);

router.get("/teachers", reportController.teacherReport);

router.get("/courses", reportController.courseReport);

router.get("/attendance", reportController.attendanceReport);

router.get("/results", reportController.resultReport);

module.exports = router;
