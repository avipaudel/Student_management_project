import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    totalTeachers: 0,
    totalCourses: 0,
    maleStudents: 0,
    femaleStudents: 0,
    recentStudents: [],
  });
  const genderData = {
    labels: ["Male", "Female"],

    datasets: [
      {
        data: [stats.maleStudents, stats.femaleStudents],
        backgroundColor: [
          "#3b82f6", // Blue for Male
          "#ec4899", // Pink for Female
        ],
      },
    ],
  };

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await API.get("/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <h1>Dashboard</h1>
          <div className="quick-actions">
            <button onClick={() => navigate("/add-student")}>
              Add Student
            </button>

            <button onClick={() => navigate("/add-teacher")}>
              Add Teacher
            </button>

            <button onClick={() => navigate("/add-course")}>Add Course</button>
          </div>

          <div className="cards">
            <div className="card">
              <h3>Total Students</h3>

              <p>{stats.totalStudents}</p>
            </div>

            <div className="card">
              <h3>Total Teachers</h3>

              <p>{stats.totalTeachers}</p>
            </div>

            <div className="card">
              <h3>Total Courses</h3>

              <p>{stats.totalCourses}</p>
            </div>

            <div className="card">
              <h3>Departments</h3>

              <p>{stats.totalDepartments}</p>
            </div>
          </div>

          <div className="chart-card">
            <h2>Student Gender</h2>

            <Doughnut data={genderData} />
          </div>
        </div>
        <div className="recent-card">
          <h2>Recent Students</h2>

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>

                  <td>
                    {student.first_name} {student.last_name}
                  </td>

                  <td>{student.email}</td>

                  <td>{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
