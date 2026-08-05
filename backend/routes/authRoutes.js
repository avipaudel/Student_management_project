const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});

router.get("/profile", authMiddleware, authController.getProfile);
router.put("/change-password", authMiddleware, authController.changePassword);

router.post("/login", authController.login);

module.exports = router;
