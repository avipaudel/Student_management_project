// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();

// Connect to MySQL
require("./config/db");

// Import Routes

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use("/uploads", express.static("uploads"));
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const resultRoutes = require("./routes/resultRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const teacherCourseRoutes = require("./routes/teacherCourseRoutes");
const teacherAttendanceRoutes = require("./routes/teacherAttendanceRoutes");
const teacherResultRoutes = require("./routes/teacherResultRoutes");

app.use("/api", resultRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/", attendanceRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/teacher", teacherCourseRoutes);
app.use("/api/teacher", teacherAttendanceRoutes);
app.use("/api/teacher", teacherResultRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management System API is Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running`);
  console.log(`🌐 http://localhost:${PORT}`);
});
