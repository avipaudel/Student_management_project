const express = require("express");

const router = express.Router();

const studentController = require("../controllers/studentController");

const upload = require("../middleware/upload");

// Get all students
router.get("/", studentController.getStudents);

// Get student by id
router.get("/:id", studentController.getStudentById);

// Add student
router.post("/", studentController.addStudent);

// Update student details
router.put("/:id", studentController.updateStudent);

// Upload student profile image
router.put(
  "/profile-image/:id",
  upload.single("profile_image"),
  studentController.updateProfileImage,
);

// Delete student
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
