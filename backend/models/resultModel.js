const db = require("../config/db");

// Get student's results

const getStudentResults = (userId, callback) => {
  const sql = `

        SELECT

            results.id,

            courses.course_code,

            courses.course_name,

            results.marks,

            results.grade,

            results.exam_date


        FROM results


        JOIN students

        ON results.student_id = students.id


        JOIN courses

        ON results.course_id = courses.id


        WHERE students.user_id = ?


        ORDER BY results.exam_date DESC

    `;

  db.query(
    sql,

    [userId],

    callback,
  );
};

// Get all results for reports

const getAllResults = (callback) => {
  const sql = `


        SELECT


            results.id,


            CONCAT(

                students.first_name,

                ' ',

                students.last_name

            ) AS student_name,


            courses.course_code,


            courses.course_name,


            results.marks,


            results.grade,


            results.exam_date



        FROM results



        JOIN students

        ON results.student_id = students.id



        JOIN courses

        ON results.course_id = courses.id



        ORDER BY results.exam_date DESC



    `;

  db.query(
    sql,

    callback,
  );
};

module.exports = {
  getStudentResults,

  getAllResults,
};
