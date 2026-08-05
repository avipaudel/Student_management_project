const db = require("../config/db");

// Get students enrolled in a course

const getCourseStudents = (courseId, callback) => {
  const sql = `

        SELECT DISTINCT

            students.id,

            students.student_id,

            students.first_name,

            students.last_name


        FROM enrollments


        JOIN students

        ON enrollments.student_id = students.id


        WHERE enrollments.course_id = ?


        ORDER BY students.id


    `;

  db.query(
    sql,

    [courseId],

    callback,
  );
};

// Add attendance

const addAttendance = (attendance, callback) => {
  const sql = `

        INSERT INTO attendance

        (

            student_id,

            course_id,

            attendance_date,

            status

        )


        VALUES (?,?,?,?)

    `;

  db.query(
    sql,

    [
      attendance.student_id,

      attendance.course_id,

      attendance.attendance_date,

      attendance.status,
    ],

    callback,
  );
};

module.exports = {
  getCourseStudents,

  addAttendance,
};
