const Teacher = require("../models/teacherModel");

// ============================
// Get All Teachers
// ============================

const getTeachers = (req, res) => {
  Teacher.getAllTeachers((err, teachers) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }

    res.json({
      success: true,
      data: teachers,
    });
  });
};

// ============================
// Get Teacher By ID
// ============================

const getTeacherById = (req, res) => {
  const id = req.params.id;

  Teacher.getTeacherById(
    id,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Teacher Not Found",
        });
      }

      res.json({
        success: true,
        data: result[0],
      });
    },
  );
};

// ============================
// Add Teacher
// ============================

const addTeacher = (req, res) => {
  Teacher.addTeacher(
    req.body,

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed To Add Teacher",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Teacher Added Successfully",
        teacherId: result.insertId,
      });
    },
  );
};

// ============================
// Update Teacher
// ============================

const updateTeacher = (req, res) => {
  const id = req.params.id;

  Teacher.updateTeacher(
    id,

    req.body,

    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Update Failed",
        });
      }

      res.json({
        success: true,
        message: "Teacher Updated Successfully",
      });
    },
  );
};

// ============================
// Upload Profile Image
// ============================

const updateProfileImage = (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No Image Uploaded",
    });
  }

  Teacher.updateProfileImage(
    id,

    req.file.filename,

    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Image Update Failed",
        });
      }

      res.json({
        success: true,

        message: "Profile Image Updated Successfully",

        image: req.file.filename,
      });
    },
  );
};

// ============================
// Delete Teacher
// ============================

const deleteTeacher = (req, res) => {
  const id = req.params.id;

  Teacher.deleteTeacher(
    id,

    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Delete Failed",
        });
      }

      res.json({
        success: true,

        message: "Teacher Deleted Successfully",
      });
    },
  );
};

module.exports = {
  getTeachers,

  getTeacherById,

  addTeacher,

  updateTeacher,

  updateProfileImage,

  deleteTeacher,
};
