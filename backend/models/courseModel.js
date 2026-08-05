const db = require("../config/db");

// ======================
// Get All Courses
// ======================

const getAllCourses = (callback) => {
  const sql = `
        SELECT *
        FROM courses
        ORDER BY id DESC
    `;

  db.query(sql, callback);
};

// ======================
// Get Student Courses
// ======================

const getCourses = (userId, callback) => {
  const sql = `
        SELECT DISTINCT
            c.*
        FROM courses c

        INNER JOIN enrollments e
            ON c.id = e.course_id

        INNER JOIN students s
            ON e.student_id = s.id

        WHERE s.user_id = ?

        ORDER BY c.course_code
    `;

  db.query(sql, [userId], callback);
};

// ======================
// Get Course By ID
// ======================

const getCourseById = (id, callback) => {
  const sql = `
        SELECT *
        FROM courses
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

// ======================
// Add Course
// ======================

const addCourse = (course, callback) => {
  const sql = `
        INSERT INTO courses
        (
            course_code,
            course_name,
            department,
            semester,
            credits
        )
        VALUES (?,?,?,?,?)
    `;

  db.query(
    sql,

    [
      course.course_code,
      course.course_name,
      course.department,
      course.semester,
      course.credits,
    ],

    callback,
  );
};

// ======================
// Update Course
// ======================

const updateCourse = (id, course, callback) => {
  const sql = `
        UPDATE courses
        SET
            course_code = ?,
            course_name = ?,
            department = ?,
            semester = ?,
            credits = ?
        WHERE id = ?
    `;

  db.query(
    sql,

    [
      course.course_code,
      course.course_name,
      course.department,
      course.semester,
      course.credits,
      id,
    ],

    callback,
  );
};

// ======================
// Delete Course
// ======================

const deleteCourse = (id, callback) => {
  const sql = `
        DELETE FROM courses
        WHERE id = ?
    `;

  db.query(sql, [id], callback);
};

module.exports = {
  getAllCourses,
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
