const Result = require("../models/resultModel");

// Get results

const getResults = (req, res) => {
  Result.getStudentResults(
    req.user.id,

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

        data: result,
      });
    },
  );
};
const getResultReport = (req, res) => {
  Result.getAllResults((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,

        message: "Database Error",
      });
    }

    res.json({
      success: true,

      data: result,
    });
  });
};
module.exports = {
  getResults,
  getResultReport,
};
