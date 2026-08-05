const db = require("../config/db");

// Get all enrollments

const getEnrollments = (req, res) => {
  const sql = `

        SELECT

            enrollments.id,

            students.first_name,
            students.last_name,

            courses.course_name,

            enrollments.enrollment_date


        FROM enrollments


        JOIN students

        ON enrollments.student_id = students.id


        JOIN courses

        ON enrollments.course_id = courses.id


        ORDER BY enrollments.id DESC

    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,

        message: "Database Error",

        error: err.message,
      });
    }

    res.json({
      success: true,

      data: result,
    });
  });
};

// Add Enrollment

const addEnrollment = (req, res) => {
  const {
    student_id,

    course_id,

    enrollment_date,
  } = req.body;

  const sql = `

        INSERT INTO enrollments

        (

            student_id,

            course_id,

            enrollment_date

        )

        VALUES(?,?,?)

    `;

  db.query(
    sql,

    [student_id, course_id, enrollment_date],

    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,

          message: "Database Error",

          error: err.message,
        });
      }

      res.json({
        success: true,

        message: "Enrollment Added Successfully",
      });
    },
  );
};

module.exports = {
  getEnrollments,

  addEnrollment,
};
