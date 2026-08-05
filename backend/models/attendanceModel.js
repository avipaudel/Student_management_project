const db = require("../config/db");

// Get all attendance records for reports

const getAllAttendance = (callback) => {
  const sql = `

        SELECT

        attendance.id,

        CONCAT(
            students.first_name,
            ' ',
            students.last_name
        ) AS student_name,

        courses.course_name,

        attendance.attendance_date,

        attendance.status


        FROM attendance


        JOIN students

        ON attendance.student_id = students.id


        JOIN courses

        ON attendance.course_id = courses.id


        ORDER BY attendance.attendance_date DESC

    `;

  db.query(
    sql,

    callback,
  );
};

module.exports = {
  getAllAttendance,
};
