const db = require("../config/db");

// Get all students
const getAllStudents = (callback) => {
  const sql = "SELECT * FROM students ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) return callback(err);

    callback(null, results);
  });
};

// Add new student
const addStudent = (student, callback) => {
  const fullName = `${student.first_name} ${student.last_name}`;

  // Create login account
  const userSql = `
        INSERT INTO users
        (
            full_name,
            email,
            password,
            role
        )
        VALUES (?,?,?,?)
    `;

  db.query(
    userSql,
    [fullName, student.email, student.password, "student"],
    (err, userResult) => {
      if (err) return callback(err);

      const userId = userResult.insertId;

      const studentSql = `
                INSERT INTO students
                (
                    student_id,
                    first_name,
                    last_name,
                    gender,
                    dob,
                    email,
                    phone,
                    address,
                    department,
                    semester,
                    roll_no,
                    admission_date,
                    guardian_name,
                    guardian_phone,
                    profile_image,
                    user_id
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;

      db.query(
        studentSql,
        [
          student.student_id,
          student.first_name,
          student.last_name,
          student.gender,
          student.dob,
          student.email,
          student.phone,
          student.address,
          student.department,
          student.semester,
          student.roll_no,
          student.admission_date,
          student.guardian_name,
          student.guardian_phone,
          student.profile_image,
          userId,
        ],
        callback,
      );
    },
  );
};

// Update student
const updateStudent = (id, student, callback) => {
  const getUserSql = `
        SELECT user_id
        FROM students
        WHERE id = ?
    `;

  db.query(
    getUserSql,

    [id],

    (err, result) => {
      if (err) {
        return callback(err);
      }

      if (result.length === 0) {
        return callback(new Error("Student not found"));
      }

      const userId = result[0].user_id;

      const fullName = `${student.first_name} ${student.last_name}`;

      const updateUserSql = `
                UPDATE users
                SET
                    full_name = ?,
                    email = ?
                WHERE id = ?
            `;

      db.query(
        updateUserSql,

        [fullName, student.email, userId],

        (err) => {
          if (err) {
            return callback(err);
          }

          const updateStudentSql = `
                        UPDATE students
                        SET

                            student_id=?,
                            first_name=?,
                            last_name=?,
                            gender=?,
                            dob=?,
                            email=?,
                            phone=?,
                            address=?,
                            department=?,
                            semester=?,
                            roll_no=?,
                            admission_date=?,
                            guardian_name=?,
                            guardian_phone=?

                        WHERE id=?
                    `;

          db.query(
            updateStudentSql,

            [
              student.student_id,
              student.first_name,
              student.last_name,
              student.gender,
              student.dob,
              student.email,
              student.phone,
              student.address,
              student.department,
              student.semester,
              student.roll_no,
              student.admission_date,
              student.guardian_name,
              student.guardian_phone,
              id,
            ],

            callback,
          );
        },
      );
    },
  );
};
const updateProfileImage = (id, image, callback) => {
  const sql = `
        UPDATE students
        SET profile_image=?
        WHERE id=?
    `;

  db.query(sql, [image, id], callback);
};

// Delete student
const deleteStudent = (id, callback) => {
  const getUserSql = `
        SELECT user_id
        FROM students
        WHERE id = ?
    `;

  db.query(
    getUserSql,

    [id],

    (err, result) => {
      if (err) {
        return callback(err);
      }

      if (result.length === 0) {
        return callback(new Error("Student not found"));
      }

      const userId = result[0].user_id;

      const deleteStudentSql = `
                DELETE FROM students
                WHERE id = ?
            `;

      db.query(
        deleteStudentSql,

        [id],

        (err) => {
          if (err) {
            return callback(err);
          }

          const deleteUserSql = `
                        DELETE FROM users
                        WHERE id = ?
                    `;

          db.query(
            deleteUserSql,

            [userId],

            callback,
          );
        },
      );
    },
  );
};

// Get student by ID
const getStudentById = (id, callback) => {
  const sql = "SELECT * FROM students WHERE id=?";

  db.query(sql, [id], callback);
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  updateProfileImage,
};
