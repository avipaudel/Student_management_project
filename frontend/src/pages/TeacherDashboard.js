import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";

import { FaBook, FaClipboardCheck, FaChartBar } from "react-icons/fa";

import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <TeacherSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Teacher Dashboard</h1>

          <p>
            Welcome, <b>{user?.full_name}</b>
          </p>

          <div className="dashboard-cards">
            <div
              className="card"
              onClick={() => navigate("/teacher-courses")}
              style={{ cursor: "pointer" }}
            >
              <FaBook size={35} />

              <h3>My Courses</h3>

              <p>View assigned courses</p>
            </div>

            <div
              className="card"
              onClick={() => navigate("/teacher-attendance")}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardCheck size={35} />

              <h3>Attendance</h3>

              <p>Manage attendance</p>
            </div>

            <div
              className="card"
              onClick={() => navigate("/teacher-results")}
              style={{ cursor: "pointer" }}
            >
              <FaChartBar size={35} />

              <h3>Results</h3>

              <p>Manage student results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
