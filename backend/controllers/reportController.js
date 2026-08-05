const db = require("../config/db");

// Student Report
const studentReport = (req, res) => {
  const sql = `
        SELECT
            student_id,
            first_name,
            last_name,
            department,
            semester,
            email,
            phone
        FROM students
        ORDER BY first_name
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

// Teacher Report
const teacherReport = (req, res) => {
  const sql = `
        SELECT
            teacher_id,
            first_name,
            last_name,
            department,
            designation,
            email
        FROM teachers
        ORDER BY first_name
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

// Course Report
const courseReport = (req, res) => {
  const sql = `
        SELECT
            course_code,
            course_name,
            department,
            semester,
            credits
        FROM courses
        ORDER BY semester
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

// Attendance Report
const attendanceReport = (req, res) => {
  const sql = `
        SELECT
            s.student_id,
            CONCAT(s.first_name,' ',s.last_name) AS student_name,
            c.course_name,
            a.attendance_date,
            a.status
        FROM attendance a
        JOIN students s
            ON a.student_id = s.id
        JOIN courses c
            ON a.course_id = c.id
        ORDER BY a.attendance_date DESC
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};

// Result Report
const resultReport = (req, res) => {
  const sql = `
        SELECT

            s.student_id,

            CONCAT(s.first_name,' ',s.last_name) AS student_name,

            c.course_name,

            r.internal_marks,

            r.final_marks,

            r.total_marks,

            r.grade

        FROM results r

        JOIN students s
            ON r.student_id=s.id

        JOIN courses c
            ON r.course_id=c.id

        ORDER BY student_name
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,

      data: result,
    });
  });
};

module.exports = {
  studentReport,
  teacherReport,
  courseReport,
  attendanceReport,
  resultReport,
};
