import { useEffect, useState } from "react";

import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/results",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResults(response.data.data);
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
            <h1>My Results</h1>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>

                <th>Course Name</th>

                <th>Marks</th>

                <th>Grade</th>

                <th>Exam Date</th>
              </tr>
            </thead>

            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td>{item.course_code}</td>

                  <td>{item.course_name}</td>

                  <td>{item.marks}</td>

                  <td>{item.grade}</td>

                  <td>{item.exam_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentResults;
