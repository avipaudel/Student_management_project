const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, courseController.getCourses);

router.post("/", authMiddleware, courseController.addCourse);

// router.get(
//     "/student",
//     authMiddleware,
//     courseController.getStudentCourses
// );

router.get("/:id", authMiddleware, courseController.getCourseById);

router.put("/:id", authMiddleware, courseController.updateCourse);

router.delete("/:id", authMiddleware, courseController.deleteCourse);

module.exports = router;
