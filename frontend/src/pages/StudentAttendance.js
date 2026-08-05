import { useEffect, useState } from "react";

import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAttendance();
  }, []);

  const getAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/attendance",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAttendance(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <StudentSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h1>My Attendance</h1>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>

                <th>Date</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item.id}>
                  <td>{item.course_name}</td>

                  <td>{item.attendance_date}</td>

                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentAttendance;
