const db = require("../config/db");

// Get all teachers
const getAllTeachers = (callback) => {
  const sql = `
        SELECT *
        FROM teachers
        ORDER BY id DESC
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

// Get teacher by id
const getTeacherById = (id, callback) => {
  const sql = `
        SELECT *
        FROM teachers
        WHERE id=?
    `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return callback(err);
    }

    callback(null, result);
  });
};

// Add teacher
const addTeacher = (teacher, callback) => {
  const fullName = `${teacher.first_name} ${teacher.last_name}`;

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

    [fullName, teacher.email, teacher.password, "teacher"],

    (err, userResult) => {
      if (err) {
        return callback(err);
      }

      const userId = userResult.insertId;

      const teacherSql = `
                INSERT INTO teachers
                (
                    teacher_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    department,
                    designation,
                    hire_date,
                    profile_image,
                    user_id
                )
                VALUES (?,?,?,?,?,?,?,?,?,?)
            `;

      db.query(
        teacherSql,

        [
          teacher.teacher_id,
          teacher.first_name,
          teacher.last_name,
          teacher.email,
          teacher.phone,
          teacher.department,
          teacher.designation,
          teacher.hire_date,
          teacher.profile_image || "default.png",
          userId,
        ],

        callback,
      );
    },
  );
};

// Update teacher
const updateTeacher = (id, teacher, callback) => {
  const getUserSql = `
        SELECT user_id
        FROM teachers
        WHERE id = ?
    `;

  db.query(getUserSql, [id], (err, result) => {
    if (err) {
      return callback(err);
    }

    if (result.length === 0) {
      return callback(new Error("Teacher not found"));
    }

    const userId = result[0].user_id;

    const fullName = `${teacher.first_name} ${teacher.last_name}`;

    const updateUserSql = `
            UPDATE users
            SET
                full_name = ?,
                email = ?
            WHERE id = ?
        `;

    db.query(
      updateUserSql,

      [fullName, teacher.email, userId],

      (err) => {
        if (err) {
          return callback(err);
        }

        const updateTeacherSql = `
                    UPDATE teachers
                    SET
                        teacher_id = ?,
                        first_name = ?,
                        last_name = ?,
                        email = ?,
                        phone = ?,
                        department = ?,
                        designation = ?,
                        hire_date = ?
                    WHERE id = ?
                `;

        db.query(
          updateTeacherSql,

          [
            teacher.teacher_id,
            teacher.first_name,
            teacher.last_name,
            teacher.email,
            teacher.phone,
            teacher.department,
            teacher.designation,
            teacher.hire_date,
            id,
          ],

          callback,
        );
      },
    );
  });
};

// Update profile image
const updateProfileImage = (id, image, callback) => {
  const sql = `

        UPDATE teachers

        SET profile_image=?

        WHERE id=?

    `;

  db.query(
    sql,

    [image, id],

    callback,
  );
};

// Delete teacher
const deleteTeacher = (id, callback) => {
  const getUserSql = `
        SELECT user_id
        FROM teachers
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
        return callback(new Error("Teacher not found"));
      }

      const userId = result[0].user_id;

      const deleteTeacherSql = `
                DELETE FROM teachers
                WHERE id = ?
            `;

      db.query(
        deleteTeacherSql,

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

module.exports = {
  getAllTeachers,

  getTeacherById,

  addTeacher,

  updateTeacher,

  updateProfileImage,

  deleteTeacher,
};
