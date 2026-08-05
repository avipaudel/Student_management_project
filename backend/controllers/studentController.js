const Student = require("../models/studentModel");

// Get all students
const getStudents = (req, res) => {
  Student.getAllStudents((err, students) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      data: students,
    });
  });
};

// Add student
const addStudent = (req, res) => {
  Student.addStudent(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to Add Student",
        error: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Student Added Successfully",
      studentId: result.insertId,
    });
  });
};
// Update student

const updateStudent = (req, res) => {
  const id = req.params.id;

  Student.updateStudent(
    id,
    req.body,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Update Failed",
        });
      }

      res.json({
        success: true,
        message: "Student Updated Successfully",
      });
    },
  );
};

// Delete student

const deleteStudent = (req, res) => {
  const id = req.params.id;

  Student.deleteStudent(
    id,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Delete Failed",
        });
      }

      res.json({
        success: true,
        message: "Student Deleted Successfully",
      });
    },
  );
};
const getStudentById = (req, res) => {
  const id = req.params.id;

  Student.getStudentById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
    }

    res.json({
      success: true,
      data: result[0],
    });
  });
};
const updateProfileImage = (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image uploaded",
    });
  }

  const image = req.file.filename;

  Student.updateProfileImage(
    id,
    image,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Image update failed",
        });
      }

      res.json({
        success: true,
        message: "Profile image updated",
        image: image,
      });
    },
  );
};
module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  updateProfileImage,
};
