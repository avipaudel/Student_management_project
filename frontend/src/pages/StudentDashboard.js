import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";

import { FaBook, FaClipboardCheck, FaChartBar } from "react-icons/fa";

import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <StudentSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Student Dashboard</h1>

          <p>
            Welcome, <b>{user?.full_name}</b>
          </p>

          <div className="dashboard-cards">
            <div
              className="card"
              onClick={() => navigate("/student-courses")}
              style={{ cursor: "pointer" }}
            >
              <FaBook size={35} />

              <h3>My Courses</h3>

              <p>View enrolled courses</p>
            </div>

            <div
              className="card"
              onClick={() => navigate("/student-attendance")}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardCheck size={35} />

              <h3>Attendance</h3>

              <p>View attendance record</p>
            </div>

            <div
              className="card"
              onClick={() => navigate("/student-results")}
              style={{ cursor: "pointer" }}
            >
              <FaChartBar size={35} />

              <h3>Results</h3>

              <p>View exam results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
