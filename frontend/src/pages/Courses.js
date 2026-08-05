import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function Courses() {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const getCourses = async () => {
    try {
      const response = await API.get("/courses");

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (confirmDelete) {
      try {
        await API.delete(`/courses/${id}`);

        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredCourses = courses.filter((course) => {
    const keyword = search.toLowerCase();

    return (
      course.course_code.toLowerCase().includes(keyword) ||
      course.course_name.toLowerCase().includes(keyword) ||
      course.department.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="page-header">
            <h1>Courses</h1>

            <Link to="/add-course" className="add-btn">
              Add Course
            </Link>
          </div>

          <input
            className="search-box"
            type="text"
            placeholder="Search Course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>

                <th>Course Name</th>

                <th>Department</th>

                <th>Semester</th>

                <th>Credits</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.course_code}</td>

                  <td>{course.course_name}</td>

                  <td>{course.department}</td>

                  <td>{course.semester}</td>

                  <td>{course.credits}</td>

                  <td>
                    <Link to={`/edit-course/${course.id}`} className="edit-btn">
                      Edit
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Courses;
