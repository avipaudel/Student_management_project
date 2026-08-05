import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import StudentReport from "../components/reports/StudentReport";
import TeacherReport from "../components/reports/TeacherReport";
import CourseReport from "../components/reports/CourseReport";
import AttendanceReport from "../components/reports/AttendanceReport";
import ResultReport from "../components/reports/ResultReport";

import { useState } from "react";

import "../styles/dashboard.css";

function Reports() {
  const [activeReport, setActiveReport] = useState("student");

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Reports</h1>

          <div className="report-buttons">
            <button onClick={() => setActiveReport("student")}>Student</button>

            <button onClick={() => setActiveReport("teacher")}>Teacher</button>

            <button onClick={() => setActiveReport("course")}>Course</button>

            <button onClick={() => setActiveReport("attendance")}>
              Attendance
            </button>

            <button onClick={() => setActiveReport("result")}>Result</button>
          </div>

          <div className="report-container">
            {activeReport === "student" && <StudentReport />}

            {activeReport === "teacher" && <TeacherReport />}

            {activeReport === "course" && <CourseReport />}

            {activeReport === "attendance" && <AttendanceReport />}

            {activeReport === "result" && <ResultReport />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
