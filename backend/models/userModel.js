const db = require("../config/db");

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    callback(null, results);
  });
};

module.exports = {
  findUserByEmail,
};
