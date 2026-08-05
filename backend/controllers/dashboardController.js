const db = require("../config/db");

const getDashboardStats = (req, res) => {
  const query = `

        SELECT

            (SELECT COUNT(*) FROM students) AS totalStudents,

            (SELECT COUNT(DISTINCT department) FROM students) AS totalDepartments,

            (SELECT COUNT(*) FROM teachers) AS totalTeachers,

            (SELECT COUNT(*) FROM courses) AS totalCourses,

            (SELECT COUNT(*) 
             FROM students 
             WHERE gender='Male') AS maleStudents,

            (SELECT COUNT(*) 
             FROM students 
             WHERE gender='Female') AS femaleStudents

    `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,

        message: "Database Error",

        error: err.message,
      });
    }

    const studentQuery = `

    SELECT 
        student_id,
        first_name,
        last_name,
        email,
        department

    FROM students

    ORDER BY id DESC

    LIMIT 5

`;

    db.query(studentQuery, (err, students) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,

        data: {
          ...result[0],

          recentStudents: students,
        },
      });
    });
  });
};

module.exports = {
  getDashboardStats,
};
