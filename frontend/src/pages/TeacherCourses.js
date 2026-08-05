import { useEffect, useState } from "react";

import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/teacher/courses",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <TeacherSidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h1>My Courses</h1>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>

                <th>Course Name</th>

                <th>Department</th>

                <th>Semester</th>

                <th>Credits</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.course_code}</td>

                  <td>{course.course_name}</td>

                  <td>{course.department}</td>

                  <td>{course.semester}</td>

                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourses;
