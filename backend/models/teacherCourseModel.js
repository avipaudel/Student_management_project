const db = require("../config/db");

// Get courses assigned to teacher

const getTeacherCourses = (userId, callback) => {
  const sql = `

        SELECT 

            courses.id,

            courses.course_code,

            courses.course_name,

            courses.department,

            courses.semester,

            courses.credits


        FROM courses


        JOIN teachers

        ON courses.teacher_id = teachers.id


        WHERE teachers.user_id = ?


        ORDER BY courses.id DESC

    `;

  db.query(
    sql,

    [userId],

    callback,
  );
};

module.exports = {
  getTeacherCourses,
};
