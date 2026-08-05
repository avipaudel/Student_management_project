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

const addResult = (result, callback) => {
  const sql = `

        INSERT INTO results

        (

            student_id,

            course_id,

            marks,

            grade,
            exam_date

        )

        VALUES (?,?,?,?,?)


        ON DUPLICATE KEY UPDATE


        marks = VALUES(marks),

        grade = VALUES(grade),

        exam_date = VALUES(exam_date)

    `;

  db.query(
    sql,

    [
      result.student_id,
      result.course_id,
      result.marks,
      result.grade,
      result.exam_date,
    ],

    (err, resultData) => {
      if (err) {
        console.log("RESULT INSERT ERROR:", err);

        return callback(err, null);
      }

      callback(null, resultData);
    },
  );
};
// Get existing results of a course

const getCourseResults = (courseId, callback) => {
  const sql = `

        SELECT  

            results.student_id,

            results.marks,

            results.grade,

            results.exam_date


        FROM results


        WHERE results.course_id = ?


    `;

  db.query(
    sql,

    [courseId],

    callback,
  );
};

module.exports = {
  getCourseStudents,

  addResult,
  getCourseResults,
};
