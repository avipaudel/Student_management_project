import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

import "../styles/dashboard.css";

function AddCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    course_code: "",
    course_name: "",
    department: "",
    semester: "",
    credits: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/courses",

        course,
      );

      toast.error("Course Added Successfully");

      navigate("/courses");
    } catch (error) {
      console.log(error);

      toast.error("Failed to add course");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <div className="form-box">
            <h1>Add Course</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"

                name="course_code"

                placeholder="Course Code"

                value={course.course_code}

                onChange={handleChange}

                required
              />

              <input
                type="text"

                name="course_name"

                placeholder="Course Name"

                value={course.course_name}

                onChange={handleChange}

                required
              />

              <input
                type="text"

                name="department"

                placeholder="Department"

                value={course.department}

                onChange={handleChange}
              />

              <input
                type="number"

                name="semester"

                placeholder="Semester"

                value={course.semester}

                onChange={handleChange}
              />

              <input
                type="number"

                name="credits"

                placeholder="Credits"

                value={course.credits}

                onChange={handleChange}
              />

              <button
                type="submit"

                className="add-btn"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
