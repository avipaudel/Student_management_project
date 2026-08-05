const express = require("express");

const router = express.Router();

const teacherController = require("../controllers/teacherController");

const upload = require("../middleware/upload");

// Get all teachers
router.get("/", teacherController.getTeachers);

// Get teacher by id
router.get("/:id", teacherController.getTeacherById);

// Add teacher
router.post("/", teacherController.addTeacher);

// Update teacher details
router.put("/:id", teacherController.updateTeacher);

// Upload teacher profile image
router.put(
  "/profile-image/:id",
  upload.single("profile_image"),
  teacherController.updateProfileImage,
);

// Delete teacher
router.delete("/:id", teacherController.deleteTeacher);

module.exports = router;
